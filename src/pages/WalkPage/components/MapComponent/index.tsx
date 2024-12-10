import { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Geometry, Point } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Circle, Fill, Stroke, Icon } from 'ol/style'
import 'ol/ol.css'
import axios from 'axios'
import { LineString } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { easeOut } from 'ol/easing'
import XYZ from 'ol/source/XYZ'
import ReactDOMServer from 'react-dom/server'
import * as S from './styles'
import { MIN_ACCURACY, MIN_DISTANCE, MIN_TIME_INTERVAL } from '~types/map'
import { useNavigate } from 'react-router-dom'
import { useWebSocket } from '~/WebSocketContext'
import { useMutation } from '@tanstack/react-query'
import { fetchWalkComplete } from '~apis/walk/fetchWalkComplete'
import WalkModal from '~pages/WalkPage/components/WalkModal'

// const ORS_API_URL = '/ors/v2/directions/foot-walking/geojson'

const getGeoOptions = () => ({
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 5000,
})

export const getMarkerIconString = () => {
  const svgString = ReactDOMServer.renderToString(<S.MapPinIcon />)
  return svgString
}

export const getMarkerIconString2 = () => {
  const svgString = ReactDOMServer.renderToString(<S.MapPinIcon2 />)
  return svgString
}

interface ExtendedDeviceOrientationEvent extends DeviceOrientationEvent {
  webkitCompassHeading?: number
}

export type NearbyWalker = {
  dogId: number
  dogProfileImg: string
  dogName: string
  breed: string
  dogWalkCount: number
  dogAge: number
  dogGender: 'MALE' | 'FEMALE'
  memberId: number
  memberEmail: string
}

export type ProposalResponse = {
  code: number
  message: string
  data: {
    dogId: number
    dogName: string
    dogBreed: string
    dogProfileImg: string
    comment: string
    dogGender: string
    dogAge: number
    email: string
    type: 'PROPOSAL'
  }
}

export type DecisionResponse = {
  code: number
  message: string
  data: {
    decision: 'ACCEPT' | 'DENY'
    otherMemberName: string
    otherMemberProfileImg: string
    type: 'DECISION'
  }
}

type MapComponentProps = {
  isModalOpen?: boolean
  setNearbyWalkers: React.Dispatch<React.SetStateAction<NearbyWalker[]>>
}

