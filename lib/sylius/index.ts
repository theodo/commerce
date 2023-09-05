import { SYLIUS_API_ENDPOINT } from 'lib/constants';

const DOMAIN = `${process.env.SYLIUS_STORE_DOMAIN}`;
const ENDPOINT = `${DOMAIN}${SYLIUS_API_ENDPOINT}`;

// Fetch
export default async function syliusRequest(
  method: string,
  path = '',
  payload?: Record<string, unknown> | undefined
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
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
export const getProducts = () => [];
export const getProduct = () => {};
export const getProductRecommendations = () => [];
export const getCollection = () => {};
export const getCollectionProducts = () => [];

// Cart
export const createCart = async () => {
  const cart = await syliusRequest('POST', '/orders', { localeCode: 'fr_FR' });
  return cart;
};
export const getCart = (cartId: string) => {
  syliusRequest(REST_METHODS.GET, `/orders/${cartId}`);
  return {};
};
export const addToCart = (cartId: string | undefined, payload: AddToCartPayload[]) => {
  syliusRequest(REST_METHODS.PUT, `/orders/${cartId}/items`, payload[0]);
  return {};
};
export const removeFromCart = () => {};
export const updateCart = () => {};

// Site
export const getMenu = () => [
  {
    title: 'Home',
    path: '/'
  }
];

type AddToCartPayload = { merchandiseId: string; quantity: number };
