import { OperationContext } from '@vercel/commerce/api/operations'
import type { Product } from '@vercel/commerce/types/product'
import { SyliusConfig, Provider } from 'api'
import { SyliusProduct } from 'types/products'
import { PRODUCTS_ENDPOINT } from '../../utils/constant/api-endpoints'
import { normalizeProduct } from '../../utils/normalize/normalize-product'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths({
    query,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<SyliusConfig>
    preview?: boolean
  } = {}): Promise<GetAllProductPathsResult> {
    const config = commerce.getConfig(cfg)
    const syliusProducts = await config.fetch('GET', PRODUCTS_ENDPOINT)
    const products = syliusProducts.map((syliusProduct: SyliusProduct) =>
      normalizeProduct(syliusProduct)
    )
    return {
      products: products.map((product: Product) => ({
        path: product.path,
      })),
    }
  }

  return getAllProductPaths
}
