/**
 * FilterBar Component
 * Category filter buttons with Favorites
 */

import type { Category } from '../types'
import './FilterBar.css'

interface FilterBarProps {
  activeFilter: 'All' | Category | 'Favorites' | null
  onFilterChange: (filter: 'All' | Category | 'Favorites' | null) => void
}

const categories: ('All' | Category)[] = [
  'All',
  'Restaurants',
  'Coffee'
]

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const handleFilterClick = (filter: 'All' | Category) => {
    onFilterChange(filter)
  }

  return (
    <div className="filter-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-button ${activeFilter === category ? 'active' : ''}`}
          onClick={() => handleFilterClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
