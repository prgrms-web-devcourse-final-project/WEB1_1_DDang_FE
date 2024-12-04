import { useState } from 'react'
import { Typo15 } from '~components/Typo'
import FriendChatList from '~pages/SocialPage/components/FriendChatList'
import * as S from './styles'

export default function SocialPage() {
  const [selectedTab, setSelectedTab] = useState<'friendList' | 'dangTalk'>('friendList')

  return (
    <S.SocialPage>
      <S.Header>
        <S.HeaderTypo $weight='700' $textAlign='center'>
          소셜
        </S.HeaderTypo>
        <S.TabArea>
          <S.Tab onClick={() => setSelectedTab('friendList')}>
            <Typo15 $textAlign='center' $weight='500' $color={selectedTab === 'friendList' ? 'font_1' : 'font_3'}>
              댕친 리스트
            </Typo15>
          </S.Tab>
          <S.Tab onClick={() => setSelectedTab('dangTalk')}>
            <Typo15 $textAlign='center' $weight='500' $color={selectedTab === 'friendList' ? 'font_3' : 'font_1'}>
              댕톡
            </Typo15>
          </S.Tab>
          <S.TabUnderBar $selectedTab={selectedTab} />
        </S.TabArea>
      </S.Header>
      <FriendChatList selectedTab={selectedTab} />
    </S.SocialPage>
  )
}
