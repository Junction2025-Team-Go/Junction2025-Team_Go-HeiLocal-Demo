/**
 * ShopCarousel Component
 * Horizontal scrollable shop cards at the bottom of map view (mobile)
 */

import { useRef, useEffect } from 'react'
import type { Shop } from '../types/shop'
import './ShopCarousel.css'

interface ShopCarouselProps {
  shops: Shop[]
  selectedShopId?: string | null
  onShopSelect: (shopId: string) => void
  onShopClick?: (shopId: string) => void
}

export default function ShopCarousel({ shops, selectedShopId, onShopSelect, onShopClick }: ShopCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // 선택된 shop으로 스크롤
  useEffect(() => {
    if (!selectedShopId || !carouselRef.current) return

    const selectedCard = cardRefs.current[selectedShopId]
    if (selectedCard) {
      selectedCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [selectedShopId])

  const handleCardClick = (shopId: string) => {
    onShopSelect(shopId)
    if (onShopClick) {
      onShopClick(shopId)
    }
  }

  if (shops.length === 0) {
    return null
  }

  return (
    <div className="shop-carousel-container">
      <div className="shop-carousel" ref={carouselRef}>
        {shops.map((shop) => {
          const isSelected = shop.shopId === selectedShopId
          return (
            <div
              key={shop.shopId}
              ref={(el) => {
                cardRefs.current[shop.shopId] = el
              }}
              className={`carousel-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleCardClick(shop.shopId)}
            >
              {/* 가게 이미지 */}
              <div className="card-image">
                {shop.imageUrl ? (
                  <img src={shop.imageUrl} alt={shop.shopName || 'Shop'} />
                ) : (
                  <div className="card-image-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* 가게 정보 */}
              <div className="card-info">
                <h3 className="card-title">{shop.shopName || 'Unknown Shop'}</h3>
                <p className="card-category">{shop.shopType}</p>
                {shop.priceRange && <p className="card-price">{shop.priceRange}</p>}
                <div className="card-meta">
                  {shop.openTime && (
                    <span className="card-open-time">
                      <span className="open-status">Opens soon</span> {shop.openTime}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
