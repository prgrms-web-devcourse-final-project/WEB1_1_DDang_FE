import styled from 'styled-components'

type ProfileProps = {
  $size: number
  $src: string
}
export const Profile = styled.div<ProfileProps>`
  width: ${({ $size }) => $size + 'px'};
  height: ${({ $size }) => $size + 'px'};
  background: url(${({ $src }) => $src}) center/cover ${({ theme }) => theme.colors.grayscale.gc_4};
  border-radius: 50%;
`
