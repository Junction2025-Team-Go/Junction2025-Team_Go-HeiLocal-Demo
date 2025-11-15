/**
 * hei!local - Main App Component
 */

import { useState, useMemo, useEffect } from 'react'
import Header from './components/Header'
import MapView from './components/MapView'
import ShortsFeed from './components/ShortsFeed'
import CommentModal from './components/CommentModal'
import MobileViewToggle from './components/MobileViewToggle'
import ShopDetailModal from './components/ShopDetailModal'
import type { Location, Category } from './types'
import { mockLocations } from './data/mockLocations'
import { mockShops, mockShopLikes } from './data/mockShops'
import './App.css'

function App() {
  const [activeFilter, setActiveFilter] = useState<'All' | Category | 'Favorites' | null>('All')
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false) // 모달 표시 여부 (핀 클릭 시에만)
  const [showCommentModal, setShowCommentModal] = useState(false) // 코멘트 모달
  const [commentShopId, setCommentShopId] = useState<string | null>(null) // 코멘트를 볼 상점 ID
  const [isMyLocationActive, setIsMyLocationActive] = useState(false)
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  // 모바일 뷰 상태 ('video' | 'map')
  const [mobileView, setMobileView] = useState<'video' | 'map'>('map')
  const [isMobile, setIsMobile] = useState(false)
  const [showShopDetailModal, setShowShopDetailModal] = useState(false) // 숏폼에서 가게 정보 모달

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 사용자 위치 - 데모용 하드코딩 (에스푸)
  useEffect(() => {
    // 데모 위치 고정
    setUserLocation({
      latitude: 60.1567259,
      longitude: 24.6300172
    })

    // TODO: 실제 API 연동 시 아래 코드 활성화
    /*
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.warn('위치 감지 실패:', error)
          setUserLocation({
            latitude: 60.1567259,
            longitude: 24.6300172
          })
        }
      )
    }
    */
  }, [])

  // 필터링된 장소 목록 (지도용)
  const filteredLocations = useMemo(() => {
    if (!activeFilter || activeFilter === 'All') {
      return mockLocations
    }

    return mockLocations.filter((loc) => loc.category === activeFilter)
  }, [activeFilter])

  // 필터링된 shops 목록 (숏폼용)
  const filteredShops = useMemo(() => {
    if (!activeFilter || activeFilter === 'All') {
      return mockShops
    }

    return mockShops.filter((shop) => shop.shopType === activeFilter)
  }, [activeFilter])

  const handleFilterChange = (filter: 'All' | Category | 'Favorites' | null) => {
    setActiveFilter(filter)
    console.log('🔍 필터:', filter || '전체')
  }

  const handleLocationSelect = (location: Location | null) => {
    if (location) {
      // 지도에서 핀 클릭 → 모달 표시 + 해당 shop으로 이동
      setSelectedLocation(location)
      if (selectedShopId !== location.id) {
        setSelectedShopId(location.id)
      }
      setShowModal(true)
      console.log('📍 선택된 장소:', location.name)
    } else {
      setSelectedLocation(null)
      setShowModal(false)
      console.log('📍 선택 해제')
    }
  }

  const handleShopChange = (shopId: string) => {
    // 숏폼에서 스와이프/드래그 → 지도 핀만 이동 (모달 표시 안 함)
    const location = mockLocations.find(loc => loc.id === shopId)
    if (location) {
      setSelectedLocation(location)
      setSelectedShopId(shopId)
      // 모달은 열지 않음 (핀 클릭 시에만 열림)
    }
  }

  const handleMyLocationToggle = () => {
    setIsMyLocationActive(!isMyLocationActive)
    console.log('📍 내 위치 활성화:', !isMyLocationActive)
  }

  const handleCommentClick = (shopId: string) => {
    setCommentShopId(shopId)
    setShowCommentModal(true)
  }

  const handleCommentClose = () => {
    setShowCommentModal(false)
    setCommentShopId(null)
  }

  const handleMobileViewToggle = (view: 'video' | 'map') => {
    setMobileView(view)
  }

  const handleShopDetailClick = () => {
    setShowShopDetailModal(true)
  }

  const handleShopDetailClose = () => {
    setShowShopDetailModal(false)
  }

  return (
    <div className="app">
      {/* 상단 헤더 (플로팅) */}
      <Header activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      {/* 메인 컨텐츠 */}
      <div className={`app-content ${isMobile ? `mobile-${mobileView}` : ''}`}>
        {/* 좌측: 비디오 피드 (데스크톱 또는 모바일 video 뷰) */}
        <div className={`video-section ${isMobile && mobileView !== 'video' ? 'hidden' : ''}`}>
          <ShortsFeed
            shops={filteredShops}
            shopLikes={mockShopLikes}
            userLocation={userLocation}
            selectedShopId={selectedShopId}
            onShopChange={handleShopChange}
            onCommentClick={handleCommentClick}
            onShopDetailClick={handleShopDetailClick}
            isVisible={!isMobile || mobileView === 'video'}
          />
        </div>

        {/* 우측: 지도 (데스크톱 또는 모바일 map 뷰) */}
        <div className={`map-section ${isMobile && mobileView !== 'map' ? 'hidden' : ''}`}>
          <MapView
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            showModal={showModal}
            isMyLocationActive={isMyLocationActive}
            onMyLocationToggle={handleMyLocationToggle}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* 모바일 뷰 토글 버튼 */}
      {isMobile && (
        <MobileViewToggle activeView={mobileView} onToggle={handleMobileViewToggle} />
      )}

      {/* 코멘트 모달 */}
      {showCommentModal && commentShopId && (
        <CommentModal
          shopId={commentShopId}
          shopName={mockShops.find(s => s.shopId === commentShopId)?.shopName || ''}
          onClose={handleCommentClose}
        />
      )}

      {/* 가게 상세 정보 모달 (숏폼에서 클릭) */}
      {showShopDetailModal && selectedShopId && (
        <ShopDetailModal
          shop={mockShops.find(s => s.shopId === selectedShopId)!}
          like={mockShopLikes.find(l => l.shopId === selectedShopId)}
          onClose={handleShopDetailClose}
        />
      )}
    </div>
  )
}

export default App
