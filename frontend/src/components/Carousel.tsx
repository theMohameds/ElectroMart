import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; // core Swiper
import 'swiper/css/navigation'; // navigation module

// Exercise 4: Retry helper with exponential back-off
// Retries the fetch up to MAX_RETRIES times before giving up.
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500;
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<any[]> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.warn(`[Carousel] Attempt ${attempt}/${retries} failed:`, error);
      if (attempt < retries) {
        await delay(BASE_DELAY_MS * attempt); // 500 ms → 1000 ms → 1500 ms
      }
    }
  }
  return []; // all retries exhausted — degrade gracefully
}

const Carousel = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Exercise 4: uses retry wrapper instead of a bare axios.get
      const data = await fetchWithRetry('http://localhost:3001/get-product-recommendations');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="content-container">
      <h2>Recommended Products!</h2>

      {products.length === 0 ? (
        <p>Unable to get recommended products...</p>
      ) : (
        <Swiper modules={[Navigation]}
          navigation spaceBetween={50} slidesPerView={3}>
          {products.map((product) => (
            <SwiperSlide key={product.title}>
              <div className="product-image-container">
                <img src={product.imageUrl} alt={product.title} />
              </div>
              <h3>{product.title}</h3>
              <p>Price: ${Math.round(product.basePrice * (1 - product.discountRate) * product.taxRate)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

    </div>
  );
};

export default Carousel;
