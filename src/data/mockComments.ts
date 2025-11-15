/**
 * Mock Comments Data
 */

export interface Comment {
  id: string
  shopId: string
  userName: string
  userAvatar: string
  text: string
  timestamp: string
}

const commentTemplates = [
  "Amazing local spot!",
  "Great food, highly recommend",
  "Best place in the neighborhood",
  "Delicious and authentic",
  "Perfect for a quick bite",
  "Love this place!",
  "Hidden gem in the area",
  "Outstanding service",
  "Cozy atmosphere",
  "Fresh ingredients, tasty food",
  "Will definitely come back",
  "Great value for money",
  "Friendly staff",
  "Super convenient location",
  "Tasty and affordable",
  "My favorite local spot",
  "Excellent coffee!",
  "Perfect breakfast place",
  "Nice and quiet",
  "Always consistent quality"
]

const userNames = [
  "Mikko", "Emma", "Jussi", "Sofia", "Ville", "Aino",
  "Jari", "Laura", "Petri", "Hanna", "Matti", "Liisa",
  "Timo", "Anna", "Kari", "Maria", "Pekka", "Sanna"
]

// 랜덤 아바타 색상
const avatarColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A",
  "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"
]

const getRandomElement = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const generateRandomComments = (shopId: string, count: number): Comment[] => {
  const comments: Comment[] = []

  for (let i = 0; i < count; i++) {
    const text = getRandomElement(commentTemplates)

    const daysAgo = Math.floor(Math.random() * 30)
    const timestamp = daysAgo === 0
      ? "Today"
      : daysAgo === 1
      ? "1 day ago"
      : `${daysAgo} days ago`

    comments.push({
      id: `${shopId}-comment-${i}`,
      shopId,
      userName: getRandomElement(userNames),
      userAvatar: getRandomElement(avatarColors),
      text,
      timestamp
    })
  }

  return comments
}

// 각 상점별로 6-9개 정도의 코멘트만 생성 (표시용)
export const mockComments: Comment[] = [
  // Restaurants
  ...generateRandomComments('Ravintola Nepal', 8),
  ...generateRandomComments('Kiven Grilli', 6),
  ...generateRandomComments('Loco Pizza', 7),
  ...generateRandomComments('Uuno Kivenlahti', 8),
  ...generateRandomComments('Nanan grilli', 6),
  ...generateRandomComments('Crispy Pizza', 9),
  ...generateRandomComments('HAPPY DAYS Food Truck', 6),
  ...generateRandomComments('Momo & More Lippulaiva', 7),
  ...generateRandomComments('Pronto Pizzeria Espoonlahti', 7),
  ...generateRandomComments('Seoul Good Lippulaiva', 8),
  // Cafes
  ...generateRandomComments('Ninnes Cafe & Restaurant', 7),
  ...generateRandomComments('Cafe blanka', 6),
  ...generateRandomComments('Cafe Korvari', 7),
  ...generateRandomComments('Enchanté Café', 9),
  ...generateRandomComments('Fazer Café Töölö', 8)
]

// 실제 코멘트 개수 (rating_count)
export const commentCounts: Record<string, number> = {
  'Ravintola Nepal': 826,
  'Kiven Grilli': 116,
  'Loco Pizza': 150,
  'Uuno Kivenlahti': 140,
  'Nanan grilli': 71,
  'Crispy Pizza': 604,
  'HAPPY DAYS Food Truck': 75,
  'Momo & More Lippulaiva': 105,
  'Pronto Pizzeria Espoonlahti': 153,
  'Seoul Good Lippulaiva': 242,
  'Ninnes Cafe & Restaurant': 228,
  'Cafe blanka': 142,
  'Cafe Korvari': 130,
  'Enchanté Café': 559,
  'Fazer Café Töölö': 313
}

// 특정 상점의 코멘트만 가져오기
export const getCommentsByShopId = (shopId: string): Comment[] => {
  return mockComments.filter(comment => comment.shopId === shopId)
}

// 특정 상점의 실제 코멘트 개수 가져오기
export const getCommentCount = (shopId: string): number => {
  return commentCounts[shopId] || 0
}
