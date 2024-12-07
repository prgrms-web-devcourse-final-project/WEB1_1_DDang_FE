import { Client } from '@stomp/stompjs'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { FetchChatMessageListResponse } from '~apis/chat/fetchChatMessageList'
import { useHomePageData } from '~apis/main/useHomePageData'
import { queryKey } from '~constants/queryKey'
import { APIResponse, CommonAPIResponse } from '~types/api'

interface WebSocketContextType {
  client: Client | null
  isConnected: boolean
  subscribe: (destination: string, callback: (message: any) => void) => void
  publish: (destination: string, body: any) => void
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

const token = localStorage.getItem('token')

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: { email },
  } = useHomePageData()
  const queryClient = useQueryClient()
  const [client, setClient] = useState<Client | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const SERVER_URL = 'https://ddang.shop/ws'

    const socket = new SockJS(SERVER_URL)
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('WebSocket 연결 성공')
        setIsConnected(true)
      },
      onStompError: frame => {
        console.error('Stomp 오류:', frame)
      },
      onWebSocketClose: () => {
        console.log('WebSocket 연결 종료')
        setIsConnected(false)
      },
    })

    stompClient.activate()
    setClient(stompClient)

    return () => {
      stompClient.deactivate()
    }
  }, [])

  const subscribe = (destination: string, callback: (message: any) => void) => {
    if (client && isConnected) {
      client.subscribe(destination, message => {
        callback(message)
      })
    }
  }

  const publish = (destination: string, body: any) => {
    if (client && isConnected) {
      client.publish({
        destination,
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
  }

  useEffect(() => {
    if (isConnected) {
      console.log('구독!')
      subscribe(`/user/queue/errors`, message => {
        const response = JSON.parse(message.body)
        console.log('에러 구독', response)
      })

      subscribe(`/sub/message/${email}`, message => {
        const response = JSON.parse(message.body) as {
          data: {
            chatRoomId: number
            unreadCount: number
          }[]
        }
        console.log('이메일 구독', response)
        response.data.forEach(chatRoom => {
          subscribe(`/sub/chat/${chatRoom.chatRoomId}`, message => {
            const res = JSON.parse(message.body) as APIResponse<
              Pick<
                CommonAPIResponse,
                'chatId' | 'createdAt' | 'updatedAt' | 'chatRoomId' | 'memberInfo' | 'isRead' | 'text'
              >
            >
            console.log('채팅방 구독', res)

            if (res.data.chatId)
              queryClient.setQueryData<InfiniteData<APIResponse<FetchChatMessageListResponse>>>(
                queryKey.social.chatMessageList(res.data.chatRoomId),
                oldData => {
                  if (!oldData) {
                    const initialPage: APIResponse<FetchChatMessageListResponse> = {
                      code: 200,
                      status: 'OK',
                      message: 'Success',
                      data: {
                        content: [res.data],
                        size: 1,
                        number: 0,
                        numberOfElements: 1,
                        first: true,
                        last: true,
                        empty: false,
                        sort: {
                          empty: true,
                          sorted: false,
                          unsorted: true,
                        },
                        pageable: {
                          offset: 0,
                          sort: {
                            empty: true,
                            sorted: false,
                            unsorted: true,
                          },
                          pageSize: 1,
                          paged: true,
                          pageNumber: 0,
                          unpaged: false,
                        },
                      },
                    }
                    return {
                      pages: [initialPage],
                      pageParams: [null],
                    }
                  }
                  return {
                    ...oldData,
                    pages: oldData.pages.map((page, index) => {
                      if (index === 0) {
                        return {
                          ...page,
                          data: {
                            ...page.data,
                            content: [...page.data.content, res.data],
                            numberOfElements: page.data.numberOfElements + 1,
                          },
                        }
                      }
                      return page
                    }),
                  }
                }
              )
          })
        })
      })
    }
  }, [isConnected])

  return (
    <WebSocketContext.Provider value={{ client, isConnected, subscribe, publish }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}
