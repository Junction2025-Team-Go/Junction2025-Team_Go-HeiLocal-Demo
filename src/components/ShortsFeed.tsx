/**
 * ShortsFeed Component
 * TikTok-style vertical scrolling feed
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import type { Shop } from '../types/shop'
import type { ShopLike } from '../types/shop'
import { calculateDistance } from '../utils/distance'
import ShopCard from './ShopCard'
import './ShortsFeed.css'

interface ShortsFeedProps {
  shops: Shop[]
  shopLikes: ShopLike[]
  userLocation: { latitude: number; longitude: number } | null
  selectedShopId?: string | null
  onShopChange?: (shopId: string) => void
  onCommentClick?: (shopId: string) => void
  onShopDetailClick?: (shopId: string) => void
  isVisible?: boolean // 모바일에서 뷰 전환 시 비디오 정지용
}

export default function ShortsFeed({ shops, shopLikes, userLocation, selectedShopId, onShopChange, onCommentClick, onShopDetailClick, isVisible = true }: ShortsFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [sortedShops, setSortedShops] = useState<Shop[]>(shops)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)
  const [isMuted, setIsMuted] = useState(true) // 초기 muted로 autoplay 허용 - 탭하면 소리 켜짐
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef<number>(0)
  const isDragging = useRef<boolean>(false)
  const accumulatedDelta = useRef<number>(0)
  const isMouseDown = useRef<boolean>(false)

  // 현재 위치 기준으로 가까운 순서로 정렬
  useEffect(() => {
    if (!userLocation) {
      setSortedShops(shops)
      return
    }

    const shopsWithDistance = shops.map(shop => ({
      ...shop,
      distance: calculateDistance(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude: shop.latitude, longitude: shop.longitude }
      )
    }))

    const sorted = shopsWithDistance.sort((a, b) => a.distance - b.distance)
    setSortedShops(sorted)
  }, [shops, userLocation])

  // shops가 변경되면 첫 번째 아이템으로 이동 (필터 변경 시)
  useEffect(() => {
    setCurrentIndex(1)
    setIsTransitioning(false)
  }, [shops])

  // 무한 루프를 위한 카드 배열 (앞뒤에 복제)
  const extendedShops = [
    sortedShops[sortedShops.length - 1],
    ...sortedShops,
    sortedShops[0]
  ]

  // 다음 카드
  const goToNext = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex(prev => prev + 1)
  }, [])

  // 이전 카드
  const goToPrev = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex(prev => prev - 1)
  }, [])

  // 현재 보이는 shop을 계산 (드래그 중에도 실시간 반영)
  useEffect(() => {
    if (!onShopChange || sortedShops.length === 0) return

    const containerHeight = containerRef.current?.clientHeight || 500

    // dragOffset을 고려해서 실제로 화면 중앙에 있는 카드 계산
    const offsetInCards = -dragOffset / containerHeight
    const visualIndex = Math.round(currentIndex + offsetInCards)

    // extendedShops 배열에서의 index를 실제 shop index로 변환
    let realIndex = visualIndex - 1 // 첫 번째는 복제된 마지막 카드
    if (realIndex < 0) realIndex = sortedShops.length - 1
    if (realIndex >= sortedShops.length) realIndex = 0

    const currentShop = sortedShops[realIndex]
    if (currentShop) {
      onShopChange(currentShop.shopId)
    }
  }, [currentIndex, dragOffset, sortedShops])

  // 외부에서 shopId가 선택되면 해당 index로 이동 (핀 클릭 시에만)
  useEffect(() => {
    if (!selectedShopId || sortedShops.length === 0) return

    // 현재 보이는 shop 계산
    const containerHeight = containerRef.current?.clientHeight || 500
    const offsetInCards = -dragOffset / containerHeight
    const visualIndex = Math.round(currentIndex + offsetInCards)
    let realIndex = visualIndex - 1
    if (realIndex < 0) realIndex = sortedShops.length - 1
    if (realIndex >= sortedShops.length) realIndex = 0
    const currentShop = sortedShops[realIndex]

    // 이미 같은 shop이 보이면 이동하지 않음 (무한루프 방지)
    if (currentShop && currentShop.shopId === selectedShopId) return

    const shopIndex = sortedShops.findIndex(shop => shop.shopId === selectedShopId)
    if (shopIndex !== -1) {
      const targetIndex = shopIndex + 1 // extendedShops에서의 index
      setIsTransitioning(true)
      setCurrentIndex(targetIndex)
      setDragOffset(0) // 드래그 오프셋 리셋
    }
  }, [selectedShopId])

  // 경계 체크 (transition 끝날 때)
  useEffect(() => {
    if (!isTransitioning) return

    if (currentIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(sortedShops.length)
      }, 600)
      return () => clearTimeout(timer)
    } else if (currentIndex === sortedShops.length + 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(1)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, sortedShops.length, isTransitioning])

  // 마우스 휠 이벤트 (실시간 움직임)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const containerHeight = container.clientHeight
    const THRESHOLD = containerHeight * 0.15 // 화면 높이의 15% 이상 끌어야 넘어감 (25% → 15%)
    const WHEEL_SENSITIVITY = 0.3 // 휠 민감도 (0.3 = 느리게)
    let resetTimer: number
    let isTransitioning = false

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (isTransitioning) return // 전환 중이면 무시

      // deltaY를 감쇠시켜서 누적 (드래그처럼 천천히)
      accumulatedDelta.current += e.deltaY * WHEEL_SENSITIVITY

      // threshold 넘으면 즉시 전환
      if (accumulatedDelta.current >= THRESHOLD) {
        isTransitioning = true
        clearTimeout(resetTimer)
        setIsTransitioning(true)
        setDragOffset(0)
        accumulatedDelta.current = 0
        goToNext()
        setTimeout(() => { isTransitioning = false }, 700)
        return
      } else if (accumulatedDelta.current <= -THRESHOLD) {
        isTransitioning = true
        clearTimeout(resetTimer)
        setIsTransitioning(true)
        setDragOffset(0)
        accumulatedDelta.current = 0
        goToPrev()
        setTimeout(() => { isTransitioning = false }, 700)
        return
      }

      // 실시간으로 카드 움직임
      setDragOffset(-accumulatedDelta.current)
      setIsTransitioning(false)

      // 휠 멈추면 원위치
      clearTimeout(resetTimer)
      resetTimer = setTimeout(() => {
        setIsTransitioning(true)
        setDragOffset(0)
        accumulatedDelta.current = 0
      }, 100)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      clearTimeout(resetTimer)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [goToNext, goToPrev])

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    isDragging.current = true
    setIsTransitioning(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return

    const currentY = e.touches[0].clientY
    const diff = startY.current - currentY

    setDragOffset(-diff) // 드래그 방향으로 offset 설정
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return

    const container = containerRef.current
    const containerHeight = container ? container.clientHeight : 500
    const threshold = containerHeight * 0.15 // 25% → 15%로 감소 (더 높은 감도)

    const endY = e.changedTouches[0].clientY
    const diff = startY.current - endY

    setIsTransitioning(true)
    setDragOffset(0)

    if (diff > threshold) {
      goToNext()
    } else if (diff < -threshold) {
      goToPrev()
    }

    isDragging.current = false
  }

  // 마우스 드래그 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY
    isMouseDown.current = true
    isDragging.current = false
    setIsTransitioning(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return

    const currentY = e.clientY
    const diff = startY.current - currentY

    if (Math.abs(diff) > 5) {
      isDragging.current = true
      setDragOffset(-diff) // 드래그 방향으로 offset 설정
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return

    if (isDragging.current) {
      const container = containerRef.current
      const containerHeight = container ? container.clientHeight : 500
      const threshold = containerHeight * 0.45

      const endY = e.clientY
      const diff = startY.current - endY

      setIsTransitioning(true)
      setDragOffset(0)

      if (diff > threshold) {
        goToNext()
      } else if (diff < -threshold) {
        goToPrev()
      }
    }

    isMouseDown.current = false
    isDragging.current = false
  }

  const handleMouseLeave = () => {
    if (isDragging.current) {
      setIsTransitioning(true)
      setDragOffset(0)
    }
    isMouseDown.current = false
    isDragging.current = false
  }

  if (sortedShops.length === 0) {
    return <div className="shorts-feed">Loading...</div>
  }

  return (
    <div
      ref={containerRef}
      className="shorts-feed"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="shorts-container"
        style={{
          transform: `translateY(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
        }}
      >
        {extendedShops.map((shop, index) => {
          const like = shopLikes.find(l => l.shopId === shop.shopId)
          const isActive = isVisible && index === currentIndex // 뷰가 보일 때만 활성화
          return (
            <div key={`${shop.shopId}-${index}`} className="shorts-item">
              <ShopCard
                shop={shop}
                like={like}
                currentIndex={index}
                totalCount={sortedShops.length}
                isActive={isActive}
                isMuted={isMuted}
                onToggleMute={() => setIsMuted(!isMuted)}
                onCommentClick={onCommentClick}
                onShopDetailClick={onShopDetailClick}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
