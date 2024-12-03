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
    userId: 'dummyUserId',
    id: '1',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    userId: 'dummyUserId',
    id: '2',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    userId: 'dummyUserId',
    id: '3',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    userId: 'dummyUserId',
    id: '4',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    userId: 'dummyUserId',
    id: '5',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    userId: 'dummyUserId',
    id: '6',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    userId: 'dummyUserId',
    id: '7',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    userId: 'dummyUserId',
    id: '8',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    userId: 'dummyUserId',
    id: '9',
    role: '이모',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'female',
    userId: 'dummyUserId',
    id: '10',
    role: '이모',
  },
]
const chatList: ChatInfo[] = [
  {
    name: '감자탕수육',
    chatRoomId: 14231,
    lastMessage: '마지막 채팅 텍스트입니다',
    unreadMessageCount: 15,
    members: [
      {
        memberId: 0,
        email: 'test@abc.com',
        name: 'NAME',
      },
    ],
    profileImg: '',
    role: '이모',
    gender: 'female',
  },
  {
    name: '감자탕수육',
    chatRoomId: 14231,
    lastMessage: '마지막 채팅 텍스트입니다',
    unreadMessageCount: 15,
    members: [
      {
        memberId: 0,
        email: 'test@abc.com',
        name: 'NAME',
      },
    ],
    profileImg: '',
    role: '이모',
    gender: 'female',
  },
]
