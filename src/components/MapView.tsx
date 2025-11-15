/**
 * MapView Component
 * Google Maps with current location and place markers
 */

import { useState, useEffect, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import type { Location } from '../types'
import LocationDetail from './LocationDetail'
import markerIcon from '../assets/marker-hei.png'
import coffeePinIcon from '../assets/coffe_pin.png'
import logoImage from '../assets/heiLocal-Logo.png'
import myLocationIcon from '../assets/my_location.png'
import activeLocationIcon from '../assets/Active.png'
import inactiveLocationIcon from '../assets/No-Active.png'
import './MapView.css'

interface MapViewProps {
  locations: Location[]
  selectedLocation: Location | null
  onLocationSelect: (location: Location | null) => void
  showModal: boolean
  isMyLocationActive: boolean
  onMyLocationToggle: () => void
  isMobile?: boolean
}

// 에스푸 좌표 (데모용 하드코딩)
const defaultCenter = {
  lat: 60.1567259,
  lng: 24.6300172
}

// PNG 마커 사용 (SVG는 백업용으로 주석 처리)
// const createHeiMarker = () => {
//   const svg = `
//     <svg width="60" height="70" xmlns="http://www.w3.org/2000/svg">
//       <g>
//         <circle cx="30" cy="30" r="28" fill="#0059FF"/>
//         <path d="M 22 52 L 18 66 L 30 54 Z" fill="#0059FF"/>
//         <text x="30" y="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">hei!</text>
//       </g>
//     </svg>
//   `
//   return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
// }

export default function MapView({ locations, selectedLocation, onLocationSelect, showModal, isMyLocationActive, onMyLocationToggle, isMobile = false }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  })

  // 현재 위치 - 데모용 하드코딩 (에스푸)
  useEffect(() => {
    // 데모 위치 고정
    setUserLocation(defaultCenter)
    console.log('✅ 현재 위치 (데모):', defaultCenter)

    // TODO: 실제 API 연동 시 아래 코드 활성화
    /*
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(pos)
          console.log('✅ 현재 위치:', pos)
        },
        (error) => {
          console.warn('⚠️ 위치 감지 실패:', error.message)
          setUserLocation(defaultCenter)
        }
      )
    } else {
      console.warn('⚠️ GPS 미지원')
      setUserLocation(defaultCenter)
    }
    */
  }, [])

  // 지도 중심 계산 (selectedLocation 제거 - 모달만 표시)
  const mapCenter = isMyLocationActive && userLocation
    ? userLocation
    : userLocation || defaultCenter

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  // 현재 위치로 이동 (부드러운 애니메이션)
  const goToUserLocation = () => {
    if (userLocation && map) {
      const currentZoom = map.getZoom() || 13
      const targetZoom = 14 // 적당한 줌 레벨

      // 1단계: 줌 아웃 (축소)
      let currentStep = currentZoom
      const zoomOutInterval = setInterval(() => {
        currentStep -= 0.5
        if (currentStep <= 9) {
          clearInterval(zoomOutInterval)
          map.setZoom(9)

          // 2단계: 위치 이동
          setTimeout(() => {
            map.panTo(userLocation)

            // 3단계: 줌 인 (확대)
            setTimeout(() => {
              let zoomInStep = 9
              const zoomInInterval = setInterval(() => {
                zoomInStep += 0.5
                if (zoomInStep >= targetZoom) {
                  clearInterval(zoomInInterval)
                  map.setZoom(targetZoom)
                } else {
                  map.setZoom(zoomInStep)
                }
              }, 50)
            }, 600)
          }, 100)
        } else {
          map.setZoom(currentStep)
        }
      }, 50)
    }
  }

  // 선택된 위치가 변경될 때 지도 이동
  useEffect(() => {
    if (selectedLocation && map) {
      // 모바일: 정중앙 (모달이 화면 중앙 오버레이)
      // 데스크톱: offset 적용 (모달이 오른쪽)
      const lngOffset = isMobile ? 0 : 0.012

      const newCenter = {
        lat: selectedLocation.lat,
        lng: selectedLocation.lng + lngOffset
      }

      // 부드러운 애니메이션으로 이동
      const currentZoom = map.getZoom() || 13
      const targetZoom = isMobile ? 16 : 15 // 모바일에서 더 가까이

      // 줌이 다르면 먼저 줌 조정
      if (currentZoom !== targetZoom) {
        // 부드럽게 줌 변경
        map.setZoom(targetZoom)
        // 줌 애니메이션 후 이동
        setTimeout(() => {
          if (map) {
            map.panTo(newCenter)
          }
        }, 400)
      } else {
        // 같은 줌이면 바로 이동
        map.panTo(newCenter)
      }
    }
  }, [selectedLocation, map, isMobile])

  if (loadError) {
    return (
      <div className="map-error">
        <p>❌ Google Maps 로드 실패</p>
        <p>{loadError.message}</p>
        <p>⚠️ .env 파일에 VITE_GOOGLE_MAPS_API_KEY를 확인하세요</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="map-loading">
        <p>🗺️ Google Maps 로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerClassName="map"
        center={mapCenter}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          draggable: !isMyLocationActive, // 내 위치 활성화 시 드래그 비활성화
          scrollwheel: !isMyLocationActive, // 내 위치 활성화 시 줌 비활성화
          disableDoubleClickZoom: isMyLocationActive
        }}
      >
        {/* 현재 위치 마커 (PNG) */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: myLocationIcon,
              scaledSize: new google.maps.Size(60, 70),
              anchor: new google.maps.Point(30, 66)
            }}
            title="현재 위치"
          />
        )}

        {/* 장소 마커들 (PNG) - 필터링된 마커 표시 */}
        {locations.map((location) => {
          // 카테고리에 따라 다른 아이콘 사용
          const iconUrl = location.category === 'Coffee' ? coffeePinIcon : markerIcon

          return (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => onLocationSelect(location)}
              animation={
                selectedLocation?.id === location.id
                  ? google.maps.Animation.BOUNCE
                  : undefined
              }
              icon={{
                url: iconUrl,
                scaledSize: new google.maps.Size(42, 49),
                anchor: new google.maps.Point(21, 46)
              }}
            />
          )
        })}
      </GoogleMap>

      {/* 현재 위치 버튼 (오른쪽 위) */}
      {userLocation && (
        <button
          className={`location-button ${isMyLocationActive ? 'active' : ''}`}
          onClick={() => {
            // 활성화할 때만 위치로 이동
            if (!isMyLocationActive) {
              goToUserLocation()
            }
            onMyLocationToggle()
          }}
          title="내 위치로 이동"
        >
          <img
            src={isMyLocationActive ? activeLocationIcon : inactiveLocationIcon}
            alt="My Location"
            className="location-btn-icon"
          />
        </button>
      )}

      {/* 우하단 로고 */}
      <div className="map-logo">
        <img src={logoImage} alt="hei!local" />
      </div>

      {/* 장소 상세 모달 - 핀 클릭 시에만 표시 */}
      {selectedLocation && showModal && (
        <LocationDetail
          location={selectedLocation}
          onClose={() => onLocationSelect(null)}
          isMobile={isMobile}
        />
      )}
    </div>
  )
}
