// // app/account/addresses/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { 
//   getCustomerAddresses, 
//   createCustomerAddress, 
//   updateCustomerAddress, 
//   deleteCustomerAddress, 
//   setDefaultCustomerAddress,
//   ShopifyAddress 
// } from "@/src/lib/shopify";
// import { MapPin, Plus, Edit2, Trash2, Star, Loader2, X } from "lucide-react";
// import { toast } from "sonner";
// import clsx from "clsx";

// export default function AddressesPage() {
//   const [addresses, setAddresses] = useState<ShopifyAddress[]>([]);
//   const [defaultId, setDefaultId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<ShopifyAddress | null>(null);
//   const [isSaving, setIsSaving] = useState(false);

//   // Form State
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", company: "", address1: "", address2: "",
//     city: "", province: "", country: "", zip: "", phone: ""
//   });

//   const token = Cookies.get("shopify_customer_token");

//   const loadAddresses = async () => {
//     if (!token) return;
//     try {
//       const { addresses, defaultAddressId } = await getCustomerAddresses(token);
//       setAddresses(addresses);
//       setDefaultId(defaultAddressId);
//     } catch (error) {
//       toast.error("Failed to load addresses.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => { loadAddresses(); }, []);

//   const openAddModal = () => {
//     setEditingAddress(null);
//     setFormData({ firstName: "", lastName: "", company: "", address1: "", address2: "", city: "", province: "", country: "", zip: "", phone: "" });
//     setIsModalOpen(true);
//   };

//   const openEditModal = (address: ShopifyAddress) => {
//     setEditingAddress(address);
//     setFormData({
//       firstName: address.firstName || "", lastName: address.lastName || "", company: address.company || "",
//       address1: address.address1 || "", address2: address.address2 || "", city: address.city || "",
//       province: address.province || "", country: address.country || "", zip: address.zip || "", phone: address.phone || ""
//     });
//     setIsModalOpen(true);
//   };

//   const handleSaveAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!token) return;
//     setIsSaving(true);
//     try {
//       if (editingAddress) {
//         await updateCustomerAddress(token, editingAddress.id, formData);
//         toast.success("Address updated successfully!");
//       } else {
//         await createCustomerAddress(token, formData);
//         toast.success("Address added successfully!");
//       }
//       setIsModalOpen(false);
//       await loadAddresses();
//     } catch (error: any) {
//       toast.error(error.message || "Failed to save address");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!token || !confirm("Are you sure you want to delete this address?")) return;
//     try {
//       await deleteCustomerAddress(token, id);
//       toast.success("Address deleted");
//       await loadAddresses();
//     } catch (error: any) {
//       toast.error(error.message || "Failed to delete address");
//     }
//   };

//   const handleMakeDefault = async (id: string) => {
//     if (!token) return;
//     try {
//       await setDefaultCustomerAddress(token, id);
//       toast.success("Default address updated");
//       await loadAddresses();
//     } catch (error: any) {
//       toast.error("Failed to set default address");
//     }
//   };

//   if (isLoading) return <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[var(--color-brand-orange)]" /></div>;

//   return (
//     <div className="space-y-6 mt-10">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-black text-gray-900">Saved Addresses</h1>
//           <p className="text-sm text-gray-500">Manage your shipping and billing addresses.</p>
//         </div>
//         <button 
//           onClick={openAddModal}
//           className="flex items-center gap-2 px-6 py-3 bg-[#fe8204] text-white text-[13px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-colors shadow-md"
//         >
//           <Plus className="w-4 h-4" /> Add New Address
//         </button>
//       </div>

//       {addresses.length === 0 ? (
//         <div className="p-12 text-center bg-gray-50 border border-gray-100 rounded-2xl">
//           <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//           <p className="text-gray-500 font-medium">No addresses saved yet.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {addresses.map((address) => {
//             const isDefault = address.id === defaultId;
//             return (
//               <div key={address.id} className={clsx(
//                 "p-6 border rounded-2xl flex flex-col h-full transition-all",
//                 isDefault ? "border-[#fe8204] bg-orange-50/30 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"
//               )}>
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="font-bold text-gray-900">{address.firstName} {address.lastName}</h3>
//                   {isDefault && <span className="px-3 py-1 bg-[#fe8204] text-white text-[10px] font-black uppercase tracking-widest rounded-full">Default</span>}
//                 </div>
                
//                 <div className="text-sm text-gray-600 space-y-1 mb-6 flex-1">
//                   {address.company && <p>{address.company}</p>}
//                   <p>{address.address1}</p>
//                   {address.address2 && <p>{address.address2}</p>}
//                   <p>{address.city}, {address.province} {address.zip}</p>
//                   <p>{address.country}</p>
//                   {address.phone && <p className="pt-2">Phone: {address.phone}</p>}
//                 </div>