export default function MapComponent({ isModalOpen = false, setNearbyWalkers }: MapComponentProps) {
  const mapRef = useRef<Map | null>(null)
  const currentLocationMarkerRef = useRef<Feature<Geometry> | null>(null)
  const watchPositionIdRef = useRef<number | null>(null)
  const vectorSourceRef = useRef<VectorSource>(new VectorSource())
  const markerRef = useRef<Feature | null>(null)
  const [showCenterButton, setShowCenterButton] = useState<boolean>(false)
  const [hasCompassPermission, setHasCompassPermission] = useState<boolean>(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [screenOrientation, setScreenOrientation] = useState<number>(window.screen.orientation?.angle || 0)

  const [isWalking, setIsWalking] = useState<boolean>(false)
  const [walkTime, setWalkTime] = useState<number>(0)
  const walkIntervalRef = useRef<number | null>(null)
  const [walkDistance, setWalkDistance] = useState<number>(0)

  const routeLayerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const routeSourceRef = useRef<VectorSource>(new VectorSource())
  const lastApiCallTimeRef = useRef<number>(Date.now())
  const accumulatedPositionsRef = useRef<{ lat: number; lng: number }[]>([])

  const [estimatedDistance, setEstimatedDistance] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(false)
  const lastHeadingRef = useRef<number>(0)

  const [showProposalModal, setShowProposalModal] = useState(false)
  const [showDecisionModal, setShowDecisionModal] = useState(false)
  const [proposalInfo, setProposalInfo] = useState<ProposalResponse['data'] | null>({
    dogId: 1,
    dogName: '몽이',
    dogBreed: '골든 리트리버',
    dogProfileImg: 'https://placedog.net/200/200?id=1',
    comment: '같이 산책 해요 :)',
    dogGender: 'MALE',
    dogAge: 5,
    email: 'example@example.com',
    type: 'PROPOSAL',
  })

  const [decisionInfo, setDecisionInfo] = useState<DecisionResponse['data'] | null>({
    decision: 'ACCEPT',
    otherMemberName: '홍길동',
    otherMemberProfileImg: 'https://placedog.net/200/200?id=2',
    type: 'DECISION',
  })

  const [currentAccuracy, setCurrentAccuracy] = useState<number | null>(null)

  const [isWalkingTogether, setIsWalkingTogether] = useState<boolean>(false)
  const [, setWalkPartnerEmail] = useState<string | null>(null)

  const navigate = useNavigate()

  const { subscribe, publish, isConnected } = useWebSocket()

  const memberEmail = localStorage.getItem('email')

  // const { data } = useQuery({
  //   queryKey: ['walkPage'],
  //   queryFn: fetchMypage,
  // })

  const walkCompleteMutation = useMutation({
    mutationFn: (walkData: FormData) => fetchWalkComplete(walkData),
  })

  const partnerMarkerRef = useRef<Feature | null>(null)

  useEffect(() => {
    console.log('isConnected', isConnected)
    if (isConnected) {
      const handleMessage = (message: { body: string }) => {
        try {
          const response = JSON.parse(message.body)
          console.log('response', response)
          const type = Array.isArray(response.data) ? response.data[0].type : response.data.type

          if (type === 'WALK_ALONE') {
            const nearbyWalkersData = response.data.map((walker: NearbyWalker) => ({
              dogId: walker.dogId,
              dogProfileImg: walker.dogProfileImg,
              dogName: walker.dogName,
              breed: walker.breed,
              dogWalkCount: walker.dogWalkCount,
              dogAge: walker.dogAge,
              dogGender: walker.dogGender,
              memberId: walker.memberId,
              memberEmail: walker.memberEmail,
            }))

            setNearbyWalkers(nearbyWalkersData)
          } else if (type === 'PROPOSAL') {
            const proposalData = response.data as ProposalResponse['data']
            setProposalInfo(proposalData)
            setShowProposalModal(true)
            setWalkPartnerEmail(proposalData.email)
          } else if (type === 'DECISION') {
            const decisionData = response.data as DecisionResponse['data']

            if (decisionData.decision === 'DENY') {
              setDecisionInfo(decisionData)
              setShowDecisionModal(true)
            } else {
              setIsWalkingTogether(true)
            }
          } else if (type === 'WALK_WITH') {
            setIsWalkingTogether(true)
            setWalkPartnerEmail(response.data.email)

            updatePartnerLocation(response.data.latitude, response.data.longitude)
          }
        } catch (error) {
          console.error('메시지 파싱 실패:', error)
        }
      }

      const handleError = (message: { body: string }) => {
        console.error('WebSocket 오류:', message.body)
      }
      subscribe(`/sub/walk/${memberEmail}`, handleMessage)
      subscribe('/user/queue/errors', handleError)
    }
  }, [isConnected, subscribe, memberEmail])

  useEffect(() => {
    const currentVectorSource = vectorSourceRef.current

    return () => {
      if (currentLocationMarkerRef.current) {
        currentVectorSource.removeFeature(currentLocationMarkerRef.current)
      }
      if (markerRef.current) {
        currentVectorSource.removeFeature(markerRef.current)
      }
    }
  }, [])

  const handleCompassPermission = async () => {
    const deviceOrientation = DeviceOrientationEvent as {
      prototype: DeviceOrientationEvent
      requestPermission?: () => Promise<'granted' | 'denied' | 'default'>
    }

    if (deviceOrientation.requestPermission) {
      try {
        const response = await deviceOrientation.requestPermission()
        setHasCompassPermission(response === 'granted')
        if (response === 'granted') {
          setAutoRotate(true)
          rotateMap(lastHeadingRef.current)
        }
      } catch (error) {
        console.error('나침반 권한 요청 실패:', error)
      }
    } else {
      setHasCompassPermission(true)
      setAutoRotate(true)
    }
  }

  const handleLocationError = (error: GeolocationPositionError) => {
    console.error('위치 추적 오류:', error.message)
    switch (error.code) {
      case error.PERMISSION_DENIED:
        break
      case error.POSITION_UNAVAILABLE:
        break
      case error.TIMEOUT:
        break
      default:
    }
  }

  useEffect(() => {
    const handleOrientationChange = () => {
      setScreenOrientation(window.screen.orientation?.angle || 0)
    }

    window.addEventListener('orientationchange', handleOrientationChange)
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  const rotateMap = (heading: number) => {
    if (!mapRef.current) return

    const view = mapRef.current.getView()
    const rotation = (-heading * Math.PI) / 180

    view.animate({
      rotation: rotation,
      duration: 250,
      easing: easeOut,
    })
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coords = [position.coords.longitude, position.coords.latitude]

          mapRef.current?.getView().setCenter(fromLonLat(coords))
          const markerStyle = new Style({
            image: new Icon({
              anchor: [0.5, 1],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              src: `data:image/svg+xml;utf8,${encodeURIComponent(getMarkerIconString())}`,

              scale: 1,
            }),
          })

          if (!markerRef.current) {
            markerRef.current = new Feature({
              geometry: new Point(fromLonLat(coords)),
            })
            markerRef.current.setStyle(markerStyle)
            vectorSourceRef.current.addFeature(markerRef.current)
          }
        },
        handleLocationError,
        getGeoOptions()
      )
    }
  }, [])

  useEffect(() => {
    if (!hasCompassPermission) return

    const handleDeviceOrientation = (event: ExtendedDeviceOrientationEvent) => {
      if (!autoRotate) return

      let heading = 0

      if (event.webkitCompassHeading !== undefined) {
        heading = event.webkitCompassHeading
      } else if (event.alpha) {
        heading = 360 - event.alpha
        heading = (heading + screenOrientation) % 360
      }

      const headingDiff = Math.abs(heading - lastHeadingRef.current)
      if (headingDiff > 5) {
        lastHeadingRef.current = heading
        rotateMap(heading)
      }
    }

    const throttledHandler = throttle((event: unknown) => {
      handleDeviceOrientation(event as ExtendedDeviceOrientationEvent)
    }, 100)

    window.addEventListener('deviceorientation', throttledHandler, true)

    return () => {
      window.removeEventListener('deviceorientation', throttledHandler, true)
    }
  }, [hasCompassPermission, screenOrientation, autoRotate])

  const throttle = <T extends (...args: unknown[]) => void>(func: T, limit: number): T => {
    let inThrottle = false
    return function (this: unknown, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    } as T
  }

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
      style: new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: '#3388ff' }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 2,
          }),
        }),
      }),
    })

    const map = new Map({
      target: 'map',
      controls: [],
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.vworld.kr/req/wmts/1.0.0/BB928B16-A080-3D6E-B214-93CC288E5528/Base/{z}/{y}/{x}.png',
            crossOrigin: 'anonymous',
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        zoom: 18,
        maxZoom: 19,
        minZoom: 5,
        constrainRotation: false,
      }),
    })

    mapRef.current = map

    map.on('moveend', () => {
      if (markerRef.current) {
        const markerCoords = (markerRef.current.getGeometry() as Point).getCoordinates()
        const mapCenter = map.getView().getCenter()

        if (mapCenter) {
          const distance = Math.sqrt(
            Math.pow(markerCoords[0] - mapCenter[0], 2) + Math.pow(markerCoords[1] - mapCenter[1], 2)
          )

          const resolution = map.getView().getResolution()
          if (resolution !== undefined) {
            const pixelDistance = distance / resolution
            setShowCenterButton(pixelDistance > 50)
          }
        }
      }
    })

    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLocationError(null)
            const coords = [position.coords.longitude, position.coords.latitude]

            if (markerRef.current) {
              const point = markerRef.current.getGeometry() as Point
              const currentCoords = point.getCoordinates()
              const targetCoords = fromLonLat(coords)

              const duration = 2000
              const start = Date.now()
              const animate = () => {
                const elapsed = Date.now() - start
                const progress = Math.min(elapsed / duration, 1)

                const easeProgress = easeOut(progress)

                const x = currentCoords[0] + (targetCoords[0] - currentCoords[0]) * easeProgress
                const y = currentCoords[1] + (targetCoords[1] - currentCoords[1]) * easeProgress

                point.setCoordinates([x, y])

                if (progress < 1) {
                  requestAnimationFrame(animate)
                }
              }

              animate()
            } else {
              markerRef.current = new Feature({
                geometry: new Point(fromLonLat(coords)),
              })
              vectorSourceRef.current.addFeature(markerRef.current)
            }
          },
          handleLocationError,
          getGeoOptions()
        )
      }
    }, 5000)

    routeLayerRef.current = new VectorLayer({
      source: routeSourceRef.current,
      style: new Style({
        stroke: new Stroke({
          color: '#4CAF50',
          width: 4,
        }),
      }),
    })

    mapRef.current?.addLayer(routeLayerRef.current)

    return () => {
      clearInterval(intervalId)
      map.setTarget(undefined)
    }
  }, [])

  const handleCenterCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coords = [position.coords.longitude, position.coords.latitude]
          const accuracy = position.coords.accuracy

          if (accuracy > 30) {
            console.log('위치 정확도가 낮습니다:', accuracy + 'm')
            return
          }

          if (markerRef.current) {
            const point = markerRef.current.getGeometry() as Point
            const currentCoords = point.getCoordinates()
            const targetCoords = fromLonLat(coords)

            const duration = 2000
            const start = Date.now()
            const animate = () => {
              const elapsed = Date.now() - start
              const progress = Math.min(elapsed / duration, 1)
              const easeProgress = easeOut(progress)

              const x = currentCoords[0] + (targetCoords[0] - currentCoords[0]) * easeProgress
              const y = currentCoords[1] + (targetCoords[1] - currentCoords[1]) * easeProgress

              point.setCoordinates([x, y])

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            animate()
          }

          mapRef.current?.getView().animate({
            center: fromLonLat(coords),
            duration: 500,
          })

          setShowCenterButton(false)
        },
        error => {
          console.error('위치 정보를 가져오는데 실패했습니다:', error)
        },
        getGeoOptions()
      )
    }
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const pad = (num: number): string => num.toString().padStart(2, '0')

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`
  }

  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`
    }
    return `${(meters / 1000).toFixed(1)}km`
  }

  const calculateDirectDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  const shouldCallApi = (newPosition: { lat: number; lng: number }): boolean => {
    if (accumulatedPositionsRef.current.length === 0) return true

    const lastPosition = accumulatedPositionsRef.current[accumulatedPositionsRef.current.length - 1]
    const distance = calculateDirectDistance(lastPosition.lat, lastPosition.lng, newPosition.lat, newPosition.lng)
    const timeElapsed = Date.now() - lastApiCallTimeRef.current

    return distance >= MIN_DISTANCE || timeElapsed >= MIN_TIME_INTERVAL
  }

  const filterPosition = (position: GeolocationPosition): boolean => {
    const isAccurate = position.coords.accuracy <= MIN_ACCURACY

    setCurrentAccuracy(position.coords.accuracy)

    return isAccurate
  }

  const updateEstimatedDistance = () => {
    const positions = accumulatedPositionsRef.current
    if (positions.length < 2) return

    let totalDistance = walkDistance

    for (let i = 1; i < positions.length; i++) {
      const distance = calculateDirectDistance(
        positions[i - 1].lat,
        positions[i - 1].lng,
        positions[i].lat,
        positions[i].lng
      )
      totalDistance += distance
    }

    setEstimatedDistance(totalDistance)
  }

  const addWalkLocationMarker = (coordinates: number[]) => {
    const marker = new Feature({
      geometry: new Point(coordinates),
    })

    const markerStyle = new Style({
      image: new Circle({
        radius: 4,
        fill: new Fill({ color: '#4CAF50' }),
        stroke: new Stroke({
          color: '#ffffff',
          width: 2,
        }),
      }),
    })

    marker.setStyle(markerStyle)
    vectorSourceRef.current.addFeature(marker)
  }

  const captureMap = async (): Promise<string> => {
    if (!mapRef.current) return ''

    const view = mapRef.current.getView()
    const currentCenter = view.getCenter()
    const currentZoom = view.getZoom()
    const currentRotation = view.getRotation()

    return new Promise(resolve => {
      view.animate(
        {
          rotation: 0,
          duration: 250,
        },
        () => {
          setTimeout(() => {
            const mapElement = document.getElementById('map')
            if (!mapElement) {
              resolve('')
              return
            }

            const outputCanvas = document.createElement('canvas')
            const context = outputCanvas.getContext('2d')
            if (!context) {
              resolve('')
              return
            }

            const mapSize = mapRef.current?.getSize()
            if (!mapSize) {
              resolve('')
              return
            }

            const pixelRatio = window.devicePixelRatio || 1
            outputCanvas.width = mapSize[0] * pixelRatio
            outputCanvas.height = mapSize[1] * pixelRatio

            context.scale(pixelRatio, pixelRatio)

            const layers = mapElement.querySelectorAll('.ol-layer canvas')
            Array.from(layers).forEach(canvas => {
              const canvasElement = canvas as HTMLCanvasElement
              if (canvasElement.width > 0) {
                const opacity = canvasElement.parentElement?.style.opacity || canvasElement.style.opacity
                context.globalAlpha = opacity === '' ? 1 : Number(opacity)

                const transform = canvasElement.style.transform
                const matrix = transform
                  .match(/^matrix\(([^(]*)\)$/)?.[1]
                  ?.split(',')
                  .map(Number)

                if (matrix) {
                  context.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5])
                  context.drawImage(canvasElement, 0, 0)
                }
              }
            })

            const imageData = context.getImageData(0, 0, outputCanvas.width, outputCanvas.height)
            const bounds = getContentBounds(imageData)

            const croppedCanvas = document.createElement('canvas')
            const croppedContext = croppedCanvas.getContext('2d')
            if (!croppedContext) {
              resolve('')
              return
            }

            croppedCanvas.width = (bounds.right - bounds.left + 20) * pixelRatio
            croppedCanvas.height = (bounds.bottom - bounds.top + 20) * pixelRatio

            croppedContext.drawImage(
              outputCanvas,
              bounds.left - 10,
              bounds.top - 10,
              bounds.right - bounds.left + 20,
              bounds.bottom - bounds.top + 20,
              0,
              0,
              croppedCanvas.width,
              croppedCanvas.height
            )

            if (currentCenter && currentZoom && currentRotation !== undefined) {
              view.setCenter(currentCenter)
              view.setZoom(currentZoom)
              view.setRotation(currentRotation)
            }

            try {
              const imageUrl = croppedCanvas.toDataURL('image/png')
              resolve(imageUrl)
            } catch (err) {
              console.error('지도 이미지 생성 실패:', err)
              resolve('')
            }
          }, 300)
        }
      )
    })
  }

  const getContentBounds = (imageData: ImageData) => {
    const { width, height, data } = imageData
    let minX = width
    let minY = height
    let maxX = 0
    let maxY = 0

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3]
        if (alpha > 0) {
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)
        }
      }
    }

    return {
      left: minX,
      top: minY,
      right: maxX,
      bottom: maxY,
    }
  }

  const base64ToFile = (base64String: string): File => {
    // base64 문자열에서 데이터 URI 스키마 제거
    const base64Content = base64String.split(',')[1]
    // base64를 바이너리 데이터로 변환
    const binaryData = atob(base64Content)

    // 바이너리 데이터를 Uint8Array로 변환
    const bytes = new Uint8Array(binaryData.length)
    for (let i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i)
    }

    // Blob 생성
    const blob = new Blob([bytes], { type: 'image/png' })

    // File 객체 생성
    const fileName = `walk-map-${new Date().getTime()}.png`
    return new File([blob], fileName, { type: 'image/png' })
  }

  const startWatchingPosition = () => {
    return navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        if (!filterPosition(position)) return

        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        const coordinates = fromLonLat([newPosition.lng, newPosition.lat])

        if (currentLocationMarkerRef.current) {
          const point = currentLocationMarkerRef.current.getGeometry() as Point
          point.setCoordinates(coordinates)
          vectorSourceRef.current.changed()
        } else {
          currentLocationMarkerRef.current = new Feature({
            geometry: new Point(coordinates),
          })
          const markerStyle = new Style({
            image: new Icon({
              anchor: [0.5, 1],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              src: `data:image/svg+xml;utf8,${encodeURIComponent(getMarkerIconString())}`,
              scale: 1,
            }),
          })
          currentLocationMarkerRef.current.setStyle(markerStyle)
          vectorSourceRef.current.addFeature(currentLocationMarkerRef.current)
        }

        if (mapRef.current) {
          mapRef.current.getView().animate({
            center: coordinates,
            duration: 500,
          })
        }

        if (shouldCallApi(newPosition)) {
          accumulatedPositionsRef.current.push(newPosition)
          addWalkLocationMarker(coordinates)

          const walkData = {
            latitude: newPosition.lat.toFixed(6),
            longitude: newPosition.lng.toFixed(6),
          }

          const endpoint = isWalkingTogether ? '/pub/api/v1/walk-with' : '/pub/api/v1/walk-alone'
          publish(endpoint, walkData)

          if (accumulatedPositionsRef.current.length >= 2) {
            const lastTwoPositions = accumulatedPositionsRef.current.slice(-2)
            calculateWalkingDistance(lastTwoPositions)
          }

          lastApiCallTimeRef.current = Date.now()
        }

        updateEstimatedDistance()
      },
      handleLocationError,
      getGeoOptions()
    )
  }

  useEffect(() => {
    if (isWalking) {
      if (watchPositionIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchPositionIdRef.current)
      }
      watchPositionIdRef.current = startWatchingPosition()
    }
  }, [isWalkingTogether, isWalking])

  const handleWalkToggle = async () => {
    if (!isWalking) {
      handleCompassPermission()

      setIsWalking(true)
      setAutoRotate(true)
      setWalkDistance(0)
      setEstimatedDistance(0)
      accumulatedPositionsRef.current = []

      routeSourceRef.current.clear()
      vectorSourceRef.current.clear()

      rotateMap(lastHeadingRef.current)
      watchPositionIdRef.current = startWatchingPosition()

      walkIntervalRef.current = window.setInterval(() => {
        setWalkTime(prev => prev + 1)
      }, 1000)
    } else {
      setIsWalking(false)
      setAutoRotate(false)

      if (watchPositionIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchPositionIdRef.current)
        watchPositionIdRef.current = null
      }

      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current)
        walkIntervalRef.current = null
      }

      const mapImage = await captureMap()

      try {
        const mapImageFile = base64ToFile(mapImage)

        // FormData 객체 생성
        const formData = new FormData()
        formData.append('walkImgFile', mapImageFile)
        formData.append(
          'request',
          new Blob(
            [
              JSON.stringify({
                totalDistanceMeter: walkDistance || estimatedDistance,
                totalWalkTimeSecond: walkTime,
              }),
            ],
            { type: 'application/json' }
          )
        )

        const response = await walkCompleteMutation.mutateAsync(formData)

        console.log(response)

        navigate('/walk-complete', {
          state: response.data,
        })
      } catch (error) {
        console.error('산책 완료 데이터 전송 실패:', error)
      }
    }
  }

  const calculateWalkingDistance = async (positions: { lat: number; lng: number }[]) => {
    if (positions.length < 2) return

    try {
      const coordinates = positions.map(pos => [pos.lng, pos.lat])

      const response = await axios.post(
        '/api/ors/v2/directions/foot-walking/geojson',
        {
          coordinates: coordinates,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )

      if (!response.data.features?.[0]?.properties?.segments?.[0]?.distance) {
        console.log('유효한 경로를 찾을 수 없습니다')
        return
      }

      const segmentDistance = response.data.features[0].properties.summary.distance
      setWalkDistance(prev => prev + segmentDistance)

      const routeCoords = response.data.features[0].geometry.coordinates.map((coord: number[]) => fromLonLat(coord))

      const isFirstRoute = routeSourceRef.current.getFeatures().length === 0
      drawRoute(routeCoords, !isFirstRoute)

      lastApiCallTimeRef.current = Date.now()
    } catch (error) {
      console.error('거리 계산 오류:', error)
      updateEstimatedDistance()
    }
  }

  useEffect(() => {
    return () => {
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current)
      }
      if (watchPositionIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchPositionIdRef.current)
      }
    }
  }, [])

  const drawRoute = (coordinates: number[][], append: boolean = false) => {
    const routeStyle = new Style({
      stroke: new Stroke({
        color: '#ECB99A',
        width: 10,
        lineCap: 'round',
        lineJoin: 'round',
      }),
    })

    if (!append) {
      const lineString = new LineString(coordinates)
      const feature = new Feature({
        geometry: lineString,
      })
      feature.setStyle(routeStyle)
      routeSourceRef.current.clear()
      routeSourceRef.current.addFeature(feature)
    } else {
      const existingFeature = routeSourceRef.current.getFeatures()[0]
      if (existingFeature) {
        const existingLine = existingFeature.getGeometry() as LineString
        const existingCoords = existingLine.getCoordinates()
        existingLine.setCoordinates([...existingCoords, ...coordinates.slice(1)])
        existingFeature.setStyle(routeStyle)
      }
    }
  }

  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false)
  const [walkSummary, setWalkSummary] = useState<{
    time: number
    distance: number
    coordinates: { lat: number; lng: number }[]
  } | null>(null)

  useEffect(() => {
    let intervalId: number | null = null

    if (!isWalking && navigator.geolocation) {
      intervalId = window.setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLocationError(null)
            const coords = [position.coords.longitude, position.coords.latitude]

            if (markerRef.current) {
              const point = markerRef.current.getGeometry() as Point
              point.setCoordinates(fromLonLat(coords))
              vectorSourceRef.current.changed()
            }
          },
          handleLocationError,
          getGeoOptions()
        )
      }, 10000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isWalking])

  // 파트너 위치 마커 스타일 정의
  const getPartnerMarkerStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: `data:image/svg+xml;utf8,${encodeURIComponent(getMarkerIconString2())}`,

      scale: 0.75,
    }),
  })

  // 파트너 위치 업데이트 함수
  const updatePartnerLocation = (latitude: number, longitude: number) => {
    const coordinates = fromLonLat([longitude, latitude])

    if (partnerMarkerRef.current) {
      // 기존 마커 위치 업데이트
      const point = partnerMarkerRef.current.getGeometry() as Point
      const currentCoords = point.getCoordinates()

      // 부드러운 애니메이션으로 위치 이동
      const duration = 2000
      const start = Date.now()
      const animate = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = easeOut(progress)

        const x = currentCoords[0] + (coordinates[0] - currentCoords[0]) * easeProgress
        const y = currentCoords[1] + (coordinates[1] - currentCoords[1]) * easeProgress

        point.setCoordinates([x, y])

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    } else {
      // 새로운 마커 생성
      partnerMarkerRef.current = new Feature({
        geometry: new Point(coordinates),
      })
      partnerMarkerRef.current.setStyle(getPartnerMarkerStyle)
      vectorSourceRef.current.addFeature(partnerMarkerRef.current)
    }
  }

  // 컴포넌트 정리 시 파트너 마커 제거
  useEffect(() => {
    return () => {
      if (partnerMarkerRef.current) {
        vectorSourceRef.current.removeFeature(partnerMarkerRef.current)
      }
    }
  }, [])

  return (
    <S.MapContainer>
      <S.Map id='map' />
      {currentAccuracy && <S.AccuracyIndicator>{currentAccuracy.toFixed(1)}m</S.AccuracyIndicator>}
      {locationError && <S.LocationErrorMessage>{locationError}</S.LocationErrorMessage>}
      {showCenterButton && (
        <S.CenterButton onClick={handleCenterCurrentLocation}>
          <S.CenterIcon />내 위치로
        </S.CenterButton>
      )}

      {isWalking ? (
        <S.WalkControlContainer $isWalking={isWalking}>
          <S.InfoBox>
            <S.InfoValue>{formatTime(walkTime)}</S.InfoValue>
          </S.InfoBox>

          <S.StyledActionButton
            onClick={handleWalkToggle}
            $type='capsule'
            $bgColor={isWalking ? 'font_1' : 'default'}
            $fontWeight='700'
            $isWalking={isWalking}
            disabled={isModalOpen}
          >
            {isWalking ? '산책 끝' : '산책 시작'}
          </S.StyledActionButton>

          <S.InfoBox>
            <S.InfoValue>{formatDistance(estimatedDistance || walkDistance)}</S.InfoValue>
          </S.InfoBox>
        </S.WalkControlContainer>
      ) : (
        <S.WalkControlContainer $isWalking={isWalking}>
          <S.StyledActionButton
            onClick={handleWalkToggle}
            $type='capsule'
            $bgColor={isWalking ? 'font_1' : 'default'}
            $fontWeight='700'
            $isWalking={isWalking}
            disabled={isModalOpen}
          >
            {isWalking ? '산책 끝' : '산책 시작'}
          </S.StyledActionButton>
        </S.WalkControlContainer>
      )}

      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 100,
        }}
      ></div>

      {showSummaryModal && walkSummary && (
        <S.ModalOverlay>
          <S.ModalContent>
            <S.ModalTitle>산책 요약</S.ModalTitle>
            <S.ModalSection>
              <strong>총 시간:</strong> {formatTime(walkSummary.time)}
            </S.ModalSection>
            <S.ModalSection>
              <strong>총 거리:</strong> {formatDistance(walkSummary.distance)}
            </S.ModalSection>
            <S.ModalSection>
              <strong>경로 좌표:</strong>
              <S.CoordinatesContainer>
                {walkSummary.coordinates.map((coord, index) => (
                  <S.CoordinateItem key={index}>
                    {`위치 ${index + 1}: 위도 ${coord.lat.toFixed(6)}, 경도 ${coord.lng.toFixed(6)}`}
                  </S.CoordinateItem>
                ))}
              </S.CoordinatesContainer>
            </S.ModalSection>
            <S.ModalButton
              onClick={() => {
                setShowSummaryModal(false)
                setWalkSummary(null)
              }}
            >
              닫기
            </S.ModalButton>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {showProposalModal && proposalInfo && (
        <WalkModal
          type='accept'
          userInfo={{
            name: proposalInfo.dogName,
            breed: proposalInfo.dogBreed,
            profileImg: proposalInfo.dogProfileImg,
            age: proposalInfo.dogAge,
            gender: proposalInfo.dogGender === 'MALE' ? '남' : '여',
            memberEmail: proposalInfo.email,
            comment: proposalInfo.comment,
          }}
          onClose={() => setShowProposalModal(false)}
          onConfirm={() => {
            // TODO: 수락 로직 구현
            setShowProposalModal(false)
          }}
          onCancel={() => {
            // TODO: 거절 로직 구현
            setShowProposalModal(false)
          }}
        />
      )}
      {showDecisionModal && decisionInfo && (
        <WalkModal
          type='progress'
          userInfo={{
            name: decisionInfo.otherMemberName,
            profileImg: decisionInfo.otherMemberProfileImg,
          }}
          onClose={() => setShowDecisionModal(false)}
          onConfirm={() => {
            // TODO: 다시 시도 구현
            setShowDecisionModal(false)
          }}
          onCancel={() => {
            setShowDecisionModal(false)
          }}
        />
      )}
    </S.MapContainer>
  )
}
