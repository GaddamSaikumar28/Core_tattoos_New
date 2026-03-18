// data/tattooProducts.js
export const tattooProducts = [
  {
    id: "prod_1",
    handle: "crying-heart-traditional",
    name: "Crying Heart",
    category: "Temporary Tattoos",
    price: "12.00",
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=600",
    badge: "Bestseller",
    style: "Traditional",
    placements: ["Forearm", "Calf", "Chest"],
    productColor: "#dc2626", // Blood Red
    combinations: [
      { id: "var_1a", size: "Small (2x2)", price: "12.00", stock: 10, image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=600" },
      { id: "var_1b", size: "Large (4x4)", price: "18.00", stock: 5, image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "prod_2",
    handle: "serpent-wrap",
    name: "Serpent Wrap",
    category: "Temporary Tattoos",
    price: "24.00",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=600",
    badge: "New",
    style: "Blackwork",
    placements: ["Forearm", "Neck", "Leg"],
    productColor: "#171717", // Deep Black
    combinations: [
      { id: "var_2a", size: "Medium (5x3)", price: "24.00", stock: 15, image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=600" },
      { id: "var_2b", size: "Sleeve (10x6)", price: "45.00", stock: 2, image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "prod_3",
    handle: "botanical-flash-sheet",
    name: "Botanical Flash Sheet",
    category: "Flash Sheets",
    price: "30.00",
    image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80&w=600",
    badge: "Digital Download",
    style: "Fine Line",
    placements: ["Any"],
    productColor: "#52525b", // Zinc
    combinations: [
      { id: "var_3a", size: "Standard (8.5x11)", price: "30.00", stock: 999, image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "prod_4",
    handle: "premium-aftercare-balm",
    name: "Healing Balm",
    category: "Aftercare",
    price: "16.00",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
    style: "Organic",
    placements: ["All Body"],
    productColor: "#059669", // Natural Green
    combinations: [
      { id: "var_4a", size: "1 oz Tin", price: "16.00", stock: 40, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600" },
      { id: "var_4b", size: "4 oz Tub", price: "38.00", stock: 12, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600" }
    ]
  }
];