//                 <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
//                   <button onClick={() => openEditModal(address)} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#fe8204] uppercase tracking-widest transition-colors">
//                     <Edit2 className="w-3.5 h-3.5" /> Edit
//                   </button>
//                   <button onClick={() => handleDelete(address.id)} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-500 uppercase tracking-widest transition-colors">
//                     <Trash2 className="w-3.5 h-3.5" /> Delete
//                   </button>
//                   {!isDefault && (
//                     <button onClick={() => handleMakeDefault(address.id)} className="ml-auto flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#fe8204] uppercase tracking-widest transition-colors">
//                       <Star className="w-3.5 h-3.5" /> Set Default
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* ADD / EDIT MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
//               <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">
//                 {editingAddress ? "Edit Address" : "Add New Address"}
//               </h2>
//               <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="p-6 overflow-y-auto">
//               <form id="address-form" onSubmit={handleSaveAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 {[
//                   { name: "firstName", label: "First Name", type: "text", required: true },
//                   { name: "lastName", label: "Last Name", type: "text", required: true },
//                   { name: "company", label: "Company (Optional)", type: "text" },
//                   { name: "phone", label: "Phone", type: "tel" },
//                   { name: "address1", label: "Address Line 1", type: "text", required: true, fullWidth: true },
//                   { name: "address2", label: "Apartment, suite, etc. (Optional)", type: "text", fullWidth: true },
//                   { name: "city", label: "City", type: "text", required: true },
//                   { name: "country", label: "Country", type: "text", required: true },
//                   { name: "province", label: "State / Province", type: "text", required: true },
//                   { name: "zip", label: "ZIP / Postal Code", type: "text", required: true },
//                 ].map((field) => (
//                   <div key={field.name} className={clsx("space-y-2", field.fullWidth && "sm:col-span-2")}>
//                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">{field.label}</label>
//                     <input 
//                       type={field.type}
//                       required={field.required}
//                       value={(formData as any)[field.name]}
//                       onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
//                       className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] transition-all"
//                     />
//                   </div>
//                 ))}
//               </form>
//             </div>

