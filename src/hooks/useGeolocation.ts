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

interface GeocodeResult {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
    location_type: string
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }
  place_id: string
  types: string[]
}

interface GeocodeResponse {
  results: GeocodeResult[]
  status: string
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location>({
    address: null,
    error: null,
  })

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocation({ address: null, error: '위치 서비스가 지원되지 않습니다.' })
      return
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords
          const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY
          const response = await axios.get<GeocodeResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${apiKey}`
          )

          console.log('Google API 응답:', response.data)

          let si: string | undefined
          let district: string | undefined
          let neighborhood: string | undefined
          if (response.data.results.length > 0) {
            response.data.results.forEach(result => {
              const addressComponents = result.address_components
              if (!si) si = addressComponents.find(component => component.long_name.endsWith('시'))?.long_name
              if (!district)
                district = addressComponents.find(component => component.long_name.endsWith('구'))?.long_name
              if (!neighborhood)
                neighborhood = addressComponents.find(component => component.long_name.endsWith('동'))?.long_name

              console.log(si, district, neighborhood)
            })
          }
          const address = [si, district, neighborhood].join(' ').trim()
          if (address) {
            setLocation({
              address: `${address}`,
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
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 1000,
      }
    )
  }

  return { location, getCurrentLocation }
}
