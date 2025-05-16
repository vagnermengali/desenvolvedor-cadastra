import { useEffect, useMemo, useState } from "react";
import { Header } from "../utils/header";
import { Footer } from "../utils/footer";
import { OrderBy } from "../utils/order-by";
import { Filter } from "../utils/filter";
import { Product } from "../utils/product";
import { ShowMore } from "../utils/show-more";

type ProductType = {
  id: string;
  name: string;
  price: number;
  parcelamento: [number, number];
  color: string;
  image: string;
  size: string[];
  date: string;
};

const Category = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  const [cartCount, setCartCount] = useState(0);

  const PRODUCTS_DESKTOP = 9;
  const PRODUCTS_MOBILE = 4;

  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768 ? PRODUCTS_MOBILE : PRODUCTS_DESKTOP;
    }
    return PRODUCTS_DESKTOP;
  });

  useEffect(() => {
    const handleResize = () => {
      if (!isExpanded) {
        setVisibleCount(
          window.innerWidth <= 768 ? PRODUCTS_MOBILE : PRODUCTS_DESKTOP
        );
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleShow = () => {
    if (isExpanded) {
      setVisibleCount(
        window.innerWidth <= 768 ? PRODUCTS_MOBILE : PRODUCTS_DESKTOP
      );
    } else {
      setVisibleCount(filteredProducts.length);
    }
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedColors.length) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }

    if (selectedSizes.length) {
      result = result.filter((p) =>
        p.size.some((s) => selectedSizes.includes(s))
      );
    }

    if (selectedPrices.length) {
      result = result.filter((p) => {
        return selectedPrices.some((range) => {
          const price = p.price;
          switch (range) {
            case "0-50":
              return price <= 50;
            case "51-150":
              return price > 50 && price <= 150;
            case "151-300":
              return price > 150 && price <= 300;
            case "301-500":
              return price > 300 && price <= 500;
            case "500+":
              return price > 500;
            default:
              return true;
          }
        });
      });
    }

    switch (sortOption) {
      case "recentes":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "menor-preco":
        result.sort((a, b) => a.price - b.price);
        break;
      case "maior-preco":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, selectedColors, selectedSizes, selectedPrices, sortOption]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const addToCart = () => {
    setCartCount((count) => count + 1);
  };

  const showButton =
    (!isExpanded && visibleCount < filteredProducts.length) ||
    (isExpanded &&
      filteredProducts.length >
        (window.innerWidth <= 768 ? PRODUCTS_MOBILE : PRODUCTS_DESKTOP));

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="category">
        <div className="category__header">
          <h1 className="category__title">Blusas</h1>
          <OrderBy setSortOption={setSortOption} sortOption={sortOption} />
        </div>
        <div className="category__content">
          <Filter
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedPrices={selectedPrices}
            setSelectedPrices={setSelectedPrices}
          />
          <div>
            <div className="category__product-list">
              {visibleProducts.map((product, index) => (
                <Product
                  key={`${product.id}-${index}`}
                  product={product}
                  onClick={addToCart}
                />
              ))}
            </div>
            {showButton && (
              <ShowMore isExpanded={isExpanded} onClick={toggleShow} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Category;
