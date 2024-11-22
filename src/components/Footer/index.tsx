import { Link } from 'react-router-dom'
import * as S from './styles'
import { IoHomeSharp } from 'react-icons/io5'
import { useTheme } from 'styled-components'
import { FaRegCalendarCheck } from 'react-icons/fa6'
import { IoMdPeople } from 'react-icons/io'
import { Typo11 } from '~components/Typo'
import { MdOutlineFamilyRestroom } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

export default function Footer() {
  const theme = useTheme()
  const FOOTER_NAV_LIST = [
    { icon: <IoHomeSharp color={theme.colors.brand.default} size={28} />, endpoint: '/', typo: '홈' },
    { icon: <FaRegCalendarCheck color={theme.colors.brand.default} size={28} />, endpoint: '/log', typo: '댕댕로그' },
    { icon: <IoMdPeople color={theme.colors.brand.default} size={28} />, endpoint: '/walk', typo: '소셜' },
    {
      icon: <MdOutlineFamilyRestroom color={theme.colors.brand.default} size={28} />,
      endpoint: '/mypage',
      typo: '패밀리댕',
    },
    { icon: <CgProfile color={theme.colors.brand.default} size={28} />, endpoint: '/login', typo: '내정보' },
  ]

  return (
    <S.Footer>
      <S.FooterNavList>
        {FOOTER_NAV_LIST.map(({ icon, endpoint, typo }, index) => (
          <S.FooterNavItem key={index}>
            <Link to={endpoint}>{icon}</Link>
            <Typo11 weight='500' color='font_3'>
              {typo}
            </Typo11>
          </S.FooterNavItem>
        ))}
      </S.FooterNavList>
    </S.Footer>
  )
}
