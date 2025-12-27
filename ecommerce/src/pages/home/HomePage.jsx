import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";

const HomePage = ({ cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />{" "}
      </div>
    </>
  );
};

export default HomePage;
