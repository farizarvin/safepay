"use client"

import { Button } from "@/components/ui/button"
import { X, Send, Bot } from "lucide-react"

interface ChatbotSectionProps {
  onOpenChatbot: () => void
}

export default function ChatbotSection({ onOpenChatbot }: ChatbotSectionProps) {
  return (
    <section id="chatbot" className="relative z-10 min-h-screen flex items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center min-h-[80vh]">
          {/* Left Content - Chat Interface Preview */}
          <div className="relative flex justify-center animate-fade-in-left">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[380px] sm:max-w-[420px] hover:scale-105 transition-all duration-500 group">
              {/* Chat Header */}
              <div className="bg-[#0E1947] rounded-t-2xl p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#FF5F31] rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl sm:text-2xl">Safy</h3>
                </div>
                <X className="w-8 h-8 text-white border-2 border-white rounded-lg p-1 cursor-pointer hover:bg-white hover:text-[#0E1947] transition-colors" />
              </div>

              {/* Chat Messages Preview */}
              <div className="p-4 sm:p-5 space-y-4 h-[320px] sm:h-[350px] overflow-y-auto">
                {/* Bot Message */}
                <div className="flex justify-start animate-fade-in-up">
                  <div className="bg-[#FF5F31] text-white rounded-2xl rounded-bl-none px-5 py-3 max-w-[280px] hover:bg-[#EE4312] transition-colors">
                    <p className="text-sm sm:text-base">Hai kenalin aku Safy, Ada yang bisa saya bantu?</p>
                  </div>
                </div>
                {/* User Message */}
                <div className="flex justify-end animate-fade-in-up animation-delay-200">
                  <div className="bg-[#D9D9D9] text-[#0E1947] rounded-2xl rounded-br-none px-5 py-3 max-w-[280px] hover:bg-[#C9C9C9] transition-colors">
                    <p className="text-sm sm:text-base">
                      Saya lagi ada masalah keuangan nih, kira-kira sampean bisa bantu ndak?
                    </p>
                  </div>
                </div>
                {/* Bot Typing */}
                <div className="flex justify-start animate-fade-in-up animation-delay-400">
                  <div className="bg-[#FF5F31] text-white rounded-2xl rounded-bl-none px-5 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-100"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="bg-[#E8EBF0] rounded-b-2xl p-4 sm:p-5 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="flex-1 bg-transparent text-[#7D7D7D] text-sm sm:text-base outline-none"
                />
                <Send className="w-8 h-8 text-[#EE4312] border-2 border-[#EE4312] rounded-lg p-1 cursor-pointer hover:bg-[#EE4312] hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 text-center lg:text-right animate-fade-in-right">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Tanyakan ke Safy
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold italic leading-tight text-white/90">
                Apa Saja Mengenai Penipuan Online dan Kartu Kredit
              </p>
            </div>

            {/* Features */}
            <div className="bg-transparent border-2 border-[#EE4312] rounded-2xl p-6 sm:p-8 relative group hover:border-[#FF5F31] transition-colors duration-300">
              <div className="absolute inset-0 border-2 border-[#EE4312] rounded-2xl translate-x-[8px] translate-y-[-8px] group-hover:border-[#FF5F31] transition-colors duration-300"></div>
              <div className="relative z-10 space-y-6">
                <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight hover:scale-105 transition-transform duration-300">
                  Tanya Safy mengenai penipuan online payment dan kartu kredit
                </p>
                <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight hover:scale-105 transition-transform duration-300">
                  Dapatkan jawaban cepat dan informasi aman untuk melindungi diri
                </p>
                <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight hover:scale-105 transition-transform duration-300">
                  24/7 siap membantu kapan saja
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Button
                onClick={onOpenChatbot}
                className="w-full sm:w-auto sm:min-w-[320px] lg:min-w-[400px] h-[55px] bg-gradient-to-r from-[#EE4312] to-[#FF5F31] hover:from-[#FF5F31] hover:to-[#EE4312] rounded-full text-white font-semibold text-lg tracking-[0.07em] transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                TANYA KE Safy
                <Bot className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
