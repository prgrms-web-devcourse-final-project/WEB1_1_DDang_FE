import { useState } from 'react'
import axios from 'axios'

interface Location {
  address: string | null
  error: string | null
}
interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location>({
    address: null,
    error: null,
  })

  const getCurrentLocation = () => {
    console.log('getCurrentLocation 호출됨')

    if (!navigator.geolocation) {
      console.log('geolocation 지원되지 않음')
      setLocation({ address: null, error: '위치 서비스가 지원되지 않습니다.' })
      return
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords
          console.log('위치 확인:', latitude, longitude)

          const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY
          console.log('API Key 확인:', apiKey) // 실제 운영 환경에서는 제거해야 함

          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${apiKey}`
          )

          console.log('Google API 응답:', response.data)

          if (response.data.results.length > 0) {
            const addressComponents = response.data.results[0].address_components
            const district = addressComponents.find((component: AddressComponent) =>
              component.types.includes('sublocality_level_1')
            )?.long_name
            const neighborhood = addressComponents.find((component: AddressComponent) =>
              component.types.includes('sublocality_level_2')
            )?.long_name

            console.log('찾은 주소:', district, neighborhood)

            setLocation({
              address: `${district} ${neighborhood}`,
              error: null,
            })
          }
        } catch (error) {
          console.error('에러 발생:', error)
          setLocation({ address: null, error: '위치를 가져오는데 실패했습니다.' })
        }
      },
      error => {
        console.error('위치 권한 에러:', error)
        setLocation({ address: null, error: '위치 권한이 거부되었습니다.' })
      },
      {
        enableHighAccuracy: false, // true에서 false로 변경
        timeout: 10000, // 5000에서 10000으로 증가
        maximumAge: 1000, // 0에서 1000으로 변경
      }
    )
  }

  return { location, getCurrentLocation }
}
