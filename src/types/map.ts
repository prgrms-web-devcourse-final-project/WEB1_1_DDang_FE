export interface WalkSummary {
  time: number
  distance: number
  coordinates: { lat: number; lng: number }[]
}

export const GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 1000,
}

export const MIN_ACCURACY = 20
export const MIN_DISTANCE = 20
export const MIN_TIME_INTERVAL = 10000
