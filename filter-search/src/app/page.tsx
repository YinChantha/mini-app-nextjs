'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts, Product, categories } from '../lib/api'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const { data = [], isFetching } = useQuery<Product[]>({
    queryKey: ['products', search, category],
    queryFn: () => fetchProducts(search, category),
  })

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Search with Icon */}
      <div className="flex items-center bg-white rounded-full shadow px-4 py-2 w-full max-w-xl mx-auto border border-gray-200">
        <span className="text-pink-500 text-xl mr-3">🔍</span>
        <input
          type="text"
          placeholder="Search by"
          className="w-full outline-none text-gray-700 text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => {
          const product = data.find((p) => p.category === cat) || null
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all duration-200 cursor-pointer ${
                category === cat
                  ? 'border-pink-500 text-pink-600 bg-pink-50 shadow-sm'
                  : 'bg-gray-100 text-gray-700 border-transparent'
              }`}
            >
              <span className="text-lg">
                {product?.icon || '🛒'}
              </span>
              {cat}
            </button>
          )
        })}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-4">
        <AnimatePresence>
          {data.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white border rounded-2xl p-4 shadow hover:shadow-md transition"
            >
              <div className="text-3xl mb-2">{product.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading */}
      {isFetching && (
        <p className="text-center text-gray-400 text-sm">Loading...</p>
      )}
    </main>
  )
}
