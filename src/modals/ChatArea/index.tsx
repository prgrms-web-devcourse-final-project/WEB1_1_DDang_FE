import useChatMessageList from '~apis/chat/useChatMessageList'
import { useHomePageData } from '~apis/main/useHomePageData'
import { IncomingMessage, OutgoingMessage } from '~components/Message'
import SendMessageForm from '~components/SendMessageForm'
import useObserver from '~hooks/useObserver'
import { useScrollPreservation } from '~hooks/useScrollPreservation'
import * as S from './styles'

type ChatAreaListProps = {
  chatRoomId: number
}

export default function ChatArea({ chatRoomId }: ChatAreaListProps) {
  const {
    data: { memberId },
  } = useHomePageData()
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useChatMessageList({ chatRoomId })
  const { elementRef: chatAreaRef, preserveScroll } = useScrollPreservation<HTMLDivElement>({ dependency: [data] })
  const { observerRef } = useObserver<HTMLDivElement>({
    callback: () => {
      if (hasNextPage && !isFetchingNextPage) {
        if (chatAreaRef.current) {
          preserveScroll()
        }
        fetchNextPage()
      }
    },
  })

  return (
    <S.ChatArea ref={chatAreaRef}>
      <S.ChatMessageList>
        {[...data.pages].reverse().map(page =>
          page.data.content.map(chat =>
            chat.memberInfo?.memberId === memberId ? (
              <OutgoingMessage
                key={chat.chatId}
                ref={
                  chat.createdAt === data.pages[data.pages.length - 1].data.content[0].createdAt ? observerRef : null
                }
              >
                {chat.text}
              </OutgoingMessage>
            ) : (
              <IncomingMessage
                key={chat.chatId}
                ref={
                  chat.createdAt === data.pages[data.pages.length - 1].data.content[0].createdAt ? observerRef : null
                }
              >
                {chat.text}
              </IncomingMessage>
            )
          )
        )}
      </S.ChatMessageList>
      <SendMessageForm chatRoomId={chatRoomId} />
    </S.ChatArea>
  )
}
