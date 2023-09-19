import { SyliusTaxon } from '../sylius-types/product-types';
import { Collection } from '../types';

export const normalizeCollection = (syliusTaxon: SyliusTaxon): Collection => {
  return {
    seo: {
      title: syliusTaxon.name,
      description: syliusTaxon.description
    },
    code: syliusTaxon.code,
    title: syliusTaxon.name,
    path: `/search/${syliusTaxon.code}`
  };
};
