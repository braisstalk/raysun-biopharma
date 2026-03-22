export { fetchStrapi, fetchStrapiList, STRAPI_URL } from './client'
export {
  getGlobal,
  getHeroSlides,
  getPageSeo,
  getAllHeroSlides,
  type StrapiGlobal,
  type StrapiHeroSlide,
  type StrapiPage,
} from './api'
export { useHomeData, type HomeDataFromCMS } from './useHomeData'
export { usePageContent, type PageData, type PageContent } from './usePageContent'
export {
  useProducts,
  useProductBySlug,
  useRelatedProducts,
  getProducts,
  getProductBySlug,
  getRelatedProducts,
  type StrapiProduct,
  type MappedProduct,
  type StrapiMedia,
} from './useProducts'
export {
  useNews,
  useNewsBySlug,
  useRelatedNews,
  type MappedNewsArticle,
} from './useNews'
