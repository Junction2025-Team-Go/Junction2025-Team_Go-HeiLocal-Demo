/**
 * Shop API Response Types
 */

// 개별 Shop 정보
export interface Shop {
  shopId: string
  latitude: number
  longitude: number
  videoUrl: string
  imageUrl?: string // 영상 대신 사진
  rating: number
  rating_count: number
  shopType: string
  locationString: string
  openTime: string
  comments: string[] | null
  shopName?: string
  description?: string
  priceRange?: string
}

// API 응답 구조
export interface ApiResponse<T> {
  status: number
  message: string
  data: T | null
}

// Shop 리스트 응답
export type GetShopInfoResponse = ApiResponse<Shop[]>

// 좋아요 정보 (별도 관리)
export interface ShopLike {
  shopId: string
  likeCount: number
  isLiked: boolean
}

// Request Body (위도/경도)
export interface LocationRequest {
  latitude: number
  longitude: number
}
