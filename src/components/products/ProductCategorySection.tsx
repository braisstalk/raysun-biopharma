import ProductCard from './ProductCard'
import type { Product, ProductCategory } from '@/types/product'

interface ProductCategorySectionProps {
  category: ProductCategory
  products: Product[]
}

export default function ProductCategorySection({ category, products }: ProductCategorySectionProps) {
  if (products.length === 0) return null

  return (
    <section id={`category-${category.id}`} className="scroll-mt-32">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{category.name}</h2>
        <p className="text-sm text-slate-500 mt-1">{category.description}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
