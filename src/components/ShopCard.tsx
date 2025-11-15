/**
 * ShopCard Component
 * Individual shop card for shorts feed
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Shop, ShopLike } from '../types/shop'
import './ShopCard.css'

interface ShopCardProps {
  shop: Shop
  like?: ShopLike
  currentIndex: number
  totalCount: number
  isActive: boolean
  isMuted: boolean
  onToggleMute: () => void
  onCommentClick?: (shopId: string) => void
  onShopDetailClick?: (shopId: string) => void
}

export default function ShopCard({ shop, like, isActive, isMuted, onToggleMute, onCommentClick, onShopDetailClick }: ShopCardProps) {
  const [isLiked, setIsLiked] = useState(like?.isLiked || false)
  const [likeCount, setLikeCount] = useState(like?.likeCount || 0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // ref callback으로 비디오 요소가 마운트되는 순간 처리
  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    if (node) {
      node.muted = isMuted  // 초기 muted 상태 설정
    }
    videoRef.current = node
  }, [isMuted])


  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1)
    } else {
      setLikeCount(prev => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  // 음소거 상태만 제어 (비디오 재생 중단 없이)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = isMuted
  }, [isMuted])

  // 비디오 재생/일시정지 제어
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      // 활성화: 재생
      video.currentTime = 0
      video.play().catch(() => {
        // 재생 실패 시 무시
      })
    } else {
      // 비활성화: 정지
      video.pause()
      video.currentTime = 0
    }
  }, [isActive])

  // 0.5 단위로 내림 (4.6 → 4.5, 4.4 → 4.0)
  const roundedRating = Math.floor(shop.rating * 2) / 2

  // 별점 표시 (★)
  const renderStars = () => {
    const fullStars = Math.floor(roundedRating)
    const hasHalfStar = roundedRating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="full-star">★</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="half-star">★</span>)
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={`empty-${i}`} className="empty-star">★</span>)
    }

    return stars
  }

  return (
    <div className="shop-card" onClick={shop.videoUrl ? onToggleMute : undefined}>
      {/* 배경 비디오 또는 이미지 */}
      {shop.videoUrl ? (
        <>
          <video
            ref={setVideoRef}
            className="shop-card-bg"
            src={shop.videoUrl}
            loop
            playsInline
            preload="auto"
          />
          {/* 음소거 아이콘 */}
          <div className="mute-indicator">
            {isMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="white"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="white"/>
              </svg>
            )}
          </div>
        </>
      ) : (
        <div
          className="shop-card-bg"
          style={{ backgroundImage: `url(${shop.imageUrl})` }}
        />
      )}

      {/* 그라데이션 오버레이 */}
      <div className="shop-card-overlay" />

      {/* 하단 정보 */}
      <div
        className="shop-info"
        onClick={(e) => {
          e.stopPropagation()
          onShopDetailClick?.(shop.shopId)
        }}
      >
        <div className="shop-category">{shop.shopType}</div>
        <h2 className="shop-name">{shop.shopName}</h2>
        <p className="shop-location">
          {shop.locationString} {shop.priceRange}
        </p>
        <p className="shop-open-time">{shop.openTime}</p>
        <div className="shop-rating">
          <span className="stars">{renderStars()}</span>
          <span className="rating-count">({shop.rating_count})</span>
        </div>
      </div>

      {/* 우측 액션 버튼 */}
      <div className="shop-actions" onClick={(e) => e.stopPropagation()}>
        {/* 좋아요 */}
        <button
          className={`action-button ${isLiked ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            handleLike()
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill={isLiked ? '#ff2e63' : 'white'}
              stroke={isLiked ? '#ff2e63' : 'white'}
              strokeWidth="2"
            />
          </svg>
          <span className="action-count">{likeCount}</span>
        </button>

        {/* 댓글 */}
        <button
          className="action-button"
          onClick={(e) => {
            e.stopPropagation()
            onCommentClick?.(shop.shopId)
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
          <span className="action-count">{shop.rating_count}</span>
        </button>

        {/* 공유 */}
        <button className="action-button" onClick={(e) => e.stopPropagation()}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="16 6 12 2 8 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="2"
              x2="12"
              y2="15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
