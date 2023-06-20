# Next.js Commerce x Sylius

A Next.js 14 and App Router-ready ecommerce template, built with [Sylius](https://github.com/sylius/sylius), featuring:

- Next.js App Router
- Optimized for SEO using Next.js's Metadata
- React Server Components (RSCs) and Suspense
- Server Actions for mutations
- Edge Runtime
- New fetching and caching paradigms
- Dynamic OG images
- Styling with Tailwind CSS
- Automatic light/dark mode based on system settings

## What is Sylius?

[Sylius](https://sylius.com/) is an open-source e-commerce platform written in PHP. It is built on top of the Symfony framework and offers a wide range of features for building and managing an online store, including product management, order management, and checkout.

## Requirements

- Node.js
- PHP >= 8.0

## Getting started

### Running Sylius

1. You need a [Sylius](https://sylius.com/download/) instance, either in the cloud or self-hosted.
2. Follow the Read-Me of this [repository](https://github.com/theodo/sylius-commerce-config) to configure your Sylius Project
3. We recommend to use NelmioCorsBundle to allow cross-origin requests from your Next.js Commerce app.

### Running Next.js Commerce

1\. You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. Copy the contents of .env.example to a .env file in the root of your Next.js Commerce project, and make sure the NEXT_PUBLIC_Sylius_BACKEND_API environment variable points to your Sylius backend domain (default: http://localhost:8000).

> Note: You should not commit your `.env` file or it will expose secrets.

2\. From the `nextjs-commerce` subfolder, run:

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).
