/**
 * LocationDetail Component
 * 마커 클릭 시 표시되는 장소 상세 정보 모달
 */

import type { Location } from '../types'
import './LocationDetail.css'

interface LocationDetailProps {
  location: Location
  onClose: () => void
  isMobile?: boolean
}

export default function LocationDetail({ location, onClose, isMobile = false }: LocationDetailProps) {
  // 0.5 단위로 내림 (4.6 → 4.5, 4.4 → 4.0)
  const roundedRating = Math.floor(location.rating * 2) / 2

  const renderStars = () => {
    const fullStars = Math.floor(roundedRating)
    const hasHalfStar = roundedRating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star filled">★</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>)
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>)
    }
    return stars
  }

  return (
    <>
      {/* 모바일에서는 오버레이 배경 추가 */}
      {isMobile && <div className="location-detail-overlay" onClick={onClose} />}

      <div className={`location-detail-card ${isMobile ? 'mobile-centered' : ''}`}>
        {/* 썸네일 이미지 */}
        <div className="detail-image-container">
          {location.imageUrl && (
            <img src={location.imageUrl} alt={location.name} className="detail-image" />
          )}
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* 상세 정보 */}
        <div className="detail-content">
          <h2 className="detail-name">{location.name}</h2>

          {/* 별점 */}
          <div className="detail-rating">
            <span className="rating-number">{roundedRating.toFixed(1)}</span>
            <div className="stars">{renderStars()}</div>
            <span className="review-count">({location.reviewCount})</span>
          </div>

          {/* 카테고리 */}
          <p className="detail-category">
            {location.category === 'Restaurants' ? 'Restaurant' : 'Café'}
          </p>

          {/* 주소 */}
          <p className="detail-address">{location.address}</p>

          {/* 영업 시간 */}
          <p className="detail-opening">{location.openingTime}</p>

          {/* 설명 */}
          <p className="detail-description">{location.description}</p>

        {/* 액션 버튼들 */}
        <div className="detail-actions">
          <button
            className="go-button"
            onClick={() => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
              window.open(url, '_blank')
            }}
          >
            GO!
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
