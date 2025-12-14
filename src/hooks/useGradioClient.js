import { useRef } from 'react'
import { Client } from '@gradio/client'

export function useGradioClient(sourceType, backendURL) {
  const clientRef = useRef(null)
  const currentSourceRef = useRef(null)

  const connectClient = async () => {
    if (sourceType === 'colab') {
      const url = backendURL.trim()
      if (!url) return null

      if (clientRef.current && currentSourceRef.current === 'colab') {
        return clientRef.current
      }

      try {
        clientRef.current = await Client.connect(url)
        currentSourceRef.current = 'colab'
        return clientRef.current
      } catch (e) {
        console.error('Error connecting to Colab backend:', e)
        clientRef.current = null
        currentSourceRef.current = null
        return null
      }
    }

    if (sourceType === 'hf') {
      const url = 'eshan6704/backend'

      if (clientRef.current && currentSourceRef.current === 'hf') {
        return clientRef.current
      }

      try {
        clientRef.current = await Client.connect(url)
        currentSourceRef.current = 'hf'
        return clientRef.current
      } catch (e) {
        console.error('Error connecting to HF backend:', e)
        clientRef.current = null
        currentSourceRef.current = null
        return null
      }
    }

    return null
  }

  const fetchData = async (mode, reqType, name, date) => {
    if (!clientRef.current) {
      await connectClient()
    }

    if (!clientRef.current) {
      return ["<p style='color:red;'>Unable to connect to backend</p>"]
    }

    try {
      let result
      if (sourceType === 'hf') {
        result = await clientRef.current.predict('/fetch_data', [mode, reqType, name, date])
      } else {
        result = await clientRef.current.predict('/fetch_data', {
          mode,
          req_type: reqType,
          name,
          date_str: date
        })
      }

      if (!result || !result.data) {
        return ['<p>No data returned</p>']
      }

      if (Array.isArray(result.data[0])) {
        return result.data[0]
      }

      if (typeof result.data[0] === 'string') {
        return [result.data[0]]
      }

      return ['<p>Unexpected data format</p>']
    } catch (err) {
      console.error('Backend error:', err)
      return [`<p style='color:red;'>Backend error: ${err.message}</p>`]
    }
  }

  return { connectClient, fetchData }
}
