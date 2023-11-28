export interface Cart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
    shippingAmount: Money;
  };
  lines: CartItem[];
  totalQuantity: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Product {
  seo?: {
    title?: string;
    description?: string;
  };
  variants: ProductVariant[];
  images: Image[];
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  featuredImage: Image;
  tags: string[];
  updatedAt: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  code: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
}

export interface Image {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface Menu {
  title: string;
  path: string;
}

export interface Collection {
  seo?: {
    title?: string;
    description?: string;
  };
  code: string;
  title: string;
  path: string;
}

export interface GetCollectionProductsPayload {
  collection?: string;
  sortKey?: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse?: boolean;
}

export interface GetProductsPayload {
  sortKey?: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse?: boolean;
  query?: string;
}

export type AddToCartPayload = { merchandiseId: string; quantity: number };
export type UpdateCartPayload = { id: string; merchandiseId: string; quantity: number };
