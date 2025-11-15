/**
 * Mock Shop Data - Espoo Kivenlahti 실제 레스토랑
 */

import type { Shop, ShopLike } from '../types/shop'
import RavintolaNepalVideo from '../assets/restuarants/Ravintola Nepal.mp4'
import KivenGrilliVideo from '../assets/restuarants/Kiven Grilli.mp4'
import LocoPizzaVideo from '../assets/restuarants/Loco Pizza.mp4'
import UunoKivenlahtiVideo from '../assets/restuarants/Uuno Kivenlahti.mp4'
import NananGrilliVideo from '../assets/restuarants/Nanan grilli.mp4'
import CrispyPizzaVideo from '../assets/restuarants/Crispy Pizza.mp4'
import HappyDaysVideo from '../assets/restuarants/HAPPY DAYS Food Truck.mp4'
import MomoMoreVideo from '../assets/restuarants/Momo & More Lippulaiva.mp4'
import ProntoPizzeriaVideo from '../assets/restuarants/Pronto Pizzeria Espoonlahti.mp4'
import SeoulGoodVideo from '../assets/restuarants/Seoul Good Lippulaiva (Korean Fried Chicken restaurant).mp4'
import NinnesCafeVideo from '../assets/cafe/Ninnes Cafe & Restaurant.mp4'
import CafeBlankaVideo from '../assets/cafe/Cafe blanka.mp4'
import CafeKorvariVideo from '../assets/cafe/Cafe Korvari.mp4'
import EnchanteVideo from '../assets/cafe/Enchanté Café.mp4'
import FazerCafeVideo from '../assets/cafe/Fazer Café Töölö.mp4'

