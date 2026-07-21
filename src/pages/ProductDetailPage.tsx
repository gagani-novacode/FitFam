import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Share2, ShoppingBag, X, Ruler } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { Footer } from '../components/layout/Footer';

interface ProductDetailPageProps {
    products: Product[];
    onAddToCart: (product: Product, size?: string) => void;
    onToggleWishlist: (product: Product) => void;
    wishlistItems: Product[];
}

type Tab = 'description' | 'reviews';

// ── Size Chart Data ────────────────────────────────────────────────────────
const SIZE_CHARTS = {
    tops: {
        title: "Tops / T-Shirts / Tanks",
        columns: ["Size", "Chest (cm)", "Length (cm)"],
        rows: [
            ["XS", "88", "66"],
            ["S", "92", "68"],
            ["M", "96", "70"],
            ["L", "100", "72"],
            ["XL", "104", "74"],
            ["XXL", "108", "76"],
        ],
    },
    bottoms: {
        title: "Bottoms / Shorts / Pants",
        columns: ["Size", "Waist (cm)", "Hip (cm)", "Length (cm)"],
        rows: [
            ["XS", "64", "88", "38"],
            ["S", "68", "92", "39"],
            ["M", "72", "96", "40"],
            ["L", "76", "100", "41"],
            ["XL", "80", "104", "42"],
            ["XXL", "84", "108", "43"],
        ],
    },
    leggings: {
        title: "Leggings",
        columns: ["Size", "Waist (cm)", "Hip (cm)", "Inseam (cm)"],
        rows: [
            ["XS", "60", "86", "72"],
            ["S", "64", "90", "73"],
            ["M", "68", "94", "74"],
            ["L", "72", "98", "75"],
            ["XL", "76", "102", "76"],
            ["XXL", "80", "106", "77"],
        ],
    },
    topsset: {
        title: "Tops & Short Set",
        columns: ["Size", "Chest (cm)", "Length (cm)"],
        rows: [
            ["S", "92", "68"],
            ["M", "96", "70"],
            ["L", "100", "72"],
            ["XL", "104", "74"],
        ],
    },
};

// ── Determine which chart to show based on subCategory ───────────────────
function getChartType(subCategory?: string): keyof typeof SIZE_CHARTS | null {
    if (!subCategory) return 'tops'; // default
    const sc = subCategory.toLowerCase();

    if (sc.includes('legging')) return 'leggings';
    if (sc.includes('tops & short set') || sc.includes('short set')) return 'topsset';
    if (
        sc.includes('short') ||
        sc.includes('pant') ||
        sc.includes('squat') ||
        sc.includes('bottom')
    ) return 'bottoms';
    if (
        sc.includes('tee') ||
        sc.includes('tank') ||
        sc.includes('stringer') ||
        sc.includes('oversize') ||
        sc.includes('oversized') ||
        sc.includes('dry-fit') ||
        sc.includes('dry fit') ||
        sc.includes('crop') ||
        sc.includes('top')
    ) return 'tops';

    return 'tops'; // fallback
}

