import { useEffect, useRef, useState } from 'react'
import useChatMessageList from '~apis/chat/useChatMessageList'
import { IncomingMessage, OutgoingMessage } from '~components/Message'
import SendMessageForm from '~components/SendMessageForm'
import useObserver from '~hooks/useObserver'
import * as S from './styles'

type ChatAreaListProps = {
  chatRoomId: number
}

export default function ChatArea({ chatRoomId }: ChatAreaListProps) {
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const [prevScrollHeight, setPrevScrollHeight] = useState(0)
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useChatMessageList({ chatRoomId })
  const { observerRef } = useObserver<HTMLDivElement>({
    callback: () => {
      if (hasNextPage && !isFetchingNextPage) {
        if (chatAreaRef.current) {
          setPrevScrollHeight(chatAreaRef.current.scrollHeight)
        }
        fetchNextPage()
      }
    },
  })

  useEffect(() => {
    if (chatAreaRef.current) {
      const { scrollHeight, scrollTop } = chatAreaRef.current
      const nextScrollTop = scrollHeight - prevScrollHeight + scrollTop
      chatAreaRef.current.scrollTop = nextScrollTop
    }
  }, [data, prevScrollHeight])

  return (
    <S.ChatArea ref={chatAreaRef}>
      <S.ChatMessageList>
        {[...data.pages].reverse().map(page =>
          page.data.content.map(chat =>
            chat.memberInfo.memberId === 15 ? (
              <OutgoingMessage
                key={chat.chatId}
                ref={
                  chat.createdAt === data.pages[data.pages.length - 1].data.content[0].createdAt ? observerRef : null
                }
              >
                {chat.text}
                <p>{chat.createdAt}</p>
              </OutgoingMessage>
            ) : (
              <IncomingMessage
                key={chat.chatId}
                ref={
                  chat.createdAt === data.pages[data.pages.length - 1].data.content[0].createdAt ? observerRef : null
                }
              >
                {chat.text}
                <p>{chat.createdAt}</p>
              </IncomingMessage>
            )
          )
        )}
      </S.ChatMessageList>
      <SendMessageForm chatCount={1} chatRoomId={chatRoomId} />
    </S.ChatArea>
  )
}