export const mockShops: Shop[] = [
  {
    shopId: 'Ravintola Nepal',
    shopName: 'Ravintola Nepal',
    latitude: 60.1556052,
    longitude: 24.6313928,
    videoUrl: RavintolaNepalVideo,
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    rating: 4.5,
    rating_count: 826,
    shopType: 'Restaurants',
    locationString: 'Kivenlahdenkatu 1, 02320 Espoo',
    openTime: '11:00am~9:00pm',
    priceRange: '€10-15',
    description: 'Authentic Nepali cuisine',
    comments: null
  },
  {
    shopId: 'Kiven Grilli',
    shopName: 'Kiven Grilli',
    latitude: 60.1543805,
    longitude: 24.6357518,
    videoUrl: KivenGrilliVideo,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    rating: 4.6,
    rating_count: 116,
    shopType: 'Restaurants',
    locationString: 'Merivalkama 2, 02320 Espoo',
    openTime: '5:00pm~11:00pm',
    priceRange: '€8-12',
    description: 'Classic Finnish grill food',
    comments: null
  },
  {
    shopId: 'Loco Pizza',
    shopName: 'Loco Pizza',
    latitude: 60.1537623,
    longitude: 24.6352215,
    videoUrl: LocoPizzaVideo,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    rating: 3.9,
    rating_count: 150,
    shopType: 'Restaurants',
    locationString: 'Merenkäynti 3 a, 02320 Espoo',
    openTime: '11:00am~11:00pm',
    priceRange: '€12-18',
    description: 'Artisan pizza with fresh ingredients',
    comments: null
  },
  {
    shopId: 'Uuno Kivenlahti',
    shopName: 'Uuno Kivenlahti',
    latitude: 60.1534258,
    longitude: 24.6354452,
    videoUrl: UunoKivenlahtiVideo,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    rating: 4.8,
    rating_count: 140,
    shopType: 'Restaurants',
    locationString: 'Merivirta 9, 02320 Espoo',
    openTime: '11:00am~9:00pm',
    priceRange: '€10-20',
    description: 'Modern Finnish cuisine',
    comments: null
  },
  {
    shopId: 'Nanan grilli',
    shopName: 'Nanan grilli',
    latitude: 60.1534858,
    longitude: 24.6356552,
    videoUrl: NananGrilliVideo,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    rating: 4.3,
    rating_count: 71,
    shopType: 'Restaurants',
    locationString: 'Merivirta 10, 02320 Espoo',
    openTime: '3:00pm~12:00am',
    priceRange: '€7-13',
    description: 'Local favorite grill spot',
    comments: null
  },
  {
    shopId: 'Crispy Pizza',
    shopName: 'Crispy Pizza',
    latitude: 60.1670555,
    longitude: 24.6176649,
    videoUrl: CrispyPizzaVideo,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    rating: 4.7,
    rating_count: 604,
    shopType: 'Restaurants',
    locationString: 'Saunalahdenkatu 8, 02330 Espoo',
    openTime: '10:00am~9:00pm',
    priceRange: '€11-16',
    description: 'Crispy thin crust pizza',
    comments: null
  },
  {
    shopId: 'HAPPY DAYS Food Truck',
    shopName: 'HAPPY DAYS Food Truck',
    latitude: 60.1705566,
    longitude: 24.6353361,
    videoUrl: HappyDaysVideo,
    imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800',
    rating: 4.6,
    rating_count: 75,
    shopType: 'Restaurants',
    locationString: 'Tammilaaksontie 4, 02330 Espoo',
    openTime: 'Check the Facebook Page',
    priceRange: '€8-14',
    description: 'Street food with a smile',
    comments: null
  },
  {
    shopId: 'Momo & More Lippulaiva',
    shopName: 'Momo & More Lippulaiva',
    latitude: 60.1499126,
    longitude: 24.6551829,
    videoUrl: MomoMoreVideo,
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800',
    rating: 4.6,
    rating_count: 105,
    shopType: 'Restaurants',
    locationString: 'Espoonlahdenkatu 8, 02320 Espoo',
    openTime: '10:30am~9:00pm',
    priceRange: '€9-15',
    description: 'Delicious Nepali momos',
    comments: null
  },
  {
    shopId: 'Pronto Pizzeria Espoonlahti',
    shopName: 'Pronto Pizzeria Espoonlahti',
    latitude: 60.1510142,
    longitude: 24.6568493,
    videoUrl: ProntoPizzeriaVideo,
    imageUrl: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800',
    rating: 4.8,
    rating_count: 153,
    shopType: 'Restaurants',
    locationString: 'Ulappakatu 1, 02320 Espoo',
    openTime: '11:00am~9:00pm',
    priceRange: '€10-17',
    description: 'Fast and tasty pizza',
    comments: null
  },
  {
    shopId: 'Seoul Good Lippulaiva',
    shopName: 'Seoul Good Lippulaiva',
    latitude: 60.1496042,
    longitude: 24.6556237,
    videoUrl: SeoulGoodVideo,
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800',
    rating: 4.6,
    rating_count: 242,
    shopType: 'Restaurants',
    locationString: 'Kaupunkikeskus Lippulaiva 1st floor, Espoonlahdenkatu 8, 02320 Espoo',
    openTime: '10:30am~8:00pm',
    priceRange: '€12-18',
    description: 'Korean Fried Chicken',
    comments: null
  },
  {
    shopId: 'Ninnes Cafe & Restaurant',
    shopName: 'Ninnes Cafe & Restaurant',
    latitude: 60.15295,
    longitude: 24.634776,
    videoUrl: NinnesCafeVideo,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    rating: 4.5,
    rating_count: 228,
    shopType: 'Coffee',
    locationString: 'Merivirta 11, 02320 Espoo',
    openTime: '10:00am~3:00pm',
    priceRange: '€5-12',
    description: 'Cozy cafe with great coffee',
    comments: null
  },
  {
    shopId: 'Cafe blanka',
    shopName: 'Cafe blanka',
    latitude: 60.1971341,
    longitude: 24.9018397,
    videoUrl: CafeBlankaVideo,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    rating: 4.5,
    rating_count: 142,
    shopType: 'Coffee',
    locationString: 'Mannerheimintie 95, 00270 Helsinki',
    openTime: '10:00am~7:00pm',
    priceRange: '€4-10',
    description: 'Specialty coffee and pastries',
    comments: null
  },
  {
    shopId: 'Cafe Korvari',
    shopName: 'Cafe Korvari',
    latitude: 60.188714,
    longitude: 24.9135518,
    videoUrl: CafeKorvariVideo,
    imageUrl: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800',
    rating: 4.7,
    rating_count: 130,
    shopType: 'Coffee',
    locationString: 'Stenbäckinkatu 12, 00250 Helsinki',
    openTime: '6:00am~4:00pm',
    priceRange: '€3-9',
    description: 'Early morning coffee spot',
    comments: null
  },
  {
    shopId: 'Enchanté Café',
    shopName: 'Enchanté Café',
    latitude: 60.1671009,
    longitude: 24.9346804,
    videoUrl: EnchanteVideo,
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
    rating: 4.8,
    rating_count: 559,
    shopType: 'Coffee',
    locationString: 'Eerikinkatu 9, 00100 Helsinki',
    openTime: '10:00am~6:00pm',
    priceRange: '€5-13',
    description: 'French-inspired cafe',
    comments: null
  },
  {
    shopId: 'Fazer Café Töölö',
    shopName: 'Fazer Café Töölö',
    latitude: 60.1836206,
    longitude: 24.9184838,
    videoUrl: FazerCafeVideo,
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    rating: 4.2,
    rating_count: 313,
    shopType: 'Coffee',
    locationString: 'Topeliuksenkatu 17, 00250 Helsinki',
    openTime: '7:00am~8:00pm',
    priceRange: '€4-11',
    description: 'Finnish cafe chain classic',
    comments: null
  }
]

// 좋아요 목 데이터 (랜덤)
export const mockShopLikes: ShopLike[] = mockShops.map(shop => ({
  shopId: shop.shopId,
  likeCount: Math.floor(Math.random() * 500) + 50,
  isLiked: false
}))