// ── Size Chart Modal ──────────────────────────────────────────────────────
function SizeChartModal({
    isOpen,
    onClose,
    subCategory,
}: {
    isOpen: boolean;
    onClose: () => void;
    subCategory?: string;
}) {
    const chartType = getChartType(subCategory);
    const chart = chartType ? SIZE_CHARTS[chartType] : null;

    if (!isOpen || !chart) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <Ruler className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-extrabold uppercase tracking-widest text-gray-900">
                                Size Chart
                            </h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                                {chart.title}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Table */}
                <div className="px-6 py-5 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-black text-white">
                                {chart.columns.map((col, i) => (
                                    <th
                                        key={col}
                                        className={`py-3 px-4 text-[10px] font-bold uppercase tracking-widest ${i === 0 ? 'text-left' : 'text-center'}`}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {chart.rows.map((row, rowIdx) => (
                                <tr
                                    key={rowIdx}
                                    className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    {row.map((cell, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className={`py-3 px-4 text-sm ${colIdx === 0
                                                ? 'font-extrabold text-gray-900 text-left uppercase tracking-wider'
                                                : 'text-center text-gray-600 font-medium'
                                                }`}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────
export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
    products,
    onAddToCart,
    onToggleWishlist,
    wishlistItems,
}) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const product = products.find((p) => p.id === id);

    const [selectedSize, setSelectedSize] = useState<string>('M');
    const [activeTab, setActiveTab] = useState<Tab>('description');
    const [qty, setQty] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false); // ← new

    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveImageIndex(0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
                <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
                <p className="text-sm text-gray-500">The product you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 bg-black text-white px-6 py-3 text-xs uppercase font-extrabold tracking-widest hover:bg-gray-900 cursor-pointer"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const isWishlisted = wishlistItems.some((w) => w.id === product.id);
    const related = products
        .filter((p) => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

    const allImages = (product.images && product.images.length > 0)
        ? product.images
        : [product.image];

    const goToPrev = () =>
        setActiveImageIndex((i) => (i === 0 ? allImages.length - 1 : i - 1));

    const goToNext = () =>
        setActiveImageIndex((i) => (i === allImages.length - 1 ? 0 : i + 1));

    return (
        <div className="min-h-screen bg-white">

            {/* Size Chart Modal */}
            <SizeChartModal
                isOpen={isSizeChartOpen}
                onClose={() => setIsSizeChartOpen(false)}
                subCategory={(product as any).subCategory}
            />

            {/* Breadcrumb */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <ol className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
                    <li>
                        <button onClick={() => navigate('/')} className="hover:text-gray-900 transition-colors cursor-pointer">
                            Home
                        </button>
                    </li>
                    <li className="flex items-center gap-1">
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                        <span>{product.category}</span>
                    </li>
                    <li className="flex items-center gap-1">
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                        <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

                    {/* ── Left: Image Carousel ─────────────────────── */}
                    <div className="flex flex-col gap-3">
                        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                            <img
                                key={activeImageIndex}
                                src={allImages[activeImageIndex]}
                                alt={`${product.name} - image ${activeImageIndex + 1}`}
                                className="w-full h-full object-cover object-center transition-opacity duration-300"
                            />
                            {product.badge && (
                                <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1">
                                    {product.badge}
                                </span>
                            )}
                            {allImages.length > 1 && (
                                <>
                                    <button onClick={goToPrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all cursor-pointer z-10">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button onClick={goToNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all cursor-pointer z-10">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                        {allImages.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImageIndex(i)}
                                                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${i === activeImageIndex ? 'bg-black w-4' : 'bg-black/30'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {allImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {allImages.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImageIndex(i)}
                                        className={`flex-shrink-0 w-16 h-20 border-2 overflow-hidden transition-all cursor-pointer ${i === activeImageIndex ? 'border-black' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Details ───────────────────────── */}
                    <div className="flex flex-col gap-5 pt-2">

                        <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>

                        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-950 leading-snug">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-bold text-gray-900">
                                LK {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                            {product.originalPrice && (
                                <span className="text-base text-gray-400 line-through">
                                    LK {product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </span>
                            )}
                        </div>

                        <p className="text-xs text-gray-500">
                            or 3 ×{' '}
                            <span className="font-semibold text-gray-700">
                                LK {Math.ceil(product.price / 3).toLocaleString()}
                            </span>{' '}
                            with <span className="font-semibold text-indigo-600">Koko</span>
                            {product.price >= 20000 && (
                                <span className="ml-2 text-green-600 font-semibold">✓ Free Shipping</span>
                            )}
                        </p>

                        <div className="border-t border-gray-100" />

                        {/* Size selector */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Size</p>
                                {/* ← Size Chart button now opens modal */}
                                <button
                                    onClick={() => setIsSizeChartOpen(true)}
                                    className="text-xs text-gray-400 underline hover:text-gray-700 cursor-pointer transition-colors flex items-center gap-1"
                                >
                                    <Ruler className="w-3 h-3" />
                                    Size Chart
                                </button>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {(product.sizes && product.sizes.length > 0 ? product.sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`min-w-[44px] h-10 px-3 border text-sm font-medium transition-all cursor-pointer ${selectedSize === size
                                            ? 'bg-gray-900 text-white border-gray-900'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Qty + Add to Cart */}
                        <div className="flex items-center gap-3 pt-1">
                            <div className="flex items-center border border-gray-300 h-12">
                                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 h-full text-lg text-gray-600 hover:bg-gray-100 cursor-pointer select-none">−</button>
                                <span className="px-4 text-sm font-medium min-w-[36px] text-center">{qty}</span>
                                <button onClick={() => setQty((q) => q + 1)} className="px-3 h-full text-lg text-gray-600 hover:bg-gray-100 cursor-pointer select-none">+</button>
                            </div>
                            <button
                                onClick={() => { for (let i = 0; i < qty; i++) onAddToCart(product, selectedSize); }}
                                className="flex-1 h-12 bg-[#111111] text-white text-xs font-extrabold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Add To Cart
                            </button>
                        </div>

                        {/* Wishlist */}
                        <button
                            onClick={() => onToggleWishlist(product)}
                            className={`w-full h-11 border text-xs font-extrabold tracking-widest uppercase transition-all cursor-pointer ${isWishlisted
                                ? 'border-red-400 text-red-500 bg-red-50 hover:bg-red-100'
                                : 'border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {isWishlisted ? '♥ Saved to Wishlist' : '♡ Save to Wishlist'}
                        </button>

                        <div className="text-xs text-gray-500 space-y-1 border-t border-gray-100 pt-4">
                            <p>
                                <span className="font-medium text-gray-700">Categories:</span>{' '}
                                {product.category}
                                {product.tags && product.tags.length > 0 && `, ${product.tags.join(', ')}`}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 font-medium">Share:</span>
                            <button className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer" aria-label="Share">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-16 border-b border-gray-200">
                    <div className="flex gap-8">
                        {(['description', 'reviews'] as Tab[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-medium capitalize tracking-wide transition-colors cursor-pointer border-b-2 -mb-px ${activeTab === tab
                                    ? 'border-yellow-500 text-yellow-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                            >
                                {tab === 'reviews' ? 'Reviews (0)' : 'Description'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="py-10 max-w-2xl text-sm text-gray-600 leading-relaxed">
                    {activeTab === 'description' ? (
                        <div className="space-y-8">

                            {/* About */}
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-full" />
                                <div className="pl-5">
                                    <p className="text-[10px] uppercase tracking-widest text-yellow-600 font-bold mb-2">
                                        About this product
                                    </p>
                                    <p className="text-gray-700 leading-relaxed text-sm">
                                        {(product as any).descriptionAbout || product.description ||
                                            `Introducing the FITFAM ${product.name}. Built for those who never stop pushing limits — a streetwear-inspired fit designed for gym sessions, daily wear, and stronger days ahead.`
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">
                                    Features
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(
                                        (product as any).descriptionFeatures
                                            ? (product as any).descriptionFeatures.split('\n').filter(Boolean)
                                            : ['Premium Oversized Fit', 'Soft & Comfortable Fabric', 'High-Quality Print', 'Unisex Design', 'Perfect for Gym & Casual Wear']
                                    ).map((feature: string, i: number) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-3 rounded-lg"
                                        >
                                            <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                                ✓
                                            </span>
                                            <span className="text-sm text-gray-700 font-medium">{feature.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Care Instructions */}
                            {(product as any).descriptionCare && (
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">
                                        Care Instructions
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {(product as any).descriptionCare
                                            .split('\n')
                                            .filter(Boolean)
                                            .map((instruction: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-2 rounded-full"
                                                >
                                                    <span>♻</span>
                                                    {instruction.trim()}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">There are no reviews yet. Be the first to review this product.</p>
                    )}
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="border-t border-gray-100 pt-14">
                        <h2 className="text-xl font-semibold text-gray-950 uppercase tracking-wider text-center mb-10">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {related.map((p) => (
                                <div key={p.id} className="cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
                                    <ProductCard
                                        product={p}
                                        onAddToCart={onAddToCart}
                                        onToggleWishlist={onToggleWishlist}
                                        isWishlisted={wishlistItems.some((w) => w.id === p.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};