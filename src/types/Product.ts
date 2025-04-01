interface AttributeValue {
  code: string;
  value: number | string | boolean;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  attributes: AttributeValue[];
}
