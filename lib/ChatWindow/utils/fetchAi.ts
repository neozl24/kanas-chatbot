import { Message, QianfanChatResp } from './types'

type HandleResp = (_chunk: QianfanChatResp) => void

export const fetchAi = async (
  url: string,
  messages: Message[],
  handleResp?: HandleResp
) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  })
  if (!res.body) {
    throw new Error('no response')
  }

  const reader = res.body
    .pipeThrough(new TextDecoderStream()) // transform Uint8Array to string
    .getReader()

  while (true) {
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    const { done, value } = await reader.read()
    if (done) {
      // stream end
      break
    }
    if (value) {
      try {
        const chunk = JSON.parse(value)
        handleResp?.(chunk)
      } catch (error) {
        console.error(error)
      }
    }
  }
}