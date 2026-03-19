import { notFound } from 'next/navigation';
// 1. Double check your imports!
// import { tattooProducts } from '@/data/tattooProducts'; // Adjust path as needed
// import TattooProductDetail from '@/components/TattooProductDetail'; // Adjust path as needed
import TattooProductDetail from '@/src/components/sections/TattooProductDetail';

// 2. Define params as a Promise for Next.js 15 compatibility
type Props = {
  params: Promise<{ slug: string }>;
};

interface Combination {
  id: string;
  price: number | string;
  image: string;
  size: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  style: string;
  handle?: string;
  price: number | string;
  image: string;
  combinations?: Combination[];
  placements?: string[];
  productColor: any;
  isExploded?: boolean;
  originalId?: string;
  variantName?: string;
  preSelectedCombo?: Combination;
  slug?: string;
  badge: any;
}
// import { tattooProducts } from '../page';
export const tattooProducts: Product[] = [
  {
    id: "prod_1",
    handle: "crying-heart-traditional",
    name: "Crying Heart",
    category: "Temporary Tattoos",
    price: "12.00",
    image: "/assets/images/Card1.png",
    badge: "Bestseller",
    style: "Traditional",
    placements: ["Forearm", "Calf", "Chest"],
    productColor: "#dc2626", 
    combinations: [
      { id: "var_1a", size: "Small (2x2)", price: "12.00", stock: 10, image: "/assets/images/Card1.png" },
      { id: "var_1b", size: "Large (4x4)", price: "18.00", stock: 5, image: "/assets/images/Card1.png" }
    ]
  },
  {
    id: "prod_2",
    handle: "serpent-wrap",
    name: "Serpent Wrap",
    category: "Temporary Tattoos",
    price: "24.00",
    image: "/assets/images/Card2.png",
    badge: "New",
    style: "Blackwork",
    placements: ["Forearm", "Neck", "Leg"],
    productColor: "#171717", 
    combinations: [
      { id: "var_2a", size: "Medium (5x3)", price: "24.00", stock: 15, image: "/assets/images/Card2.png" },
      { id: "var_2b", size: "Sleeve (10x6)", price: "45.00", stock: 2, image: "/assets/images/Card2.png" }
    ]
  },
  {
    id: "prod_3",
    handle: "botanical-flash-sheet",
    name: "Botanical Flash Sheet",
    category: "Flash Sheets",
    price: "30.00",
    image: "/assets/images/Card3.png",
    badge: "Digital Download",
    style: "Fine Line",
    placements: ["Any"],
    productColor: "#52525b", 
    combinations: [
      { id: "var_3a", size: "Standard (8.5x11)", price: "30.00", stock: 999, image: "/assets/images/Card3.png" }
    ]
  },
  {
    id: "prod_4",
    handle: "minimalist-rose",
    name: "Minimalist Rose",
    category: "Temporary Tattoos",
    price: "10.00",
    image: "/assets/images/Card7.png",
    badge: null,
    style: "Fine Line",
    placements: ["Wrist", "Ankle", "Behind Ear"],
    productColor: "#ef4444", 
    combinations: [
      { id: "var_4a", size: "Tiny (1x1)", price: "10.00", stock: 20, image: "/assets/images/Card7.png" }
    ]
  },
  {
    id: "prod_5",
    handle: "geometric-wolf",
    name: "Geometric Wolf",
    category: "Temporary Tattoos",
    price: "16.00",
    image: "/assets/images/Card4.png",
    badge: "Trending",
    style: "Geometric",
    placements: ["Forearm", "Thigh", "Shoulder"],
    productColor: "#3f3f46", 
    combinations: [
      { id: "var_5a", size: "Medium (4x4)", price: "16.00", stock: 12, image: "/assets/images/Card4.png" }
    ]
  },
  {
    id: "prod_6",
    handle: "mandala-lotus",
    name: "Mandala Lotus",
    category: "Temporary Tattoos",
    price: "22.00",
    image: "/assets/images/Card9.png",
    badge: "Limited",
    style: "Dotwork",
    placements: ["Sternum", "Back", "Thigh"],
    productColor: "#000000", 
    combinations: [
      { id: "var_6a", size: "Medium (5x5)", price: "22.00", stock: 8, image: "/assets/images/Card9.png" }
    ]
  },
  {
    id: "prod_7",
    handle: "skull-dagger",
    name: "Skull & Dagger",
    category: "Temporary Tattoos",
    price: "18.00",
    image: "/assets/images/Card2.png",
    badge: null,
    style: "Traditional",
    placements: ["Calf", "Forearm", "Bicep"],
    productColor: "#1c1917", 
    combinations: [
      { id: "var_7a", size: "Medium (4x6)", price: "18.00", stock: 14, image: "/assets/images/Card2.png" }
    ]
  },
  {
    id: "prod_8",
    handle: "koi-fish-flow",
    name: "Koi Fish Flow",
    category: "Temporary Tattoos",
    price: "26.00",
    image: "/assets/images/Card5.png",
    badge: "Bestseller",
    style: "Japanese",
    placements: ["Sleeve", "Calf", "Ribs"],
    productColor: "#ea580c", 
    combinations: [
      { id: "var_8a", size: "Large (6x8)", price: "26.00", stock: 6, image: "/assets/images/Card5.png" }
    ]
  },
  {
    id: "prod_9",
    handle: "vintage-swallow",
    name: "Vintage Swallow",
    category: "Temporary Tattoos",
    price: "14.00",
    image: "/assets/images/Card10.png",
    badge: "Classic",
    style: "Traditional",
    placements: ["Hand", "Chest", "Neck"],
    productColor: "#0284c7", 
    combinations: [
      { id: "var_9a", size: "Small (3x3)", price: "14.00", stock: 25, image: "/assets/images/Card10.png" }
    ]
  },
  {
    id: "prod_10",
    handle: "moon-phases",
    name: "Moon Phases",
    category: "Temporary Tattoos",
    price: "15.00",
    image: "/assets/images/Card1.png",
    badge: null,
    style: "Minimalist",
    placements: ["Spine", "Forearm", "Collarbone"],
    productColor: "#71717a", 
    combinations: [
      { id: "var_10a", size: "Strip (2x8)", price: "15.00", stock: 18, image: "/assets/images/Card1.png" }
    ]
  },
  {
    id: "prod_11",
    handle: "cyberpunk-glitch",
    name: "Cyberpunk Glitch",
    category: "Temporary Tattoos",
    price: "20.00",
    image: "/assets/images/Card8.png",
    badge: "Limited Edition",
    style: "Neo-Traditional",
    placements: ["Forearm", "Neck", "Calf"],
    productColor: "#ec4899", 
    combinations: [
      { id: "var_11a", size: "Medium (4x5)", price: "20.00", stock: 5, image: "/assets/images/Card8.png" }
    ]
  },
  {
    id: "prod_12",
    handle: "tiger-roar",
    name: "Tiger Roar",
    category: "Temporary Tattoos",
    price: "28.00",
    image: "/assets/images/Card6.png",
    badge: "Hot",
    style: "Realism",
    placements: ["Chest", "Thigh", "Upper Back"],
    productColor: "#b45309", 
    combinations: [
      { id: "var_12a", size: "Large (6x6)", price: "28.00", stock: 7, image: "/assets/images/Card6.png" }
    ]
  },
  {
    id: "prod_13",
    handle: "dragon-coil",
    name: "Dragon Coil",
    category: "Temporary Tattoos",
    price: "35.00",
    image: "/assets/images/Card3.png",
    badge: "Staff Pick",
    style: "Japanese",
    placements: ["Full Arm", "Leg Wrap", "Back"],
    productColor: "#0f172a", 
    combinations: [
      { id: "var_13a", size: "Extra Large (8x14)", price: "35.00", stock: 4, image: "/assets/images/Card3.png" }
    ]
  },
  {
    id: "prod_14",
    handle: "tarot-the-moon",
    name: "Tarot Card: The Moon",
    category: "Temporary Tattoos",
    price: "16.00",
    image: "/assets/images/Card5.png",
    badge: null,
    style: "Blackwork",
    placements: ["Forearm", "Calf", "Bicep"],
    productColor: "#27272a", 
    combinations: [
      { id: "var_14a", size: "Medium (3x5)", price: "16.00", stock: 22, image: "/assets/images/Card5.png" }
    ]
  },
  {
    id: "prod_15",
    handle: "sacred-heart",
    name: "Sacred Heart",
    category: "Temporary Tattoos",
    price: "18.00",
    image: "/assets/images/Card7.png",
    badge: "Popular",
    style: "Traditional",
    placements: ["Chest", "Sternum", "Hand"],
    productColor: "#be123c", 
    combinations: [
      { id: "var_15a", size: "Medium (4x4)", price: "18.00", stock: 11, image: "/assets/images/Card7.png" }
    ]
  },
  {
    id: "prod_16",
    handle: "barbed-wire-armband",
    name: "Barbed Wire Armband",
    category: "Temporary Tattoos",
    price: "14.00",
    image: "/assets/images/Card9.png",
    badge: null,
    style: "Tribal",
    placements: ["Bicep", "Wrist", "Ankle"],
    productColor: "#404040", 
    combinations: [
      { id: "var_16a", size: "Wrap (2x10)", price: "14.00", stock: 30, image: "/assets/images/Card9.png" }
    ]
  },
  {
    id: "prod_17",
    handle: "butterfly-swarm",
    name: "Butterfly Swarm",
    category: "Temporary Tattoos",
    price: "20.00",
    image: "/assets/images/Card2.png",
    badge: "Popular",
    style: "Fine Line",
    placements: ["Shoulder", "Ribs", "Thigh"],
    productColor: "#3b82f6", 
    combinations: [
      { id: "var_17a", size: "Large (5x7)", price: "20.00", stock: 16, image: "/assets/images/Card2.png" }
    ]
  },
  {
    id: "prod_18",
    handle: "watercolor-fox",
    name: "Watercolor Fox",
    category: "Temporary Tattoos",
    price: "24.00",
    image: "/assets/images/Card10.png",
    badge: "Artistic",
    style: "Watercolor",
    placements: ["Calf", "Forearm", "Shoulder Blade"],
    productColor: "#f97316", 
    combinations: [
      { id: "var_18a", size: "Medium (4x6)", price: "24.00", stock: 9, image: "/assets/images/Card10.png" }
    ]
  },
  {
    id: "prod_19",
    handle: "gothic-lettering-pack",
    name: "Gothic Lettering Pack",
    category: "Flash Sheets",
    price: "25.00",
    image: "/assets/images/Card4.png",
    badge: "Digital Download",
    style: "Lettering",
    placements: ["Any"],
    productColor: "#18181b", 
    combinations: [
      { id: "var_19a", size: "Standard (8.5x11)", price: "25.00", stock: 999, image: "/assets/images/Card4.png" }
    ]
  },
  {
    id: "prod_20",
    handle: "abstract-line-art",
    name: "Abstract Line Art",
    category: "Temporary Tattoos",
    price: "18.00",
    image: "/assets/images/Card8.png",
    badge: "New",
    style: "Abstract",
    placements: ["Forearm", "Ribs", "Ankle"],
    productColor: "#52525b", 
    combinations: [
      { id: "var_20a", size: "Medium (4x5)", price: "18.00", stock: 13, image: "/assets/images/Card8.png" }
    ]
  }
];

// 3. Generate SEO Metadata dynamically
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!Array.isArray(tattooProducts)) {
    return { title: 'Product Not Found' };
  }

  const product = tattooProducts.find(
    (p) => p?.handle && (p.handle === slug || slug.includes(p.handle))
  );

  if (!product) {
    return { 
      title: 'Product Not Found | My Tattoo Store',
      description: 'The requested tattoo could not be found.'
    };
  }

  return {
    title: `${product.name} | New Arrivals | My Tattoo Store`,
    description: `Shop our newest ${product.style} temporary tattoo: ${product.name}.`,
    openGraph: {
      images: [product.image],
    },
  };
}

// 4. The Server Component Page
export default async function NewArrivalsDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!Array.isArray(tattooProducts)) {
    console.error("Error: tattooProducts is not an array. Check your import!");
    notFound(); 
  }

  const product = tattooProducts.find(
    (p) => p?.handle && (p.handle === slug || slug.includes(p.handle))
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white mt-10 min-h-screen">
      <TattooProductDetail product={product} />
    </div>
  );
}