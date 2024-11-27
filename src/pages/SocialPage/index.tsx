import { useState } from 'react'
import { Typo15 } from '~components/Typo'
import FriendChatList from '~pages/SocialPage/components/FriendChatList'
import { ChatInfo, FriendInfo } from '~types/social'
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
      <FriendChatList selectedTab={selectedTab} chatList={chatList} friendList={friendList} />
    </S.SocialPage>
  )
}

const friendList: FriendInfo[] = [
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
  },
]
const chatList: ChatInfo[] = [
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    role: '이모',
    lastChat: '마지막 채팅 텍스트입니다',
    unreadChatCount: 15,
  },
]
