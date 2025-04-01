interface AttributeValue {
  code: string;
  value: number | string | boolean;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  image_url?: string;
  attributes: AttributeValue[];
}

export interface Category {
  id: number;
  parent_id?: number;
  name: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
  categories: Category[];
}