/**
 * 거리 계산 유틸리티
 * Haversine formula를 사용하여 두 좌표 간 거리 계산
 */

export interface Coordinate {
  latitude: number
  longitude: number
}

/**
 * 두 좌표 사이의 거리를 km 단위로 계산
 */
export function calculateDistance(
  coord1: Coordinate,
  coord2: Coordinate
): number {
  const R = 6371 // 지구 반지름 (km)
  const dLat = toRadians(coord2.latitude - coord1.latitude)
  const dLon = toRadians(coord2.longitude - coord1.longitude)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.latitude)) *
      Math.cos(toRadians(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return distance
}

/**
 * 도(degree)를 라디안(radian)으로 변환
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * 거리를 포맷팅 (1km 미만은 m, 이상은 km)
 */
export function formatDistance(distanceInKm: number): string {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)}m`
  }
  return `${distanceInKm.toFixed(1)}km`
}
