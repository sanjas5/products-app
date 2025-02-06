import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../../app/components/ProductCard";
import { Product } from "../../app/interface/product.interface";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../app/helpers/truncateString", () => ({
  truncateString: jest.fn().mockImplementation((str) => str),
}));

const mockPush = jest.fn();
const mockOnDelete = jest.fn();

const product: Product = {
  id: 1,
  title: "Amazing Product",
  description: "This is a fantastic product with amazing features.",
  category: "Electronics",
  image: "https://via.placeholder.com/150",
  price: 99.99,
  rating: { rate: 4.5, count: 120 },
};

describe("ProductCard", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockOnDelete.mockClear();
  });

  test("renders product information", () => {
    render(<ProductCard product={product} onDelete={mockOnDelete} />);

    expect(screen.getByText("Amazing Product")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(
      screen.getByText("This is a fantastic product with amazing features.")
    ).toBeInTheDocument();
  });

  test("calls router.push when 'Show Details' button is clicked", () => {
    render(<ProductCard product={product} onDelete={mockOnDelete} />);

    const showDetailsButton = screen.getByText("Show Details");
    fireEvent.click(showDetailsButton);

    expect(mockPush).toHaveBeenCalledWith(`/product/${product.id}`);
  });

  test("calls onDelete when 'Delete' button is clicked", () => {
    render(<ProductCard product={product} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
