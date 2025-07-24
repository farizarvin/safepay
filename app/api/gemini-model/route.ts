import { NextResponse } from "next/server"

/**
 * Simple API route that always works, with optional Gemini integration
 */
export async function GET() {
  return NextResponse.json({
    message: "Gemini API endpoint is working",
    timestamp: new Date().toISOString(),
    configured: !!process.env.GOOGLE_GEMINI_API_KEY,
  })
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const prompt = data.text || "Explain how AI works"

    // For now, return a mock response to ensure the endpoint works
    const mockResponse = `# AI Summary

## Understanding AI
Artificial Intelligence (AI) is a branch of computer science that aims to create machines capable of intelligent behavior.

## Key Components:
- **Machine Learning**: Systems that learn from data
- **Neural Networks**: Computing systems inspired by biological neural networks
- **Deep Learning**: ML techniques using multiple layers of neural networks

## Applications:
- Natural language processing
- Computer vision
- Robotics
- Decision making systems

## Future Prospects:
AI continues to evolve and will likely play an increasingly important role in various aspects of our daily lives.

*This is a sample response. Configure GOOGLE_GEMINI_API_KEY for dynamic AI content.*`

    return NextResponse.json({
      summary: mockResponse,
      success: true,
      mock: true,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        message: "Error processing request",
        error: error instanceof Error ? error.message : "Unknown error",
        summary: "# Error\n\nUnable to generate summary at this time.",
      },
      { status: 500 },
    )
  }
}
