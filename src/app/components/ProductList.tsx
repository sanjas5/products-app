"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import { useProducts } from "../store/useProductStore";
import { useSnackbarStore } from "../store/useSnackbarStore";
import { Product } from "../interface/product.interface";

const ProductCard = dynamic(() => import("./ProductCard"), {
  ssr: false,
  loading: () => null,
});

const DynamicPagination = dynamic(
  () => import("@mui/material").then((mod) => mod.Pagination),
  {
    ssr: false,
    loading: () => <CircularProgress data-testid="loading-spinner" />,
  }
);

const ProductList = () => {
  const { products, removeProduct } = useProducts();
  const { showSnackbar } = useSnackbarStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleRemoveProduct = (productId: number) => {
    showSnackbar("Product has been deleted");
    removeProduct(productId);

    if (currentProducts.length === 1) {
      const prevPage = currentPage > 1 ? currentPage - 1 : 1;
      setCurrentPage(prevPage);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {currentProducts.map((product: Product, index: number) => (
          <div key={index} className="w-full">
            <ProductCard
              product={product}
              onDelete={() => handleRemoveProduct(product.id)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {!loading && (
          <DynamicPagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
