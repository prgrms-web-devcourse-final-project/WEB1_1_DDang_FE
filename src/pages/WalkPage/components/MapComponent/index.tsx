import { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Point } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Circle, Fill, Stroke } from 'ol/style'
import 'ol/ol.css'
import axios from 'axios'
import { LineString } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { easeOut } from 'ol/easing'
import XYZ from 'ol/source/XYZ'

const ORS_API_URL = '/ors/v2/directions/foot-walking/geojson'

export default function MapComponent() {
  // 지도 관련 ref
  const mapRef = useRef<Map | null>(null)
  const vectorSourceRef = useRef<VectorSource>(new VectorSource())
  const markerRef = useRef<Feature | null>(null)
  // const rotationRef = useRef<number>(0)

  // 위치 및 권한 관련 상태
  const [hasCompassPermission, setHasCompassPermission] = useState<boolean>(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [screenOrientation, setScreenOrientation] = useState<number>(window.screen.orientation?.angle || 0)

  // 산책 관련 상태 및 ref
  const [isWalking, setIsWalking] = useState<boolean>(false)
  const [walkTime, setWalkTime] = useState<number>(0)
  const walkIntervalRef = useRef<number | null>(null)
  const [walkDistance, setWalkDistance] = useState<number>(0)
  const [_positions, setPositions] = useState<{ lat: number; lng: number }[]>([])

  // 경로 관련 ref
  const routeLayerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const routeSourceRef = useRef<VectorSource>(new VectorSource())
  const lastApiCallTimeRef = useRef<number>(Date.now())
  const accumulatedPositionsRef = useRef<{ lat: number; lng: number }[]>([])

  // 거리 및 방향 관련 상태
  const [estimatedDistance, setEstimatedDistance] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(false)
  const lastHeadingRef = useRef<number>(0)

  // 위치 추적 옵션 설정
  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000,
  }

  // 나침반 권한 요청 함수
  const requestCompassPermission = async () => {
    if (DeviceOrientationEvent && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission()
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

  // 위치 추적 오류 처리 함수
  const handleLocationError = (error: GeolocationPositionError) => {
    console.error('위치 추적 오류:', error.message)
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setLocationError('위치 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.')
        break
      case error.POSITION_UNAVAILABLE:
        setLocationError('위치 정보를 사용할 수 없습니다. GPS 신호를 확인해주세요.')
        break
      case error.TIMEOUT:
        setLocationError('위치 정보 요청 시간이 초과되었습니다.')
        break
      default:
        setLocationError('위치 정보를 가져오는데 실패했습니다.')
    }
  }

  // 화면 방향 변경 감지
  useEffect(() => {
    const handleOrientationChange = () => {
      setScreenOrientation(window.screen.orientation?.angle || 0)
    }

    window.addEventListener('orientationchange', handleOrientationChange)
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  // 지도 회전 처리
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

  // 나침반 이벤트 처리
  useEffect(() => {
    if (!hasCompassPermission) return

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!autoRotate) return

      let heading = 0

      if ((event as any).webkitCompassHeading) {
        heading = (event as any).webkitCompassHeading
      } else if (event.alpha) {
        heading = 360 - event.alpha
        heading = (heading + screenOrientation) % 360
      }

      lastHeadingRef.current = heading

      if (markerRef.current && mapRef.current) {
        // 마커 스타일 업데이트 - 방향 화살표 제거
        markerRef.current.setStyle([
          // 바깥쪽 원
          new Style({
            image: new Circle({
              radius: 15,
              fill: new Fill({ color: 'rgba(66, 133, 244, 0.1)' }),
              stroke: new Stroke({
                color: '#4285F4',
                width: 1,
              }),
            }),
          }),
          // 중앙 원
          new Style({
            image: new Circle({
              radius: 8,
              fill: new Fill({ color: '#4285F4' }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 2,
              }),
            }),
          }),
        ])

        // 지도 회전
        rotateMap(heading)
      }
    }

    window.addEventListener('deviceorientation', handleDeviceOrientation, true)

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation, true)
    }
  }, [hasCompassPermission, screenOrientation, autoRotate])

  useEffect(() => {
    // 벡터 레이어 생성 (현재 위치 표시용)
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

    // 지도 초기화
    // const map = new Map({
    //   target: 'map',
    //   layers: [
    //     // 기본 지도 레이어
    //     new TileLayer({
    //       source: new OSM(),
    //     }),
    //     vectorLayer,
    //   ],
    //   view: new View({
    //     center: fromLonLat([126.9784, 37.5666]), // 서울시청 기준
    //     zoom: 18,
    //   }),
    // })

    const map = new Map({
      target: 'map',
      layers: [
        // Vworld 기본지도로 변경
        new TileLayer({
          source: new XYZ({
            url: 'https://api.vworld.kr/req/wmts/1.0.0/BB928B16-A080-3D6E-B214-93CC288E5528/Base/{z}/{y}/{x}.png',
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([126.9784, 37.5666]), // 서울시청 기준
        zoom: 18,
        maxZoom: 19,
        minZoom: 5,
        constrainRotation: false,
      }),
    })

    mapRef.current = map

    // 위치 추적 및 마커 업데이트
    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLocationError(null)
            const coords = [position.coords.longitude, position.coords.latitude]
            // const accuracy = position.coords.accuracy

            // 현재 위치에 마커 추가 또는 업데이트
            if (markerRef.current) {
              const point = markerRef.current.getGeometry() as Point
              const currentCoords = point.getCoordinates()
              const targetCoords = fromLonLat(coords)

              // 마커 위치 애니메이션
              const duration = 2000 // 애니메이션 지속 시간 (ms)
              const start = Date.now()
              const animate = () => {
                const elapsed = Date.now() - start
                const progress = Math.min(elapsed / duration, 1)

                // easeOut 함수를 사용하여 부드러운 감속 효과
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
          geoOptions
        )
      }
    }, 5000)

    // 경로 레이어 추가
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
      // 컴포넌트 언마운트 시 인터벌 정리
      clearInterval(intervalId)
      map.setTarget(undefined)
    }
  }, [])

  // 현재 위치로 지도 중심 이동
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

            // 마커 위치 애니메이션
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
        },
        error => {
          console.error('위치 정보를 가져오는데 실패했습니다:', error)
        },
        geoOptions
      )
    }
  }

  // 시간 포맷팅 (00:00:00)
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // 거리 포맷팅 (m/km)
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`
    }
    return `${(meters / 1000).toFixed(2)}km`
  }

  // 두 지점 간의 직선 거리를 계산하는 함수 (Haversine formula) -> 실제 거리 계산이 불가능 할 때 사용
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

  // shouldCallApi 함수 수정
  const shouldCallApi = (newPosition: { lat: number; lng: number }): boolean => {
    const MIN_DISTANCE = 20 // 최소 50미터
    const MIN_TIME_INTERVAL = 10000 // 최소 30초

    // 첫 번째 위치는 무조건 저장
    if (accumulatedPositionsRef.current.length === 0) return true

    const lastPosition = accumulatedPositionsRef.current[accumulatedPositionsRef.current.length - 1]
    const distance = calculateDirectDistance(lastPosition.lat, lastPosition.lng, newPosition.lat, newPosition.lng)
    const timeElapsed = Date.now() - lastApiCallTimeRef.current

    return distance >= MIN_DISTANCE || timeElapsed >= MIN_TIME_INTERVAL
  }

  // 위치 데이터 정확도 필터링
  const filterPosition = (position: GeolocationPosition): boolean => {
    const MIN_ACCURACY = 20 // 20미터 이상의 정확도만 허용
    const isAccurate = position.coords.accuracy <= MIN_ACCURACY

    // 도로 근처에 있는지 확인하는 로직 추가 가능
    // 예: 주요 도로와의 거리를 계산하여 필터링

    return isAccurate
  }

  // 직선 거리로 추정치 업데이트
  const updateEstimatedDistance = () => {
    const positions = accumulatedPositionsRef.current
    if (positions.length < 2) return

    let totalDistance = walkDistance // 이전까지의 실제 거리

    // 마지막 API 호출 이후의 거리를 직거리로 계산
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

  // 실제 산책에서 사용할 위치 마커 추가 함수
  const addWalkLocationMarker = (coordinates: number[]) => {
    const marker = new Feature({
      geometry: new Point(coordinates),
    })

    marker.setStyle(
      new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: '#FF6B6B' }), // 마커 색상 변경
          stroke: new Stroke({
            color: '#ffffff',
            width: 2,
          }),
        }),
      })
    )

    vectorSourceRef.current.addFeature(marker)
  }

  const currentLocationStyle = new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({ color: '#4285F4' }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 2,
      }),
    }),
  })

  // handleWalkToggle 함수 수정 (테스트 모드 부분은 그대로 유지)
  const handleWalkToggle = () => {
    if (!isWalking) {
      // 실제 산책 시작
      setIsWalking(true)
      setAutoRotate(true)
      setPositions([])
      setWalkDistance(0)
      setEstimatedDistance(0)
      accumulatedPositionsRef.current = []

      // 기존 경로와 마커 초기화
      routeSourceRef.current.clear()
      vectorSourceRef.current.clear()

      // 현재 방향으로 즉시 회전
      rotateMap(lastHeadingRef.current)

      // 위치 추적 시작
      navigator.geolocation.watchPosition(
        position => {
          if (!filterPosition(position)) return

          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          const coordinates = fromLonLat([newPosition.lng, newPosition.lat])

          // 현재 위치 마커 업데이트 (실시간 위치 표시용)
          if (markerRef.current) {
            const point = markerRef.current.getGeometry() as Point
            point.setCoordinates(coordinates)
          } else {
            markerRef.current = new Feature({
              geometry: new Point(coordinates),
            })
            markerRef.current.setStyle(currentLocationStyle)
            vectorSourceRef.current.addFeature(markerRef.current)
          }

          // 지도 중심 이동
          if (mapRef.current) {
            mapRef.current.getView().animate({
              center: coordinates,
              duration: 500,
            })
          }

          // API 요청 조건을 만족할 때만 좌표 저장 및 경로 계산
          if (shouldCallApi(newPosition)) {
            accumulatedPositionsRef.current.push(newPosition)
            addWalkLocationMarker(coordinates)

            if (accumulatedPositionsRef.current.length >= 2) {
              const lastTwoPositions = accumulatedPositionsRef.current.slice(-2)
              calculateWalkingDistance(lastTwoPositions)
            }

            lastApiCallTimeRef.current = Date.now()
          }

          updateEstimatedDistance()
        },
        handleLocationError,
        {
          ...geoOptions,
          maximumAge: 10000,
        }
      )

      // 타이머 시작
      walkIntervalRef.current = window.setInterval(() => {
        setWalkTime(prev => prev + 1)
      }, 1000)
    } else {
      // 산책 종료
      setIsWalking(false)
      setAutoRotate(false)

      // 타이머 정지
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current)
        walkIntervalRef.current = null
      }

      // 산책 요약 정보 저장 및 모달 표시
      setWalkSummary({
        time: walkTime,
        distance: walkDistance || estimatedDistance,
        coordinates: accumulatedPositionsRef.current,
      })
      setShowSummaryModal(true)

      // 지도를 북쪽 방향으로 다시 회전
      if (mapRef.current) {
        mapRef.current.getView().animate({
          rotation: 0,
          duration: 500,
        })
      }
    }
  }

  // 실제 산책용 거리 계산 함수 (테스트 모드의 calculateRealDistance는 그대로 유지)
  const calculateWalkingDistance = async (positions: { lat: number; lng: number }[]) => {
    if (positions.length < 2) return

    try {
      const coordinates = positions.map(pos => [pos.lng, pos.lat])

      const response = await axios.post(ORS_API_URL, {
        coordinates: coordinates,
      })

      if (!response.data.features?.[0]?.properties?.segments?.[0]?.distance) {
        console.log('유효한 경로를 찾을 수 없습니다')
        return
      }

      // 새로운 구간의 거리를 누적
      const segmentDistance = response.data.features[0].properties.summary.distance
      setWalkDistance(prev => prev + segmentDistance)

      // 새 경로 구간 그리기
      const routeCoords = response.data.features[0].geometry.coordinates.map((coord: number[]) => fromLonLat(coord))

      // 첫 번째 경로가 아닌 경우 append 모드로 그리기
      const isFirstRoute = routeSourceRef.current.getFeatures().length === 0
      drawRoute(routeCoords, !isFirstRoute)

      lastApiCallTimeRef.current = Date.now()
    } catch (error) {
      console.error('거리 계산 오류:', error)
      updateEstimatedDistance()
    }
  }

  // 컴포넌트 언마운트 시 인터벌 정리
  useEffect(() => {
    return () => {
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current)
      }
    }
  }, [])

  // drawRoute 함수를 수정하여 이전 경로를 유지하면서 새로운 경로를 추가하는 함수로 변경
  const drawRoute = (coordinates: number[][], append: boolean = false) => {
    const routeStyle = new Style({
      stroke: new Stroke({
        color: '#FF6B6B', // 경로 색상 변경
        width: 5, // 경로 두께 증가
        lineCap: 'round', // 경로 끝부분을 둥글게
        lineJoin: 'round', // 경로 연결부분을 둥글게
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

  // 지도 회전 토글 버튼 추가
  const handleRotateToggle = () => {
    if (!hasCompassPermission) {
      requestCompassPermission()
      return
    }

    const newAutoRotate = !autoRotate
    setAutoRotate(newAutoRotate)

    if (newAutoRotate) {
      // 회전 활성화 시 현재 방향으로 즉시 회전
      rotateMap(lastHeadingRef.current)
    } else {
      // 회전 비활성화 시 북쪽 방향으로 회전
      mapRef.current?.getView().animate({
        rotation: 0,
        duration: 500,
      })
    }
  }

  // 기존 상태 선언부 아래에 추가

  // 모달 관련 상태 추가
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false)
  const [walkSummary, setWalkSummary] = useState<{
    time: number
    distance: number
    coordinates: { lat: number; lng: number }[]
  } | null>(null)

  return (
    <>
      <div id='map' style={{ width: '100vw', height: '100dvh' }} />
      {locationError && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 100,
          }}
        >
          {locationError}
        </div>
      )}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          zIndex: 100,
          display: isWalking ? 'block' : 'none',
        }}
      >
        <div>{formatTime(walkTime)}</div>
        <div>{formatDistance(estimatedDistance || walkDistance)}</div>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
        }}
      >
        <button
          onClick={handleWalkToggle}
          style={{
            padding: '15px 30px',
            background: isWalking ? '#ff4444' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {isWalking ? '산책 종료' : '산책 시작'}
        </button>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 100,
        }}
      >
        <button
          onClick={hasCompassPermission ? handleRotateToggle : requestCompassPermission}
          style={{
            padding: '10px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            color: hasCompassPermission && autoRotate ? '#4CAF50' : 'currentColor',
          }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M12 2L19 21l-7-4-7 4 7-19z' />
          </svg>
        </button>
        <button
          onClick={handleCenterCurrentLocation}
          style={{
            padding: '10px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            cursor: 'pointer',
          }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10' />
            <circle cx='12' cy='12' r='1' />
          </svg>
        </button>
      </div>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100,
        }}
      ></div>

      {showSummaryModal && walkSummary && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '80%',
              maxHeight: '80%',
              overflow: 'auto',
            }}
          >
            <h2 style={{ marginBottom: '20px' }}>산책 요약</h2>
            <div style={{ marginBottom: '15px' }}>
              <strong>총 시간:</strong> {formatTime(walkSummary.time)}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>총 거리:</strong> {formatDistance(walkSummary.distance)}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <strong>경로 좌표:</strong>
              <div
                style={{
                  maxHeight: '200px',
                  overflow: 'auto',
                  padding: '10px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '5px',
                  fontSize: '14px',
                }}
              >
                {walkSummary.coordinates.map((coord, index) => (
                  <div key={index}>
                    {`위치 ${index + 1}: 위도 ${coord.lat.toFixed(6)}, 경도 ${coord.lng.toFixed(6)}`}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setShowSummaryModal(false)
                setWalkSummary(null)
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  )
}
