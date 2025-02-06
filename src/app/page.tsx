"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useProducts } from "./store/useProductStore";
import { fetchProducts } from "./utils/api";
import { Product } from "./interface/product.interface";
import SnackbarComponent from "./components/SnackbarComponent";

const ProductList = dynamic(() => import("./components/ProductList"), {
  loading: () => <CircularProgress />,
});

const ProductForm = dynamic(() => import("./components/ProductForm"), {
  loading: () => <CircularProgress />,
});

const HomePage = () => {
  const { products, addProduct } = useProducts();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      const getProducts = async () => {
        try {
          const data = await fetchProducts();
          data.forEach((product: Product) => addProduct(product));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      getProducts();
    }
  }, [addProduct, products.length]);

  const handleSubmit = (newProduct: Product) => {
    addProduct(newProduct);
  };

  return (
    <div className="h-auto">
      <SnackbarComponent />
      <div className="flex justify-between items-center mt-6 ml-6 mb-2">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          size="large"
        >
          Add Item
        </Button>
        <ProductForm
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
      <Typography variant="h4" gutterBottom align="center">
        All Products
      </Typography>
      <ProductList />
    </div>
  );
};

export default HomePage;
