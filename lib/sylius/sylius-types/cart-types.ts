import { SyliusProduct, SyliusProductOptionValue, SyliusProductVariant } from './product-types';

export interface SyliusCart {
  id: number;
  tokenValue: string;
  currencyCode: string;
  taxTotal: number;
  itemsTotal: number;
  total: number;
  taxExcludedTotal: number;
  taxIncludedTotal: number;
  shippingTotal: number;
  orderPromotionTotal: number;
  items: SyliusCartItem[];
}

export interface SyliusCartItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  discountedUnitPrice: number;
  variant: SyliusProductVariant;
  optionValues: SyliusProductOptionValue[];
  product: SyliusProduct;
  adjustments: SyliusAdjustment[];
  total: number;
}

export interface SyliusAdjustment {
  id: number;
  type: string;
  label: string;
  amount: number;
}
