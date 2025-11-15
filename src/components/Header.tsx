/**
 * Header Component
 * Floating header with logo and category filters
 */

import FilterBar from './FilterBar'
import type { Category } from '../types'
import './Header.css'

interface HeaderProps {
  activeFilter: 'All' | Category | 'Favorites' | null
  onFilterChange: (filter: 'All' | Category | 'Favorites' | null) => void
}

export default function Header({ activeFilter, onFilterChange }: HeaderProps) {
  return (
    <header className="header">
      <FilterBar activeFilter={activeFilter} onFilterChange={onFilterChange} />
    </header>
  )
}
