import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';

interface UnmarkedSectionProps {
    products: Product[];
    onAddToCart: (product: Product, size: string) => void;
    onToggleWishlist: (product: Product) => void;
    wishlistItems: Product[];
}

export const UnmarkedSection: React.FC<UnmarkedSectionProps> = ({
    products,
    onAddToCart,
    onToggleWishlist,
    wishlistItems
}) => {
    const navigate = useNavigate();

    const unmarkedProducts = products
        .filter(p => p.category === 'UNMARKED' || p.tags?.includes('UNMARKED'))
        .slice(0, 3);

    if (unmarkedProducts.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Left-aligned heading */}
                <div className="mb-10">
                    <p className="font-chakra font-normal text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-2">
                        Collection
                    </p>
                    <h2 className="font-chakra font-normal text-2xl tracking-[0.2em] text-gray-950 uppercase">
                        Unmarked
                    </h2>
                </div>

                {/* 3 products — using 4-col grid so cards don't stretch too wide */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
                    {unmarkedProducts.map((product) => {
                        const isWishlisted = wishlistItems.some(item => item.id === product.id);
                        return (
                            <div
                                key={product.id}
                                className="cursor-pointer"
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    navigate(`/product/${product.id}`);
                                }}
                            >
                                <ProductCard
                                    product={product}
                                    onAddToCart={(p, size) => onAddToCart(p, size)}
                                    onToggleWishlist={(p) => onToggleWishlist(p)}
                                    isWishlisted={isWishlisted}
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};