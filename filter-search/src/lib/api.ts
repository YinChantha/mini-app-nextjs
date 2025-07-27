export type Product = {
  id: number
  name: string
  category: string
  icon: string
}

const dummyProducts: Product[] = [
  { id: 1, name: 'Sourdough Bread', category: 'Bread', icon: '🍞' },
  { id: 2, name: 'Cheddar Cheese', category: 'Cheese', icon: '🧀' },
  { id: 3, name: 'Red Wine', category: 'Alcohol', icon: '🍷' },
  { id: 4, name: 'Greek Yogurt', category: 'Yogurt', icon: '🥛' },
  { id: 5, name: 'Eggs & Milk', category: 'Dairy & Eggs', icon: '🥚' },
  { id: 6, name: 'Juicy Watermelon', category: 'Watermelon', icon: '🍉' },
  { id: 7, name: 'Snack Pack', category: 'Snacks', icon: '🍪' },
]

export const fetchProducts = async (search: string, category: string) => {
  await new Promise((res) => setTimeout(res, 300)) // simulate delay

  return dummyProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || product.category === category
    return matchesSearch && matchesCategory
  })
}

export const categories = ['all', ...new Set(dummyProducts.map((p) => p.category))]
