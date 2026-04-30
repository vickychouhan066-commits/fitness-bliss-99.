import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are Fitness Bliss AI, a helpful and motivating assistant for a premium gym. Your goal is to help users with their fitness questions, explain gym programs, and encourage them to join. Keep responses concise and high-energy." 
        },
        ...messages
      ],
    });

    return NextResponse.json({ content: response.choices[0].message.content });
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to get AI response' }, { status: 500 });
  }
}
