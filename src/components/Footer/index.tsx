import { CgProfile } from 'react-icons/cg'
import { FaRegCalendarCheck } from 'react-icons/fa6'
import { IoMdPeople } from 'react-icons/io'
import { IoHomeSharp } from 'react-icons/io5'
import { MdOutlineFamilyRestroom } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import useChatList from '~apis/chatRoom/useChatList'
import { Typo11 } from '~components/Typo'
import * as S from './styles'

const FOOTER_NAV_LIST = [
  { Icon: IoHomeSharp, endpoint: '/', typo: '홈' },
  { Icon: FaRegCalendarCheck, endpoint: '/log', typo: '댕댕로그' },
  { Icon: IoMdPeople, endpoint: '/social', typo: '소셜' },
  {
    Icon: MdOutlineFamilyRestroom,
    endpoint: '/familyddang',
    typo: '패밀리댕',
  },
  { Icon: CgProfile, endpoint: '/mypage', typo: '내정보' },
]

export default function Footer() {
  //todo const location = useLocation() // location.pathname으로 url 감지하여, 아이콘 active 상태 활성화 할 예정
  const theme = useTheme()
  const navigate = useNavigate()

  const handleNavigation = (endpoint: string) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('로그인을 진행해 주세요')
      navigate('/login')
      return
    }
    navigate(endpoint)
  }
  const { data } = useChatList()
  let sum = 0
  data?.forEach(({ unreadMessageCount }) => {
    sum += unreadMessageCount
  })

  return (
    <S.Footer>
      <S.FooterNavList>
        {FOOTER_NAV_LIST.map(({ Icon, endpoint, typo }, index) => (
          <S.FooterNavItem
            key={index}
            to={endpoint}
            onClick={e => {
              e.preventDefault()
              handleNavigation(endpoint)
            }}
          >
            {typo === '소셜' && <S.ChatCount>{sum}</S.ChatCount>}
            <Icon color={theme.colors.brand.default} size={28} />
            <Typo11 $weight='500' $color='font_3'>
              {typo}
            </Typo11>
          </S.FooterNavItem>
        ))}
      </S.FooterNavList>
    </S.Footer>
  )
}
