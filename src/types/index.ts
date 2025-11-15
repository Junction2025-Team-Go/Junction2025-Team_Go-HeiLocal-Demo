/**
 * hei!local - TypeScript Type Definitions
 */

// 카테고리 타입
export type Category = 'Restaurants' | 'Coffee'

// 장소 정보
export interface Location {
  id: string
  name: string
  category: Category
  priceRange: string
  rating: number
  reviewCount: number
  openingTime: string
  likes: number
  comments: number
  lat: number
  lng: number
  address: string
  description?: string
  videoUrl?: string
  imageUrl?: string
  youtubeVideoId?: string
  isFavorite?: boolean
}

// 필터 상태
export interface FilterState {
  activeCategory: Category | 'Favorites' | null
}
