import { useEffect, useState } from 'react'
import { Typo15 } from '~components/Typo'
import FriendChatList from '~pages/SocialPage/components/FriendChatList'
import { FriendInfo } from '~types/social'
import * as S from './styles'
import { fetchChatRoomList, FetchChatRoomListResponse } from '~apis/chatRoom/fetchChatRoomList'

export default function SocialPage() {
  const [selectedTab, setSelectedTab] = useState<'friendList' | 'dangTalk'>('friendList')
  const [chatList, setChatList] = useState<FetchChatRoomListResponse>([])

  useEffect(() => {
    fetchChatRoomList().then(data => setChatList(data.data))
  }, [])

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
    gender: 'FEMALE',
    userId: 12345,
    id: '1',
    role: '',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'FEMALE',
    userId: 12345,
    id: '2',
    role: '',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'FEMALE',
    userId: 12345,
    id: '3',
    role: '',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'FEMALE',
    userId: 12345,
    id: '4',
    role: '',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'FEMALE',
    userId: 12345,
    id: '5',
    role: '',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'FEMALE',
    userId: 12345,
    id: '6',
    role: '',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'FEMALE',
    userId: 12345,
    id: '7',
    role: '',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'FEMALE',
    userId: 12345,
    id: '8',
    role: '',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'FEMALE',
    userId: 12345,
    id: '9',
    role: '',
  },
  {
    profileImg: '',
    name: '감자탕수육',
    gender: 'FEMALE',
    userId: 12345,
    id: '10',
    role: '',
  },
]
