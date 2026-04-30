import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

export async function POST(req: Request) {
  try {
    const { age, weight, goal, experience } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are an expert fitness coach at Fitness Bliss. Create a detailed workout and diet plan based on the user's data. Return the response as a JSON object with 'plan_name', 'summary', 'workouts' (array of {day, focus, exercises}), and 'diet_tips' (array of strings)." 
        },
        { 
          role: "user", 
          content: `Age: ${age}, Weight: ${weight}kg, Goal: ${goal}, Experience: ${experience}` 
        }
      ],
      response_format: { type: "json_object" }
    });

    const plan = JSON.parse(completion.choices[0].message.content || '{}');
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}
