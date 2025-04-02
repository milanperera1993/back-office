import { Product } from "../../types/common";
import { getPrice, getInStock } from "../common";

const createProduct = (overrides: Partial<Product> = {}, attributeOverrides: Partial<Product["attributes"][0]>[] = []): Product => {
  const baseAttributes = [
    { code: "color", value: "red" },
    { code: "material", value: "plastic1" },
    { code: "price", value: 107.53 },
    { code: "in_stock", value: true },
  ];
  const mergedAttributes = baseAttributes.map((attr) => {
    const override = attributeOverrides.find((o) => o.code === attr.code);
    return override ? { ...attr, ...override } : attr;
  });

  return {
    id: 11,
    name: "Smart TV Model 1",
    category_id: 3,
    attributes: mergedAttributes,
    ...overrides,
  };
};

describe("getPrice", () => {
  it("should return the price if the price attribute exists and is a number", () => {
    const product = createProduct();
    expect(getPrice(product)).toBe(107.53);
  });

  it("should return 0 if the price attribute is missing", () => {
    const product: Product = {
      id: 0,
      name: "",
      category_id: 0,
      attributes: [{ code: "in_stock", value: true }],
    };
    expect(getPrice(product)).toBe(0);
  });

  it("should return 0 if the price attribute value is not a number", () => {
    const product = createProduct({}, [{ code: "price", value: "not_a_number" }]);
    expect(getPrice(product)).toBe(0);
  });
});

describe("getInStock", () => {
  it("should return true if the in_stock attribute exists and is true", () => {
    const product = createProduct();
    expect(getInStock(product)).toBe(true);
  });

  it("should return false if the in_stock attribute is missing", () => {
    const product: Product = {
      id: 11,
      name: "Smart TV Model 1",
      category_id: 3,
      attributes: [
        { code: "color", value: "red" },
        { code: "material", value: "plastic1" },
        { code: "price", value: 107.53 },
      ],
    };
    expect(getInStock(product)).toBe(false);
  });

  it("should return false if the in_stock attribute value is not a boolean", () => {
    const product = createProduct({}, [{ code: "in_stock", value: "yes" }]);
    expect(getInStock(product)).toBe(false);
  });
});