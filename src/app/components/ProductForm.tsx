"use client";
import { useEffect, useReducer } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useProducts } from "../store/useProductStore";
import { Product } from "../interface/product.interface";
import { formReducer, initialState } from "../helpers/useReducerProductForm";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
  onSubmit: (updatedProduct: Product) => void;
}

const ProductForm = ({
  open,
  onClose,
  product,
  onSubmit,
}: ProductFormProps) => {
  const { addProduct } = useProducts();
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    if (product) {
      dispatch({ type: "SET_TITLE", payload: product.title });
      dispatch({ type: "SET_DESCRIPTION", payload: product.description });
      dispatch({ type: "SET_PRICE", payload: product.price.toString() });
      dispatch({ type: "SET_CATEGORY", payload: product.category });
      dispatch({ type: "SET_IMAGE", payload: product.image });
    } else {
      dispatch({ type: "RESET_FORM" });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !state.price ||
      isNaN(parseFloat(state.price)) ||
      parseFloat(state.price) <= 0
    ) {
      dispatch({
        type: "SET_PRICE_ERROR",
        payload: "Please enter a valid price.",
      });
      return;
    }

    const updatedProduct = {
      id: product ? product.id : Date.now(),
      title: state.title,
      description: state.description,
      price: parseFloat(state.price),
      category: state.category,
      image:
        state.image ||
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
      rating: product?.rating || { rate: 0, count: 0 },
    };

    if (product) {
      onSubmit(updatedProduct);
    } else {
      addProduct(updatedProduct);
    }

    dispatch({ type: "RESET_FORM" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product ? "Update Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <form data-testid="product-form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={state.title}
            onChange={(e) =>
              dispatch({ type: "SET_TITLE", payload: e.target.value })
            }
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={state.description}
            onChange={(e) =>
              dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={state.price}
            onChange={(e) =>
              dispatch({ type: "SET_PRICE", payload: e.target.value })
            }
            fullWidth
            margin="normal"
            type="number"
            slotProps={{
              htmlInput: {
                min: 0,
                step: 0.01,
              },
            }}
            required
            error={!!state.priceError}
            helperText={state.priceError}
          />
          <TextField
            label="Category"
            value={state.category}
            onChange={(e) =>
              dispatch({ type: "SET_CATEGORY", payload: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={state.image}
            onChange={(e) =>
              dispatch({ type: "SET_IMAGE", payload: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary" data-testid="add-button">
              {product ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
