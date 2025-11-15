/**
 * ShopDetailModal Component
 * Shows detailed shop information when clicked from ShortsFeed
 */

import { useEffect } from 'react'
import type { Shop } from '../types/shop'
import type { ShopLike } from '../types/shop'
import './ShopDetailModal.css'

interface ShopDetailModalProps {
  shop: Shop
  like?: ShopLike
  onClose: () => void
}

export default function ShopDetailModal({ shop, like, onClose }: ShopDetailModalProps) {
  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="shop-detail-modal-overlay" onClick={onClose}>
      <div className="shop-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button className="modal-close-button" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* 이미지 */}
        {shop.imageUrl && (
          <div className="modal-image">
            <img src={shop.imageUrl} alt={shop.shopName} />
          </div>
        )}

        {/* 정보 */}
        <div className="modal-content">
          {/* 헤더 */}
          <div className="modal-header">
            <div className="modal-category-badge">{shop.shopType}</div>
            <h2 className="modal-title">{shop.shopName || 'Unknown Shop'}</h2>
          </div>

          {/* 메타 정보 */}
          <div className="modal-meta">
            <div className="meta-item">
              <svg className="meta-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>{shop.rating.toFixed(1)} ({shop.rating_count} reviews)</span>
            </div>
            {shop.priceRange && (
              <div className="meta-item">
                <svg className="meta-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                </svg>
                <span>{shop.priceRange}</span>
              </div>
            )}
          </div>

          {/* 영업 시간 */}
          {shop.openTime && (
            <div className="modal-section">
              <h3 className="section-title">Opening Hours</h3>
              <div className="opening-hours">
                <svg className="section-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                <span>{shop.openTime}</span>
              </div>
            </div>
          )}

          {/* 위치 */}
          <div className="modal-section">
            <h3 className="section-title">Location</h3>
            <div className="location-info">
              <svg className="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>{shop.locationString}</span>
            </div>
          </div>

          {/* 설명 */}
          {shop.description && (
            <div className="modal-section">
              <h3 className="section-title">About</h3>
              <p className="description">{shop.description}</p>
            </div>
          )}

          {/* 좋아요 정보 */}
          {like && (
            <div className="modal-section">
              <div className="like-info">
                <svg className="like-icon" viewBox="0 0 24 24" fill={like.isLiked ? '#FF0050' : 'none'} stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" />
                </svg>
                <span className="like-count">{like.likeCount.toLocaleString()} likes</span>
              </div>
            </div>
          )}

          {/* GO 버튼 */}
          <button
            className="modal-go-button"
            onClick={() => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`
              window.open(url, '_blank')
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>GO!</span>
          </button>
        </div>
      </div>
    </div>
  )
}
