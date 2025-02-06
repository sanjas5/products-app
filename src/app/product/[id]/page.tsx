"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { redirect, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import { useProducts } from "../../store/useProductStore";
import { useSnackbarStore } from "../../store/useSnackbarStore";
import { Product } from "../../interface/product.interface";

const ProductDetails = dynamic(
  () => import("../../components/ProductDetails"),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  }
);

const ProductForm = dynamic(() => import("../../components/ProductForm"), {
  loading: () => <CircularProgress />,
  ssr: false,
});

const ProductPage = () => {
  const { products, removeProduct, updateProduct } = useProducts();
  const { showSnackbar } = useSnackbarStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const foundProduct = useMemo(() => {
    if (!id) return null;
    const productId = parseInt(id as string);
    if (isNaN(productId)) return null;
    return products.find((p) => p.id === productId) || null;
  }, [id, products]);

  useEffect(() => {
    setIsLoading(false);
    setProduct(foundProduct);
  }, [foundProduct]);

  const handleDelete = useCallback(() => {
    if (product) {
      removeProduct(product.id);
      showSnackbar("Product successfully deleted!");
      redirect("/");
    }
  }, [product, removeProduct, showSnackbar]);

  const handleUpdate = useCallback(() => setIsFormOpen(true), []);

  const handleUpdateProduct = useCallback(
    (updatedProduct: Product) => {
      updateProduct(updatedProduct);
      setIsFormOpen(false);
    },
    [updateProduct]
  );

  const handleFormClose = useCallback(() => setIsFormOpen(false), []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return product ? (
    <div>
      <ProductDetails
        product={product}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      {isFormOpen && (
        <ProductForm
          open={isFormOpen}
          onClose={handleFormClose}
          product={product}
          onSubmit={handleUpdateProduct}
        />
      )}
    </div>
  ) : (
    <div className="p-4">No product found &#128542;</div>
  );
};

export default ProductPage;
