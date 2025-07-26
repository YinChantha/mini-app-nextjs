'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts, Product } from '../lib/api'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['all', 'product1', 'product2', 'product3']

export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const { data = [], isFetching } = useQuery<Product[]>({
    queryKey: ['products', search, category],
    queryFn: () => fetchProducts(search, category),
  })

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full border border-gray-300 rounded-md p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm border ${
              category === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {data.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow p-4 border"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  )
}
