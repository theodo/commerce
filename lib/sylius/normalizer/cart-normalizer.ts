import { SyliusCart, SyliusCartItem } from '../sylius-types/cart-types';
import { SyliusProductOption, SyliusProductOptionValue } from '../sylius-types/product-types';
import { Cart, CartItem } from '../types';
import { normalizeProduct } from './product-normalizer';
import { normalizePrice } from './utils-normalizer';

export const normalizeCart = (syliusCart: SyliusCart): Cart => {
  return {
    id: syliusCart.tokenValue,
    checkoutUrl: '',
    cost: {
      subtotalAmount: normalizePrice(syliusCart.itemsTotal),
      totalAmount: normalizePrice(syliusCart.total),
      totalTaxAmount: normalizePrice(syliusCart.taxTotal),
      shippingAmount: normalizePrice(syliusCart.shippingTotal)
    },
    lines: syliusCart.items ? syliusCart.items.map(normalizeCartItem) : [],
    totalQuantity: syliusCart.items
      ? syliusCart.items.reduce((acc, item) => acc + item.quantity, 0)
      : 0
  };
};

const normalizeCartItem = (syliusCartItem: SyliusCartItem): CartItem => {
  return {
    id: syliusCartItem.id.toString(),
    quantity: syliusCartItem.quantity,
    cost: {
      totalAmount: normalizePrice(syliusCartItem.total)
    },
    merchandise: {
      id: syliusCartItem.variant.id.toString(),
      title: syliusCartItem.variant.name,
      selectedOptions: syliusCartItem.variant.optionValues.map((optionValue) =>
        normalizeOrderItemOptionValue(optionValue, syliusCartItem.product.options)
      ),
      product: normalizeProduct(syliusCartItem.product)
    }
  };
};

const normalizeOrderItemOptionValue = (
  optionValue: SyliusProductOptionValue,
  options: SyliusProductOption[]
): { name: string; value: string } => {
  const selectedOption = options.filter((option) =>
    option.values.some((value) => value.code === optionValue.code)
  )[0];
  return {
    name: selectedOption?.name ?? '',
    value: optionValue.value
  };
};
