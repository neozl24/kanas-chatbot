import { useState } from 'react'
import { fetchAi } from '../utils/fetchAi'
import { Message, QianfanChatResp } from '../utils/types'

export const useMessages = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([])

  // current AI streaming output. null means not streaming
  const [streamText, setStreamText] = useState<string | null>(null)

  const submitInput = (content: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setStreamText('')

    let output = ''

    const onReceiveNewChunk = (chunk: QianfanChatResp) => {
      output += chunk.result
      setStreamText(output)

      if (chunk.is_end) {
        setMessages((currentMessages) => {
          return [...currentMessages, { role: 'assistant', content: output }]
        })
        setStreamText(null)
      }
    }

    fetchAi(url, newMessages, onReceiveNewChunk)
  }

  const total = [...messages]
  if (streamText !== null) {
    total.push({ role: 'assistant', content: streamText })
  }

  return {
    submitInput,
    messages: total,
  }
}