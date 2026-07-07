import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Share2, ShoppingBag } from 'lucide-react';
import { products, Product } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';

interface ProductDetailPageProps {
    onAddToCart: (product: Product) => void;
    onToggleWishlist: (product: Product) => void;
    wishlistItems: Product[];
}

type Tab = 'description' | 'reviews';

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
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

    // 404 guard
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

    // Related: same category, exclude current
    const related = products
        .filter((p) => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    return (
        <div className="min-h-screen bg-white">

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

            {/* Main product layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

                    {/* ── Left: Image ──────────────────────────── */}
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                        />
                        {product.badge && (
                            <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1">
                                {product.badge}
                            </span>
                        )}
                    </div>

                    {/* ── Right: Details ───────────────────────── */}
                    <div className="flex flex-col gap-5 pt-2">

                        {/* Category */}
                        <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>

                        {/* Name */}
                        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-950 leading-snug">
                            {product.name}
                        </h1>

                        {/* Price */}
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

                        {/* Installment */}
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

                        {/* Divider */}
                        <div className="border-t border-gray-100" />

                        {/* Size selector */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Size</p>
                                <button className="text-xs text-gray-400 underline hover:text-gray-700 cursor-pointer transition-colors">
                                    Size Chart
                                </button>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {sizes.map((size) => (
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
                            {/* Qty stepper */}
                            <div className="flex items-center border border-gray-300 h-12">
                                <button
                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="px-3 h-full text-lg text-gray-600 hover:bg-gray-100 cursor-pointer select-none"
                                >
                                    −
                                </button>
                                <span className="px-4 text-sm font-medium min-w-[36px] text-center">{qty}</span>
                                <button
                                    onClick={() => setQty((q) => q + 1)}
                                    className="px-3 h-full text-lg text-gray-600 hover:bg-gray-100 cursor-pointer select-none"
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to cart */}
                            <button
                                onClick={() => {
                                    for (let i = 0; i < qty; i++) onAddToCart(product);
                                }}
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

                        {/* Meta */}
                        <div className="text-xs text-gray-500 space-y-1 border-t border-gray-100 pt-4">
                            <p>
                                <span className="font-medium text-gray-700">Categories:</span>{' '}
                                {product.category}
                                {product.tags && product.tags.length > 0 && `, ${product.tags.join(', ')}`}
                            </p>
                        </div>

                        {/* Share */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 font-medium">Share:</span>
                            <button
                                className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                                aria-label="Share"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Tabs ─────────────────────────────────────────────── */}
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

                <div className="py-10 max-w-2xl text-sm text-gray-600 leading-relaxed">
                    {activeTab === 'description' ? (
                        <div className="space-y-3">
                            <p className="font-semibold text-gray-900 uppercase tracking-wide text-xs">
                                {product.name}
                            </p>
                            <p>
                                Introducing the FITFAM {product.name}. Built for those who never stop pushing limits —
                                a streetwear-inspired fit designed for gym sessions, daily wear, and stronger days ahead.
                            </p>
                            <ul className="space-y-2 mt-2">
                                {['Premium Oversized Fit', 'Soft & Comfortable Fabric', 'High-Quality Print', 'Unisex Design', 'Perfect for Gym & Casual Wear'].map((f) => (
                                    <li key={f} className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">
                            There are no reviews yet. Be the first to review this product.
                        </p>
                    )}
                </div>

                {/* ── Related Products ─────────────────────────────────── */}
                {related.length > 0 && (
                    <div className="border-t border-gray-100 pt-14">
                        <h2 className="text-xl font-semibold text-gray-950 uppercase tracking-wider text-center mb-10">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {related.map((p) => (
                                <div
                                    key={p.id}
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/product/${p.id}`)}
                                >
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
        </div>
    );
};