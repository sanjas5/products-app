import { fetchProducts } from "../../app/utils/api";

global.fetch = jest.fn();

describe("fetchProducts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return products when the fetch request is successful", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 100 },
      { id: 2, title: "Product 2", price: 200 },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const products = await fetchProducts();

    expect(products).toEqual(mockProducts);
  });

  test("should throw an error when the fetch request fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Error" }),
    });

    await expect(fetchProducts()).rejects.toThrow("Failed to fetch products");
  });

  test("should throw an error if fetch fails due to network error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchProducts()).rejects.toThrow("Network error");
  });
});
