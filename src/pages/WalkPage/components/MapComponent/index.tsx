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
import * as S from '~pages/WalkPage/styles'
import { MIN_ACCURACY, MIN_DISTANCE, MIN_TIME_INTERVAL } from '~types/map'
import { useNavigate } from 'react-router-dom'

const ORS_API_URL = '/ors/v2/directions/foot-walking/geojson'

const geoOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 1000,
}

export const getMarkerIconString = () => {
  const svgString = ReactDOMServer.renderToString(<S.MapPinIcon />)
  return svgString
}

// 모달 상태를 props로 받도록 수정
interface MapComponentProps {
  isModalOpen?: boolean
}

export default function MapComponent({ isModalOpen = false }: MapComponentProps) {
  // 지도 관련 ref
  const mapRef = useRef<Map | null>(null)
  const currentLocationMarkerRef = useRef<Feature<Geometry> | null>(null)
  const watchPositionIdRef = useRef<number | null>(null)
  const vectorSourceRef = useRef<VectorSource>(new VectorSource())
  const markerRef = useRef<Feature | null>(null)
  const [showCenterButton, setShowCenterButton] = useState<boolean>(false)
  // const rotationRef = useRef<number>(0)

  // 위치 및 권한 관련 상태
  const [hasCompassPermission] = useState<boolean>(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [screenOrientation, setScreenOrientation] = useState<number>(window.screen.orientation?.angle || 0)

  // 산책 관련 상태 및 ref
  const [isWalking, setIsWalking] = useState<boolean>(false)
  const [walkTime, setWalkTime] = useState<number>(0)
  const walkIntervalRef = useRef<number | null>(null)
  const [walkDistance, setWalkDistance] = useState<number>(0)
  const [, setPositions] = useState<{ lat: number; lng: number }[]>([])

  // 경로 관련 ref
  const routeLayerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const routeSourceRef = useRef<VectorSource>(new VectorSource())
  const lastApiCallTimeRef = useRef<number>(Date.now())
  const accumulatedPositionsRef = useRef<{ lat: number; lng: number }[]>([])

  // 거리 및 방향 관련 상태
  const [estimatedDistance, setEstimatedDistance] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(false)
  const lastHeadingRef = useRef<number>(0)

  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (currentLocationMarkerRef.current) {
        vectorSourceRef.current.removeFeature(currentLocationMarkerRef.current)
      }
      if (markerRef.current) {
        vectorSourceRef.current.removeFeature(markerRef.current)
      }
    }
  }, [])

  // 나침반 권한 요청 함수
  // const handleCompassPermission = async () => {
  //   if (DeviceOrientationEvent && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
  //     try {
  //       const response = await (DeviceOrientationEvent as any).requestPermission()
  //       setHasCompassPermission(response === 'granted')
  //       if (response === 'granted') {
  //         setAutoRotate(true)
  //         rotateMap(lastHeadingRef.current)
  //       }
  //     } catch (error) {
  //       console.error('나침반 권한 요청 실패:', error)
  //     }
  //   } else {
  //     setHasCompassPermission(true)
  //     setAutoRotate(true)
  //   }
  // }

  // 위치 추적 오류 처리 함수
  const handleLocationError = (error: GeolocationPositionError) => {
    console.error('위치 추적 오류:', error.message)
    switch (error.code) {
      case error.PERMISSION_DENIED:
        // setLocationError('위치 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.')
        break
      case error.POSITION_UNAVAILABLE:
        // setLocationError('위치 정보를 사용할 수 없습니다. GPS 신호를 확인해주세요.')
        break
      case error.TIMEOUT:
        // setLocationError('위치 정보 요청 시간이 초과되었습니다.')
        break
      default:
      // setLocationError('위치 정보를 가져오는데 실패했습니다.')
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coords = [position.coords.longitude, position.coords.latitude]

          // 지도 중심 이동
          mapRef.current?.getView().setCenter(fromLonLat(coords))

          // SVG 마커 스타일 생성
          const markerStyle = new Style({
            image: new Icon({
              anchor: [0.5, 1], // 핀 하단 중앙이 좌표에 위치하도록 설정
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              src: `data:image/svg+xml;utf8,${encodeURIComponent(getMarkerIconString())}`,

              scale: 1,
            }),
          })

          // 마커 생성 및 추가
          if (!markerRef.current) {
            markerRef.current = new Feature({
              geometry: new Point(fromLonLat(coords)),
            })
            markerRef.current.setStyle(markerStyle)
            vectorSourceRef.current.addFeature(markerRef.current)
          }
        },
        handleLocationError,
        geoOptions
      )
    }
  }, [])

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

      rotateMap(heading)
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

    const map = new Map({
      target: 'map',
      controls: [],
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

          setShowCenterButton(false)
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

    if (hours > 0) {
      return `${hours}시간 ${minutes}분`
    }
    return `${minutes}분`
  }

  // 거리 포맷팅 (km)
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`
    }
    return `${(meters / 1000).toFixed(1)} km`
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
    // 첫 번째 위치는 무조건 저장
    if (accumulatedPositionsRef.current.length === 0) return true

    const lastPosition = accumulatedPositionsRef.current[accumulatedPositionsRef.current.length - 1]
    const distance = calculateDirectDistance(lastPosition.lat, lastPosition.lng, newPosition.lat, newPosition.lng)
    const timeElapsed = Date.now() - lastApiCallTimeRef.current

    return distance >= MIN_DISTANCE || timeElapsed >= MIN_TIME_INTERVAL
  }

  // 위치 데이터 정확도 필터링
  const filterPosition = (position: GeolocationPosition): boolean => {
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
      watchPositionIdRef.current = navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          if (!filterPosition(position)) return

          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          const coordinates = fromLonLat([newPosition.lng, newPosition.lat])

          // 현재 위치 마커 업데이트 (실시간 위치 표시용)
          if (currentLocationMarkerRef.current) {
            const point = currentLocationMarkerRef.current.getGeometry() as Point
            point.setCoordinates(coordinates)
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

      // 위치 추적 중지
      if (watchPositionIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchPositionIdRef.current)
        watchPositionIdRef.current = null
      }

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

      navigate('/walk-complete')
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
      if (watchPositionIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchPositionIdRef.current)
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

  // 모달 관련 상태 추가
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false)
  const [walkSummary, setWalkSummary] = useState<{
    time: number
    distance: number
    coordinates: { lat: number; lng: number }[]
  } | null>(null)

  return (
    <S.MapContainer>
      <S.Map id='map' />
      {locationError && <S.LocationErrorMessage>{locationError}</S.LocationErrorMessage>}
      {showCenterButton && (
        <S.CenterButton onClick={handleCenterCurrentLocation}>
          <S.CenterIcon />내 위치로
        </S.CenterButton>
      )}

      {isWalking ? (
        <S.WalkControlContainer>
          <S.InfoBox>
            <S.InfoValue>{formatTime(walkTime)}</S.InfoValue>
          </S.InfoBox>

          <S.StyledActionButton
            onClick={handleWalkToggle}
            $type='capsule'
            $bgColor={isWalking ? 'font_1' : 'default'}
            $fontWeight='700'
            $isWalking={isWalking}
            disabled={isModalOpen} // 모달이 열려있을 때 버튼 비활성화
          >
            {isWalking ? '산책 끝' : '산책 시작'}
          </S.StyledActionButton>

          <S.InfoBox>
            <S.InfoValue>{formatDistance(estimatedDistance || walkDistance)}</S.InfoValue>
          </S.InfoBox>
        </S.WalkControlContainer>
      ) : (
        <S.WalkControlContainer style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <S.StyledActionButton
            onClick={handleWalkToggle}
            $type='capsule'
            $bgColor={isWalking ? 'font_1' : 'default'}
            $fontWeight='700'
            $isWalking={isWalking}
            disabled={isModalOpen} // 모달이 열려있을 때 버튼 비활성화
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
    </S.MapContainer>
  )
}
