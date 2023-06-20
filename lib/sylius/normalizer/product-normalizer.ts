import {
  SyliusProduct,
  SyliusProductImage,
  SyliusProductOption,
  SyliusProductVariant
} from '../sylius-types/product-types';
import { Image, Product, ProductOption, ProductVariant } from '../types';
import { normalizePrice } from './utils-normalizer';

export const normalizeProduct = (product: SyliusProduct): Product => ({
  seo: {
    title: product.name,
    description: product.shortDescription
  },
  // variants not needed for cart normalization
  variants: product.variants ? product.variants.map(normalizeProductVariant) : [],
  images: product.images.map(normalizeProductImage),
  id: product.id.toString(),
  handle: product.slug,
  availableForSale: product.variants.some((variant) => variant.inStock),
  title: product.name,
  description: product.shortDescription,
  descriptionHtml: product.description,
  options: product.options.map(normalizeProductOption),
  priceRange: normalizePriceRange(product),
  featuredImage: normalizeProductImage(product.images[0] as SyliusProductImage),
  tags: [],
  updatedAt: product.updatedAt.toString()
});

const normalizeProductVariant = (variant: SyliusProductVariant): ProductVariant => {
  return {
    id: variant.id.toString(),
    code: variant.code,
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
  url: process.env.NEXT_PUBLIC_SYLIUS_BACKEND_API + image.path,
  altText: image.path,
  width: 400,
  height: 400
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
