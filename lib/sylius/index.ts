import { REST_METHODS, SYLIUS_API_ENDPOINT } from 'lib/constants';
import { normalizeCart } from './normalizer/cart-normalizer';
import { normalizeCollection } from './normalizer/collection-normalizer';
import { normalizeProduct } from './normalizer/product-normalizer';
import { SyliusProduct, SyliusTaxon } from './sylius-types/product-types';
import {
  AddToCartPayload,
  Cart,
  Collection,
  GetCollectionProductsPayload,
  GetProductsPayload,
  UpdateCartPayload
} from './types';

const DOMAIN = `${process.env.NEXT_PUBLIC_SYLIUS_BACKEND_API}`;
const ENDPOINT = `${DOMAIN}${SYLIUS_API_ENDPOINT}`;

// Fetch
export default async function syliusRequest(
  method: string,
  path = '',
  payload?: Record<string, unknown> | undefined,
  contentType?: string
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': contentType ?? 'application/json',
      Accept: 'application/json'
    }
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const result = await fetch(`${ENDPOINT}${path}`, options);

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      error: e
    };
  }
}

// Pages
export const getPages = () => [];
export const getPage = () => {};

// Products
export const getProducts = async (payload: GetProductsPayload) => {
  const url = new URL(`${ENDPOINT}/products`);
  if (payload.query) {
    url.searchParams.set('translations.name', payload.query);
  }
  const orderBy = payload.reverse ? 'desc' : 'asc';

  if (payload.sortKey) {
    switch (payload.sortKey) {
      case 'RELEVANCE':
        break;
      case 'BEST_SELLING':
        break;
      case 'CREATED_AT':
        url.searchParams.set('order[createdAt]', orderBy);
        break;
      case 'PRICE':
        url.searchParams.set('order[price]', orderBy);
        break;
      default:
        break;
    }
  }

  const data = await syliusRequest(REST_METHODS.GET, '/products' + url.search);
  const syliusProducts = data.body;
  const products = syliusProducts.map((syliusProduct: SyliusProduct) =>
    normalizeProduct(syliusProduct)
  );
  return products;
};

export const getProduct = async (slug: string) => {
  const data = await syliusRequest(REST_METHODS.GET, '/products-by-slug/' + slug);

  const syliusProduct = data.body;
  const product = normalizeProduct(syliusProduct);

  return product;
};
export const getProductRecommendations = () => {
  return [];
};
export const getCollections = async (): Promise<Collection[]> => {
  const data = await syliusRequest(REST_METHODS.GET, '/taxons');

  const syliusTaxons = data.body;
  const collections = syliusTaxons.map((syliusTaxon: SyliusTaxon) =>
    normalizeCollection(syliusTaxon)
  );

  return collections;
};

export const getCollection = async (taxonCode: string) => {
  const data = await syliusRequest(REST_METHODS.GET, '/taxons/' + taxonCode);

  const syliusTaxon = data.body;
  const collection = normalizeCollection(syliusTaxon);

  return collection;
};

export const getCollectionProducts = async (payload: GetCollectionProductsPayload) => {
  const url = new URL(`${ENDPOINT}/products`);
  if (payload.collection) {
    url.searchParams.set('productTaxons.taxon.code', payload.collection);
  }
  const orderBy = payload.reverse ? 'desc' : 'asc';

  if (payload.sortKey) {
    switch (payload.sortKey) {
      case 'RELEVANCE':
        break;
      case 'BEST_SELLING':
        break;
      case 'CREATED_AT':
        url.searchParams.set('order[createdAt]', orderBy);
        break;
      case 'PRICE':
        url.searchParams.set('order[price]', orderBy);
        break;
      default:
        break;
    }
  }

  const data = await syliusRequest(REST_METHODS.GET, '/products' + url.search);
  const syliusProducts = data.body;
  const products = syliusProducts.map((syliusProduct: SyliusProduct) =>
    normalizeProduct(syliusProduct)
  );
  return products;
};

// Cart
export const createCart = async (): Promise<Cart> => {
  const data = await syliusRequest(REST_METHODS.POST, '/orders', { localeCode: 'fr_FR' });
  const syliusCart = data.body;

  return normalizeCart(syliusCart);
};
export const getCart = async (cartId: string): Promise<Cart> => {
  const data = await syliusRequest(REST_METHODS.GET, `/orders/${cartId}`);
  const syliusCart = data.body;
  return normalizeCart(syliusCart);
};
export const addToCart = async (cartId: string | undefined, payload: AddToCartPayload[]) => {
  await syliusRequest(REST_METHODS.POST, `/orders/${cartId}/items`, {
    productVariant: payload[0]?.merchandiseId,
    quantity: payload[0]?.quantity
  });
};
export const removeFromCart = async (cartId: string, itemIds: string[]) => {
  await syliusRequest(REST_METHODS.DELETE, `/orders/${cartId}/items/${itemIds[0]}`);
};

export const updateCart = async (cartId: string, payload: UpdateCartPayload[]) => {
  await syliusRequest(
    REST_METHODS.PATCH,
    `/orders/${cartId}/items/${payload[0]?.id}`,
    {
      quantity: payload[0]?.quantity
    },
    'application/merge-patch+json'
  );
};

// Site
export const getMenu = async () => {
  const collections = await getCollections();
  return [
    {
      title: 'All',
      path: '/search'
    },
    ...collections.slice(0, 2).map(({ title, path }) => ({ title, path }))
  ];
};
