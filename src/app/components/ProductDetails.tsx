"use client";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { redirect } from "next/navigation";
import { Product } from "../interface/product.interface";

interface ProductDetailsProps {
  product: Product | null;
  onDelete: () => void;
  onUpdate: (updatedProduct: Product) => void;
}

const ProductDetails = ({
  product,
  onDelete,
  onUpdate,
}: ProductDetailsProps) => {
  if (!product) {
    return <div>No product found &#128542;</div>;
  }
  const handleUpdateClick = () => {
    if (onUpdate) {
      onUpdate(product);
    }
  };

  const handleBack = () => {
    redirect("/");
  };

  return (
    <div className="p-6">
      <Button onClick={handleBack} variant="outlined" className="mb-6">
        Back
      </Button>
      <Typography variant="h4" className="font-bold text-center mb-6 mt-1">
        Product Details
      </Typography>
      <Card className="m-4 p-4 shadow-md">
        <CardMedia
          component="img"
          alt={product.title}
          sx={{ width: "250px" }}
          className="h-auto object-cover rounded-lg mx-auto"
          image={product.image}
        />
        <CardContent>
          <Typography variant="h4" className="font-semibold text-lg mt-2">
            {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mt-1">
            {product.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mt-1">
            {product.description}
          </Typography>
          <Typography
            variant="h6"
            className="mt-2 text-xl font-[1000] text-[#333] bg-[#a9a9a9]/10 text-center p-2 rounded-sm"
          >
            ${product.price}
          </Typography>

          <Typography variant="body2" className="mt-2" color="#8c9693">
            Rating: {product.rating?.rate} ({product.rating?.count} reviews)
          </Typography>
          <div className="mt-4 flex space-x-4">
            <Button onClick={onDelete} color="error" variant="outlined">
              Delete
            </Button>
            <Button
              onClick={handleUpdateClick}
              color="primary"
              variant="contained"
            >
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
