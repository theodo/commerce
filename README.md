# Sylius Commerce Provider

This project demonstrates how to use Sylius as the provider for Next.js e-commerce.

## What is Sylius?

Sylius is an open-source e-commerce platform written in PHP. It is built on top of the Symfony framework and offers a wide range of features for building and managing an online store, including product management, order management, and checkout.

## Next.js Commerce

The all-in-one starter kit for high-performance e-commerce sites. With a few clicks, Next.js developers can clone, deploy and fully customize their own store.
Start right now at [nextjs.org/commerce](https://nextjs.org/commerce)

## Features

- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components
- Theming
- Standardized Data Hooks
- Integrations - Integrate seamlessly with the most common ecommerce platforms.
- Dark Mode Support

## Requirements

- Node.js
- PHP

## Installation

### Setup Sylius

1. You need a (Sylius)[https://sylius.com/download/] instance, either in the cloud or self-hosted.
2. Follow the Read-Me of this (repository)[https://github.com/theodo/sylius-commerce-config] to configure your Sylius Project

### Setup NextsJs Commerce

1. Clone this repo and install its dependencies with `yarn`

2. With this command, copy the `.env.template` file in this directory to `.env.local` in the main directory (which will be ignored by Git):

```
cp packages/sylius/.env.template site/.env
```

3. Set the environment following variables in your .env.local. Both, NEXT_PUBLIC_SYLIUS_API_URL and NEXT_PUBLIC_SYLIUS_ALLOWED_IMAGE_DOMAIN must point to your own Sylius instance.

```
COMMERCE_PROVIDER=@vercel/commerce-sylius
NEXT_PUBLIC_SYLIUS_API_URL=127.0.1:8000
NEXT_PUBLIC_SYLIUS_ALLOWED_IMAGE_DOMAIN=127.0.0.1
```

### Run minimal version locally

> To run a minimal version of Next.js Commerce you can start with the default local provider `@vercel/commerce-local` that has disabled all features (cart, auth) and use static files for the backend

```bash
yarn # run this command in root folder of the mono repo
yarn dev
```

> If you encounter any problems while installing and running for the first time, please see the Troubleshoot section

### Known Limitations

- Sylius does not ship with built-in wishlist functionality.
- The entire Sylius customer flow is carried out via its REST API. This means that there is no external, pre-existing checkout flow. The checkout flow must be created as part of the Next.js app.
- By default, the sign-up flow in Sylius uses email verification. This means that using the existing "sign up" flow from this project will not grant a new user the ability to authenticate, since the new account must first be verified. Again, the necessary parts to support this flow can be created as part of the Next.js app.

## Hooks and Serialisation

### Hooks

see all the hooks in /packages/commerce/README.md

### Serialisation

The serialization logic is located in the `/utils/normalize` directory.

The purpose of the serialization process is to convert a Sylius entity into a valid and usable NextJs Commerce entity.

For more information on the Sylius API, refer to the API Platform documentation: https://master.demo.sylius.com/api/v2/docs.
