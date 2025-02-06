import { useProductStore } from "./productStore";

export const useProducts = () => {
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  return { products, addProduct, removeProduct, updateProduct };
};
