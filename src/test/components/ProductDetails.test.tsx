import "@testing-library/jest-dom";
import { redirect } from "next/navigation";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetails from "../../app/components/ProductDetails";
import { Product } from "../../app/interface/product.interface";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

const mockOnDelete = jest.fn();
const mockOnUpdate = jest.fn();

const product: Product = {
  id: 1,
  title: "Amazing Product",
  description: "This is a fantastic product with amazing features.",
  category: "Electronics",
  image: "https://via.placeholder.com/150",
  price: 99.99,
  rating: { rate: 4.5, count: 120 },
};

describe("ProductDetails", () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
    mockOnUpdate.mockClear();
  });

  test("renders product details correctly", () => {
    render(
      <ProductDetails
        product={product}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText("Amazing Product")).toBeInTheDocument();

    expect(screen.getByText("Electronics")).toBeInTheDocument();

    expect(
      screen.getByText("This is a fantastic product with amazing features.")
    ).toBeInTheDocument();

    expect(screen.getByText("$99.99")).toBeInTheDocument();

    expect(screen.getByText("Rating: 4.5 (120 reviews)")).toBeInTheDocument();
  });

  test("calls onDelete when 'Delete' button is clicked", () => {
    render(
      <ProductDetails
        product={product}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test("calls onUpdate when 'Update' button is clicked", () => {
    render(
      <ProductDetails
        product={product}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);

    expect(mockOnUpdate).toHaveBeenCalledWith(product);
  });

  test("calls redirect when 'Back' button is clicked", () => {
    render(
      <ProductDetails
        product={product}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    expect(redirect).toHaveBeenCalledWith("/");
  });

  test("shows 'No product found' message when no product is passed", () => {
    render(
      <ProductDetails
        product={null}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText(/No product found/)).toBeInTheDocument();
  });
});
