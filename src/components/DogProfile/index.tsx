import * as S from './styles'
import { Typo13, Typo15, Typo20 } from '~components/Typo'
import { Separator } from '~components/Separator'
import Profile from '~components/Profile'
import { DogProfileType } from '~types/dogProfile'
import { MdOutlineModeEdit } from 'react-icons/md'
import { useModalStore } from '~stores/modalStore'
import EditDogProfileModal from '~modals/EditDogProfileModal'
import { calculateAge } from '~utils/calculateAge'

export default function DogProfile({ ...dogInfo }: DogProfileType) {
  const { dogId, name, gender, profileImg, birthDate, breed, comment } = dogInfo
  const age = calculateAge(birthDate!)
  const { pushModal } = useModalStore()
  return (
    <S.DogInfoArea>
      <S.DogInfoWrapper>
        <S.EditIconWrapper onClick={() => pushModal(<EditDogProfileModal dogId={dogId} />)}>
          <MdOutlineModeEdit size={20} />
        </S.EditIconWrapper>
        <Profile $size={80} $src={profileImg || ''} />
        <S.DogDetailWrapper>
          <S.TypoWrapper>
            <Typo20 $weight='700'>{name}</Typo20>
            <Typo15 $weight='400'>{breed}</Typo15>
            <Separator $height={8} />
            <Typo15 $weight='400'>{age}살</Typo15>
            <Separator $height={8} />
            <Typo15 $weight='400'>{gender === 'MALE' ? '남' : '여'}</Typo15>
          </S.TypoWrapper>
        </S.DogDetailWrapper>
      </S.DogInfoWrapper>
      <S.OneLineIntro>
        <Typo15 $weight='700' $color='default'>
          우리 댕댕이를 소개해요!
        </Typo15>
        <Typo13 $weight='500' style={{ lineHeight: 1.2 }}>
          {comment}
        </Typo13>
      </S.OneLineIntro>
    </S.DogInfoArea>
  )
}
