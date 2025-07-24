"use client"

import { useState, useRef, useEffect, type KeyboardEvent as ReactKeyboardEvent, type ChangeEvent } from "react"
import { X, Send, Bot } from "lucide-react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Halo, saya Safy. Ada yang bisa saya bantu?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("API response failed.")

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Maaf, saya tidak bisa memberikan respons saat ini.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-5 right-5 w-full max-w-md h-[90vh] max-h-[700px] flex flex-col z-50 animate-slide-up">
      <div className="bg-[#0E1947]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col h-full overflow-hidden hover:shadow-3xl transition-all duration-300">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/20 flex-shrink-0 bg-gradient-to-r from-[#EE4312] to-[#FF5F31]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
              <Bot className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h3 className="text-white font-bold text-xl">Safy</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div ref={scrollAreaRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex items-end gap-3 animate-fade-in-up ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-sm transition-all duration-300 hover:scale-105 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-[#D9D9D9] to-[#C9C9C9] text-[#FF5F31] rounded-br-none shadow-lg"
                    : "bg-gradient-to-r from-[#FF5F31] to-[#EE4312] text-white rounded-bl-none shadow-lg"
                }`}
              >
                <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-end gap-3">
                <div className="bg-gradient-to-r from-[#FF5F31] to-[#EE4312] text-white rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 flex items-center gap-3 border-t border-white/20 flex-shrink-0 bg-[#0E1947]/50">
          <input
            type="text"
            placeholder="Ketik pesan Anda..."
            value={input}
            disabled={isLoading}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-white/10 text-white placeholder:text-white/50 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#FF5F31] transition-all duration-300 hover:bg-white/15"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#EE4312] border-2 border-[#EE4312] rounded-lg cursor-pointer hover:bg-[#EE4312] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
