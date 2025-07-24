import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-001",
})

interface Message {
    role: "user" | "assistant"
    content: string
}

interface ChatRequest {
    message: string
    history: Message[]
    context?: {
        articleTitle?: string
        articleContent?: string
    }
}

export async function POST(req: Request) {
    try {
        const { message, history, context }: ChatRequest = await req.json()

        // Build conversation context - Baca artikel dan bisa jawab general tentang topiknya
        let systemPrompt = `Kamu adalah Safy, AI assistant untuk SafePay.AI yang membantu pengguna memahami tentang penipuan online, fraud kartu kredit, dan keamanan pembayaran digital. Jawabannya harus santai, jelas, dan penuh semangat, seperti ngobrol dengan sahabat. Gunakan bahasa yang mudah dicerna dan maksimal 50 kata per respons. Jangan terlalu formal atau seperti robot.

PENTING:
- Jawaban maksimal 20 kata
- Fokus pada topik penipuan online, fraud kartu kredit, dan keamanan pembayaran
- Berikan tips praktis dan mudah dipahami
- Jika pertanyaan di luar topik, arahkan kembali ke tema keamanan digital
- Gunakan bahasa Indonesia yang santai dan ramah`
        // If no Gemini API key, return mock response
        if (!process.env.GOOGLE_GEMINI_API_KEY) {
            const mockResponses = [
                "Hai! Saya Safy dari SafePay.AI. Siap bantu kamu soal keamanan digital dan penipuan online. Ada yang mau ditanya?",
                "Halo! Mau tahu cara melindungi diri dari penipuan online? Atau ada masalah keamanan pembayaran digital?",
                "Wah, ada yang butuh bantuan soal fraud kartu kredit atau penipuan online? Yuk cerita ke Safy!",
            ]
            const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]

            return NextResponse.json({
                response: randomResponse,
                mock: true,
            })
        }

        try {
            // Build conversation history for Gemini
            const conversationHistory = history
                .slice(-10) // Keep last 10 messages for context
                .map((msg) => `${msg.role === "user" ? "User" : "Safy"}: ${msg.content}`)
                .join("\n")

            const fullPrompt = `${systemPrompt}

User: ${message}

INGAT: 
- Jawab maksimal 20 kata saja!
- Fokus pada keamanan digital dan penipuan online!
- Berikan tips praktis yang mudah dipahami!`

            // Generate response from Gemini
            const response = await model.generateContent(fullPrompt)
            const reply = response.response.text()

            return NextResponse.json({
                response: reply,
                mock: false,
            })
        } catch (error) {
            console.error("Error generating response from Gemini:", error)
            return NextResponse.json({
                response: "Waduh ada error nih. Coba tanya tentang keamanan digital atau penipuan online lagi ya!",
                mock: false,
            })
        }
    } catch (error) {
        console.error("Error parsing request:", error)
        return NextResponse.json({
            response: "Ada masalah teknis. Tanya tentang penipuan online atau keamanan kartu kredit dong!",
            mock: false,
        })
    }
}
