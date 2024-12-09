import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useWebSocket } from '~/WebSocketContext'
import { FetchChatMessageListResponse } from '~apis/chat/fetchChatMessageList'
import { useHomePageData } from '~apis/main/useHomePageData'
import { FetchNotificationListResponse } from '~apis/notification/fetchNotificationList'
import { queryKey } from '~constants/queryKey'
import { usePushNotificationStore } from '~stores/usePushNotificationStore'
import { APIResponse } from '~types/api'

export default function useSubscribe() {
  const {
    data: { email },
  } = useHomePageData()
  const { isConnected, subscribe } = useWebSocket()
  const queryClient = useQueryClient()
  const { showNotification } = usePushNotificationStore()
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
            const res = JSON.parse(message.body) as APIResponse<FetchChatMessageListResponse['content'][number]>
            console.log('채팅방 구독', res)
            queryClient.invalidateQueries({
              queryKey: queryKey.social.chatRoomList(),
            })
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

      subscribe(`sub/notification/${email}`, message => {
        const response = JSON.parse(message.body) as APIResponse<FetchNotificationListResponse['content'][number]>
        showNotification(response.data.content)
        console.log(response)
        queryClient.setQueryData<InfiniteData<APIResponse<FetchNotificationListResponse>>>(
          queryKey.notification(),
          oldData => {
            if (!oldData) {
              return {
                pages: [
                  {
                    code: 200,
                    status: 'OK',
                    message: 'Success',
                    data: {
                      content: [response.data],
                      pageable: {
                        offset: 0,
                        sort: { empty: true, sorted: false, unsorted: true },
                        pageSize: 1,
                        paged: true,
                        pageNumber: 0,
                        unpaged: false,
                      },
                      last: true,
                      size: 1,
                      number: 0,
                      sort: { empty: true, sorted: false, unsorted: true },
                      first: true,
                      numberOfElements: 1,
                      empty: false,
                    },
                  },
                ],
                pageParams: [0],
              }
            }

            return {
              ...oldData,
              pages: oldData.pages.map((page, index) =>
                index === 0
                  ? {
                      ...page,
                      data: {
                        ...page.data,
                        content: [response.data, ...page.data.content],
                        numberOfElements: page.data.numberOfElements + 1,
                      },
                    }
                  : page
              ),
            }
          }
        )
      })
    }
  }, [isConnected])
}
