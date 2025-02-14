import { render, screen, fireEvent } from "@testing-library/react";
import SmallProduct from "../SmallProduct";
import { ProductsContext } from "../../App";
import { handleStock } from "../../Hooks/StockHook";
import { Product } from "../../Models/Product.model";
import { ProductsContextType } from "../../Interfaces/interfaces";

jest.mock("../../Hooks/StockHook", () => ({
  handleStock: jest.fn(),
}));

describe("SmallProduct Component", () => {
  const dummyProduct: Product = {
    id: "1",
    image_url: "https://example.com/product.jpg",
    stock: 10,
    productName: "Test Product",
    price: 20,
    productDescription: "Descripción del producto de prueba",
    favorite: 0,
  };

  const dummyContext: ProductsContextType = {
    products: [dummyProduct],
    cart: [dummyProduct],
    modifyStock: jest.fn(),
    modifyFav: jest.fn(),
  };

  const renderComponent = () =>
    render(
      <ProductsContext.Provider value={dummyContext}>
        <SmallProduct product={dummyProduct} />
      </ProductsContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe llamar a "handleStock" con false al hacer clic en el botón "-"', () => {
    renderComponent();

    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);

    expect(handleStock).toHaveBeenCalledTimes(1);
    expect(handleStock).toHaveBeenCalledWith(dummyContext, false, dummyProduct.id);
  });

  test('debe llamar a "handleStock" con true al hacer clic en el botón "+"', () => {
    renderComponent();

    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);

    expect(handleStock).toHaveBeenCalledTimes(1);
    expect(handleStock).toHaveBeenCalledWith(dummyContext, true, dummyProduct.id);
  });
});