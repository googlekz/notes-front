import { useEffect } from 'react'

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
): void => {
  useEffect(() => {
    if (textAreaRef != null) {
      textAreaRef.style.height = '0px'
      const scrollHeight: number = textAreaRef.scrollHeight

      textAreaRef.style.height = `${scrollHeight}px`
    }
  }, [textAreaRef, value])
}

export default useAutosizeTextArea
