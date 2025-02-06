import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "../../app/components/ProductForm";
import { Product } from "../../app/interface/product.interface";

jest.mock("../../app/store/useProductStore", () => ({
  useProducts: () => ({
    addProduct: jest.fn(),
  }),
}));

const renderProductForm = (props: React.ComponentProps<typeof ProductForm>) =>
  render(<ProductForm {...props} />);

describe("ProductForm Component", () => {
  const product: Product = {
    id: 1,
    title: "Sample Product",
    description: "This is a sample product description",
    price: 100,
    category: "Electronics",
    image: "https://via.placeholder.com/150",
    rating: { rate: 4.5, count: 20 },
  };

  it("renders the form with product data when product is provided", () => {
    renderProductForm({
      open: true,
      onClose: jest.fn(),
      product,
      onSubmit: jest.fn(),
    });

    expect(screen.getByLabelText(/Title/)).toHaveValue("Sample Product");
    expect(screen.getByLabelText(/Description/)).toHaveValue(
      "This is a sample product description"
    );
    expect(screen.getByLabelText(/Price/)).toHaveValue(100);
    expect(screen.getByLabelText(/Category/)).toHaveValue("Electronics");
    expect(screen.getByLabelText(/Image URL/)).toHaveValue(
      "https://via.placeholder.com/150"
    );
  });

  it("renders the form with empty fields when no product is provided", () => {
    renderProductForm({
      open: true,
      onClose: jest.fn(),
      product: null,
      onSubmit: jest.fn(),
    });

    expect(screen.getByLabelText(/Title/)).toHaveValue("");
    expect(screen.getByLabelText(/Description/)).toHaveValue("");
    expect(screen.getByLabelText(/Price/)).toHaveValue(null);
    expect(screen.getByLabelText(/Category/)).toHaveValue("");
    expect(screen.getByLabelText(/Image URL/)).toHaveValue("");
  });

  it("shows an error message if the price is invalid", async () => {
    renderProductForm({
      open: true,
      onClose: jest.fn(),
      product: null,
      onSubmit: jest.fn(),
    });

    fireEvent.change(screen.getByLabelText(/Price/), {
      target: { value: "-1" },
    });
    fireEvent.click(screen.getByTestId("add-button"));

    await waitFor(() => expect(screen.getByText("Price")).toBeInTheDocument());
  });

  it("resets the form when the dialog is closed", async () => {
    renderProductForm({
      open: true,
      onClose: jest.fn(),
      product: null,
      onSubmit: jest.fn(),
    });

    fireEvent.change(screen.getByLabelText(/Title/), {
      target: { value: "Temp Product" },
    });

    fireEvent.click(screen.getByText(/Cancel/));

    await waitFor(() =>
      expect(screen.getByLabelText(/Title/)).toHaveValue("Temp Product")
    );
  });
});
