"use client";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Product } from "../interface/product.interface";
import { truncateString } from "../helpers/truncateString";

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const router = useRouter();

  const handleShowDetails = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="mt-10">
      <Card className="m-4 p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <CardMedia
          component="img"
          alt={product.title}
          image={product.image}
          className="h-80"
        />
        <CardContent>
          <Typography
            variant="h6"
            className="font-semibold mb-2 h-10 overflow-hidden"
          >
            {truncateString(product.title, 20)}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-2">
            {product.category}
          </Typography>
          <Typography variant="body2" className="mb-4 h-20 overflow-hidden">
            {truncateString(product.description, 100)}
          </Typography>
          <div className="mb-2 font-bold text-center text-gray-800 bg-gray-100 p-2 rounded-lg">
            ${product.price}
          </div>
          <Typography variant="body2" color="#8c9693" sx={{ mb: 1 }}>
            Rating: {product.rating?.rate} ({product.rating?.count} reviews)
          </Typography>
          <div className="flex justify-between gap-2 mt-4">
            <Button
              onClick={handleShowDetails}
              variant="outlined"
              size="small"
              fullWidth
              className="text-blue-600"
            >
              Show Details
            </Button>
            <Button
              onClick={onDelete}
              color="error"
              variant="outlined"
              size="small"
              fullWidth
              className="ml-2"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
