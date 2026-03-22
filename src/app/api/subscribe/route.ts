// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN; // Note: NOT NEXT_PUBLIC
    const endpoint = `https://${domain}/admin/api/2025-10/graphql.json`;

    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminToken as string,
    };

    // 1. Try to create a new subscriber profile
    const createRes = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
          mutation customerCreate($input: CustomerInput!) {
            customerCreate(input: $input) {
              customer { id }
              userErrors { field message }
            }
          }
        `,
        variables: {
          input: {
            email,
            emailMarketingConsent: {
              marketingState: "SUBSCRIBED",
              marketingOptInLevel: "SINGLE_OPT_IN"
            }
          }
        }
      })
    });

    const createData = await createRes.json();
    const errors = createData.data?.customerCreate?.userErrors || [];

    // 2. If email exists, we need to query the customer ID and update their consent
    if (errors.some((err: any) => err.message.includes('has already been taken'))) {
      
      // Find the customer ID
      const searchRes = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            query getCustomerByEmail($query: String!) {
              customers(first: 1, query: $query) {
                edges { node { id emailMarketingConsent { marketingState } } }
              }
            }
          `,
          variables: { query: `email:${email}` }
        })
      });

      const searchData = await searchRes.json();
      const existingCustomer = searchData.data?.customers?.edges?.[0]?.node;

      if (existingCustomer) {
        if (existingCustomer.emailMarketingConsent?.marketingState === 'SUBSCRIBED') {
          return NextResponse.json({ message: 'Already subscribed!' }, { status: 200 });
        }

        // Update existing customer consent
        await fetch(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: `
              mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
                customerEmailMarketingConsentUpdate(input: $input) {
                  customer { id }
                }
              }
            `,
            variables: {
              input: {
                customerId: existingCustomer.id,
                emailMarketingConsent: {
                  marketingState: "SUBSCRIBED",
                  marketingOptInLevel: "SINGLE_OPT_IN"
                }
              }
            }
          })
        });
        return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });
      }
    } else if (errors.length > 0) {
      return NextResponse.json({ error: errors[0].message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });

  } catch (error) {
    console.error('Newsletter Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}