import { AttributeValue, Product } from "../types/common";

export const getPrice = (record: Product): number => {
  const priceAttr = record.attributes.find(
    (attr: AttributeValue) => attr.code === "price"
  );
  return typeof priceAttr?.value === "number" ? priceAttr.value : 0;
};

export const getInStock = (record: Product): boolean => {
  const inStockAttr = record.attributes.find(
    (attr: AttributeValue) => attr.code === "in_stock"
  );
  return typeof inStockAttr?.value === "boolean" ? inStockAttr.value : false;
};