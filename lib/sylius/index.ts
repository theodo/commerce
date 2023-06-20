import { SYLIUS_API_ENDPOINT } from 'lib/constants';

const domain = `${process.env.SYLIUS_STORE_DOMAIN}`;
const endpoint = `${domain}${SYLIUS_API_ENDPOINT}`;

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
export const createCart = () => {};
export const getCart = () => {};
export const addToCart = () => {};
export const removeFromCart = () => {};
export const updateCart = () => {};

// Site
export const getMenu = () => [];
