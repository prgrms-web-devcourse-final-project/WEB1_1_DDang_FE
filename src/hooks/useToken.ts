import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function useToken() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('useToken 실행')
    const accessToken = searchParams.get('accessToken')
    if (accessToken) {
      localStorage.setItem('token', accessToken)
      console.log('토큰 가져옴(숨김처리 예정) : ', accessToken)
      //URL에서 토큰 파라미터 제거하고 홈페이지로 리다이렉트, JWT토큰이 URL에 노출되어 히스토리에 남지 않게 함
      window.history.replaceState({}, '', '/')
      return
    }

    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      console.log('토큰 없음 비로그인 상태. login페이지 이동.')
      navigate('/login')
      return
    }
  }, [searchParams, navigate])
}
