import styled from 'styled-components'

type ProfileProps = {
  $size: number
  $src: string
  $userId?: string
}

export const Profile = styled.div<ProfileProps>`
  width: ${({ $size }) => $size + 'px'};
  height: ${({ $size }) => $size + 'px'};
  background: url(${({ $src }) => $src}) center/cover ${({ theme }) => theme.colors.brand.sub};
  cursor: ${({ $userId }) => ($userId ? 'pointer' : 'default')};
  border-radius: 50%;
`