//             <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 flex justify-end gap-3 rounded-b-3xl">
//               <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 transition-colors">
//                 Cancel
//               </button>
//               <button type="submit" form="address-form" disabled={isSaving} className="px-8 py-3 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#fe8204] transition-colors disabled:opacity-50 flex items-center gap-2 shadow-md">
//                 {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Address"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Cookies from "js-cookie";
import { 
  getCustomerAddresses, 
  createCustomerAddress, 
  updateCustomerAddress, 
  deleteCustomerAddress, 
  setDefaultCustomerAddress,
  ShopifyAddress 
} from "@/src/lib/shopify";
import { MapPin, Plus, Edit2, Trash2, Star, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<ShopifyAddress[]>([]);
  const [defaultId, setDefaultId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // For Portal
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ShopifyAddress | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", company: "", address1: "", address2: "",
    city: "", province: "", country: "", zip: "", phone: ""
  });

  const token = Cookies.get("shopify_customer_token");

  // Handle Portal Mounting and Scroll Lock
  useEffect(() => {
    setMounted(true);
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const loadAddresses = async () => {
    if (!token) return;
    try {
      const { addresses, defaultAddressId } = await getCustomerAddresses(token);
      setAddresses(addresses);
      setDefaultId(defaultAddressId);
    } catch (error) {
      toast.error("Failed to load addresses.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadAddresses(); }, []);

  const openAddModal = () => {
    setEditingAddress(null);
    setFormData({ firstName: "", lastName: "", company: "", address1: "", address2: "", city: "", province: "", country: "", zip: "", phone: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (address: ShopifyAddress) => {
    setEditingAddress(address);
    setFormData({
      firstName: address.firstName || "", lastName: address.lastName || "", company: address.company || "",
      address1: address.address1 || "", address2: address.address2 || "", city: address.city || "",
      province: address.province || "", country: address.country || "", zip: address.zip || "", phone: address.phone || ""
    });
    setIsModalOpen(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSaving(true);
    try {
      if (editingAddress) {
        await updateCustomerAddress(token, editingAddress.id, formData);
        toast.success("Address updated successfully!");
      } else {
        await createCustomerAddress(token, formData);
        toast.success("Address added successfully!");
      }
      setIsModalOpen(false);
      await loadAddresses();
    } catch (error: any) {
      toast.error(error.message || "Failed to save address");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this address?")) return;
    try {
      await deleteCustomerAddress(token, id);
      toast.success("Address deleted");
      await loadAddresses();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete address");
    }
  };

  const handleMakeDefault = async (id: string) => {
    if (!token) return;
    try {
      await setDefaultCustomerAddress(token, id);
      toast.success("Default address updated");
      await loadAddresses();
    } catch (error: any) {
      toast.error("Failed to set default address");
    }
  };

  if (isLoading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[var(--color-brand-orange)]" />
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Saved Addresses</h1>
          <p className="text-sm text-gray-500 font-medium">Manage your shipping and billing locations.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="group flex items-center gap-2 px-6 py-4 bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#fe8204] transition-all shadow-lg active:scale-95"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" /> 
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="p-20 text-center bg-white border-2 border-dashed border-gray-100 rounded-[2rem]">
          <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8" />
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No addresses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {addresses.map((address) => {
            const isDefault = address.id === defaultId;
            return (
              <div key={address.id} className={clsx(
                "p-8 border rounded-[2rem] flex flex-col h-full transition-all duration-300",
                isDefault ? "border-[#fe8204] bg-orange-50/20 ring-1 ring-[#fe8204]" : "border-gray-100 bg-white hover:border-gray-300 shadow-sm"
              )}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg leading-tight">{address.firstName} {address.lastName}</h3>
                    {address.company && <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">{address.company}</p>}
                  </div>
                  {isDefault && (
                    <span className="px-3 py-1 bg-[#fe8204] text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
                      Default
                    </span>
                  )}
                </div>
                
                <div className="text-[15px] text-gray-600 space-y-1 mb-8 flex-1 font-medium">
                  <p>{address.address1}</p>
                  {address.address2 && <p>{address.address2}</p>}
                  <p>{address.city}, {address.province} {address.zip}</p>
                  <p className="text-gray-400 uppercase text-xs font-bold tracking-widest pt-1">{address.country}</p>
                  {address.phone && (
                    <div className="pt-4 flex items-center gap-2 text-gray-400 text-xs">
                      <span className="font-black uppercase tracking-widest">Phone:</span>
                      <span className="font-bold text-gray-900">{address.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <button onClick={() => openEditModal(address)} className="flex items-center gap-2 text-[10px] font-black text-gray-900 hover:text-[#fe8204] uppercase tracking-widest transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(address.id)} className="flex items-center gap-2 text-[10px] font-black text-gray-900 hover:text-red-500 uppercase tracking-widest transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                  {!isDefault && (
                    <button onClick={() => handleMakeDefault(address.id)} className="ml-auto flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[#fe8204] uppercase tracking-widest transition-colors">
                      <Star className="w-3.5 h-3.5" /> Make Default
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PORTAL MODAL */}
      {isModalOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsModalOpen(false)} 
          />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[calc(100vh-4rem)] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-50 shrink-0">
              <div>
                <h2 className="text-xl font-black uppercase tracking-[0.1em] text-gray-900">
                  {editingAddress ? "Edit Address" : "New Address"}
                </h2>
                <p className="text-xs text-gray-400 font-bold mt-1">Fill in the details below</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-500 transition-all hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Form Body */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <form id="address-form" onSubmit={handleSaveAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                {[
                  { name: "firstName", label: "First Name", type: "text", required: true },
                  { name: "lastName", label: "Last Name", type: "text", required: true },
                  { name: "company", label: "Company (Optional)", type: "text" },
                  { name: "phone", label: "Phone", type: "tel" },
                  { name: "address1", label: "Street Address", type: "text", required: true, fullWidth: true },
                  { name: "address2", label: "Apartment, suite, etc.", type: "text", fullWidth: true },
                  { name: "city", label: "City", type: "text", required: true },
                  { name: "country", label: "Country", type: "text", required: true },
                  { name: "province", label: "State / Province", type: "text", required: true },
                  { name: "zip", label: "ZIP / Postal Code", type: "text", required: true },
                ].map((field) => (
                  <div key={field.name} className={clsx("space-y-2", field.fullWidth && "sm:col-span-2")}>
                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 ml-1">{field.label}</label>
                    <input 
                      type={field.type}
                      required={field.required}
                      placeholder={field.label}
                      value={(formData as any)[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold outline-none focus:border-[#fe8204] focus:bg-white transition-all placeholder:text-gray-300"
                    />
                  </div>
                ))}
              </form>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-gray-50 bg-gray-50/50 shrink-0 flex flex-col sm:flex-row justify-end gap-4 rounded-b-[2.5rem]">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="order-2 sm:order-1 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
              >
                Go Back
              </button>
              <button 
                type="submit" 
                form="address-form" 
                disabled={isSaving} 
                className="order-1 sm:order-2 px-10 py-4 bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#fe8204] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Address"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}