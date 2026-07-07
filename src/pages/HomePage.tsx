import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/sections/HeroSection';
import { NewCollectionSection } from '../components/sections/NewCollectionSection';
import { CategoryBannersSection } from '../components/sections/CategoryBannersSection';
import { TrendingNowSection } from '../components/sections/TrendingNowSection';
import { PickYourCategorySection } from '../components/sections/PickYourCategorySection';
import { BrandVideoSection } from '../components/sections/BrandVideoSection';
import { Footer } from '../components/layout/Footer';
import { Product } from '../data/products';

interface HomePageProps {
    products: Product[];
    filteredProducts: Product[];
    onAddToCart: (product: Product) => void;
    onToggleWishlist: (product: Product) => void;
    wishlistItems: Product[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
    products,
    filteredProducts,
    onAddToCart,
    onToggleWishlist,
    wishlistItems,
    activeCategory,
    setActiveCategory,
}) => {
    const navigate = useNavigate();

    const scrollShopIntoView = () => {
        const shopSection = document.getElementById('shop');
        if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Navigate to product detail page
    const handleProductClick = (product: Product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <>
            {/* HERO SECTION */}
            <HeroSection onShopClick={scrollShopIntoView} />

            {/* NEW COLLECTION SECTION */}
            <NewCollectionSection
                products={products}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                wishlistItems={wishlistItems}
                onProductClick={handleProductClick}
            />
            {/* ← NEW prop */}
            {/* CATEGORY BANNERS SECTION */}
            <CategoryBannersSection />

            {/* TRENDING NOW SECTION */}
            <TrendingNowSection
                products={filteredProducts}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                wishlistItems={wishlistItems}
                onProductClick={handleProductClick}
            />
            {/* ← NEW prop */}
            {/* PICK YOUR CATEGORY SECTION */}
            <PickYourCategorySection />

            {/* BRAND VIDEO SECTION */}
            <BrandVideoSection />

            {/* FOOTER */}
            <Footer />
        </>
    );
};