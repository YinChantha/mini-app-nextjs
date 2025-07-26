// src/lib/api.ts

export type Product = {
  id: number
  name: string
  category: string
}

const dummyProducts: Product[] = [
  { id: 1, name: 'Red Chair', category: 'product1' },
  { id: 2, name: 'Blue Sofa', category: 'product2' },
  { id: 3, name: 'Green Lamp', category: 'product3' },
  { id: 4, name: 'Yellow Rug', category: 'product1' },
  { id: 5, name: 'Black Desk', category: 'product2' },
  { id: 6, name: 'White Bookshelf', category: 'product3' },
  { id: 7, name: 'Orange Clock', category: 'product1' },
]

export const fetchProducts = async (search: string, category: string) => {
  await new Promise((res) => setTimeout(res, 300)) // simulate delay

  return dummyProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || product.category === category
    return matchesSearch && matchesCategory
  })
}
