import {
  SyliusProduct,
  SyliusProductImage,
  SyliusProductOption,
  SyliusProductVariant
} from '../sylius-types/product-types';
import { Image, Money, Product, ProductOption, ProductVariant } from '../types';

export const normalizeProduct = (product: SyliusProduct): Product => ({
  seo: {
    title: product.name,
    description: product.shortDescription
  },
  variants: product.variants.map((variant) => normalizeProductVariant(variant)),
  images: product.images.map((image) => normalizeProductImage(image)),
  id: product.id.toString(),
  handle: product.slug,
  availableForSale: product.enabled,
  title: product.name,
  description: product.shortDescription,
  descriptionHtml: product.description,
  options: product.options.map((option) => normalizeProductOption(option)),
  priceRange: normalizePriceRange(product),
  featuredImage: normalizeProductImage(product.images[0] as SyliusProductImage),
  tags: [],
  updatedAt: product.updatedAt.toString()
});

const normalizeProductVariant = (variant: SyliusProductVariant): ProductVariant => {
  return {
    id: variant.id.toString(),
    title: variant.name,
    availableForSale: variant.inStock,
    selectedOptions: variant.optionValues.map((optionValue) => {
      return { name: optionValue.option.name, value: optionValue.value };
    }),
    price: normalizePrice(variant.price)
  };
};

const normalizeProductOption = (option: SyliusProductOption): ProductOption => ({
  id: option.id.toString(),
  name: option.name,
  values: option.values.map((optionValue) => optionValue.value)
});

export const normalizeProductImage = (image: SyliusProductImage): Image => ({
  url: process.env.NEXT_PUBLIC_SYLIUS_API_URL + image.path,
  altText: image.path,
  width: 400,
  height: 400
});

const normalizePrice = (amount: number): Money => ({
  amount: (amount / 100).toString(),
  currencyCode: 'EUR'
});

const normalizePriceRange = (product: SyliusProduct) => {
  let minVariantPrice = 0;
  let maxVariantPrice = 0;

  for (const variant of product.variants) {
    if (variant.price < minVariantPrice) {
      minVariantPrice = variant.price;
    }
    if (variant.price > maxVariantPrice) {
      maxVariantPrice = variant.price;
    }
  }

  return {
    minVariantPrice: normalizePrice(minVariantPrice),
    maxVariantPrice: normalizePrice(maxVariantPrice)
  };
};
