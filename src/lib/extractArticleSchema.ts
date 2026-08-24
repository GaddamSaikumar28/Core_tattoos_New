/**
 * Extracts structured FAQ/HowTo data straight out of the article body HTML,
 * so FAQPage/HowTo schema reflects the real content instead of a single
 * generic placeholder line. Pure regex-based (no DOM/cheerio dependency,
 * since this runs in a Next.js Server Component and the article HTML is
 * simple, editor-authored markup).
 *
 * Every function here is defensive: malformed/unexpected HTML never throws,
 * it just returns an empty array so the caller can fall back to the
 * existing placeholder behavior.
 */

function stripHtml(html: string): string {
  try {
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "";
  }
}

export interface ExtractedFaq {
  question: string;
  answer: string;
}

/**
 * Looks for <h2>/<h3> headings that read like a question ("...?") and takes
 * the HTML between that heading and the next one as the answer.
 * Returns [] if the article isn't written in that Q&A heading style —
 * the caller should fall back to the single-question placeholder in that case.
 */
export function extractFaqsFromHtml(html: string | null | undefined): ExtractedFaq[] {
  if (!html) return [];
  try {
    const faqs: ExtractedFaq[] = [];
    const headingRegex = /<h[23][^>]*>([\s\S]*?)<\/h[23]>([\s\S]*?)(?=<h[23][^>]*>|$)/gi;
    let match: RegExpExecArray | null;
    while ((match = headingRegex.exec(html)) !== null) {
      const question = stripHtml(match[1]);
      const answer = stripHtml(match[2]).slice(0, 1000);
      if (question.endsWith("?") && answer.length > 0) {
        faqs.push({ question, answer });
      }
    }
    return faqs;
  } catch {
    return [];
  }
}

export interface ExtractedStep {
  name: string;
  text: string;
}

/**
 * Looks for the first <ol>...</ol> block in the article and returns each
 * <li> as a HowToStep. Returns [] if there's no ordered list — the caller
 * should fall back to the single generic step placeholder in that case.
 */
export function extractHowToStepsFromHtml(html: string | null | undefined): ExtractedStep[] {
  if (!html) return [];
  try {
    const listMatch = html.match(/<ol[^>]*>([\s\S]*?)<\/ol>/i);
    if (!listMatch) return [];

    const steps: ExtractedStep[] = [];
    const listItemRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let match: RegExpExecArray | null;
    let index = 1;
    while ((match = listItemRegex.exec(listMatch[1])) !== null) {
      const text = stripHtml(match[1]);
      if (text.length > 0) {
        const words = text.split(" ");
        const shortName = words.slice(0, 8).join(" ") + (words.length > 8 ? "…" : "");
        steps.push({ name: `Step ${index}: ${shortName}`, text: text.slice(0, 1000) });
        index++;
      }
    }
    return steps;
  } catch {
    return [];
  }
}