import React, { createContext, useContext, useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

interface WebSocketContextType {
  client: Client | null
  isConnected: boolean
  subscribe: (destination: string, callback: (message: any) => void) => void
  publish: (destination: string, body: any) => void
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
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
      })
    }
  }

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
