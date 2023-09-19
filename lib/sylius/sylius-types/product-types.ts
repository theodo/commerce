export interface SyliusProduct {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  slug: string;
  images: SyliusProductImage[];
  variants: SyliusProductVariant[];
  options: SyliusProductOption[];
  productTaxons: SyliusProductTaxon[];
  enabled: boolean;
  updatedAt: Date;
}

export interface SyliusProductImage {
  id: number;
  type: string;
  path: string;
}

export interface SyliusProductVariant {
  id: number;
  code: string;
  optionValues: SyliusProductOptionValue[];
  name: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
}

export interface SyliusProductOption {
  id: number;
  code: string;
  option: string;
  values: SyliusProductOptionValue[];
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface SyliusProductOptionValue {
  id: number;
  code: string;
  value: string;
  option: SyliusProductOption;
}

export interface SyliusProductTaxon {
  id: number;
  taxon: SyliusTaxon;
}

export interface SyliusTaxon {
  id: number;
  code: string;
  name: string;
  slug: string;
  description: string;
}
