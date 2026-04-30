import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, planName } = await req.json();

    // In a real scenario, you'd use the Razorpay Node.js SDK
    // const razorpay = new Razorpay({ key_id: '...', key_secret: '...' });
    // const order = await razorpay.orders.create({ amount: amount * 100, currency: 'INR' });

    // Mock order creation
    const mockOrder = {
      id: `order_${Math.random().toString(36).substring(7)}`,
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${planName.toLowerCase().replace(' ', '_')}`
    };

    return NextResponse.json(mockOrder);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
