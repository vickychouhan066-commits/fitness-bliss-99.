"use client";

import Navbar from "@/components/Navbar";
import { Button, Card, Col, Row, Space, Tag, message } from "antd";
import { CheckCircleFilled, ThunderboltFilled, StarFilled } from "@ant-design/icons";
import { useState } from "react";

export default function MembershipPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: any) => {
    setLoading(plan.name);
    try {
      const amount = parseInt(plan.price.replace(/[₹,]/g, ''));
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, planName: plan.name }),
      });
      
      const order = await response.json();
      
      if (!order.id) throw new Error("Failed to create order");

      const options = {
        key: "YOUR_RAZORPAY_KEY", // Should be in env
        amount: order.amount,
        currency: order.currency,
        name: "Fitness Bliss",
        description: `Membership: ${plan.name}`,
        order_id: order.id,
        handler: function (response: any) {
          message.success("Payment Successful! Welcome to Fitness Bliss.");
          // Here you would call another API to update the DB
        },
        prefill: {
          name: "Guest User",
          email: "guest@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#ccff00",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      message.error(error.message || "Payment failed to initialize");
    } finally {
      setLoading(null);
    }
  };
  const plans = [
    {
      name: "Essential",
      price: "₹2,999",
      period: "/month",
      features: ["All Gym Equipment", "Locker Access", "Fitness Bliss App", "2 Group Classes/mo"],
      icon: <CheckCircleFilled className="text-gray-400 text-2xl" />,
      color: "border-gray-800"
    },
    {
      name: "Performance",
      price: "₹5,499",
      period: "/month",
      features: ["Everything in Essential", "Unlimited Classes", "AI Workout Generator", "Infrared Sauna", "Nutrition Tracking"],
      popular: true,
      icon: <ThunderboltFilled className="text-primary text-2xl" />,
      color: "border-primary shadow-[0_0_30px_rgba(204,255,0,0.2)]"
    },
    {
      name: "Ultimate",
      price: "₹9,999",
      period: "/month",
      features: ["Everything in Performance", "1-on-1 AI Training", "Cryotherapy Access", "Priority Support", "Guest Pass (2/mo)"],
      icon: <StarFilled className="text-accent text-2xl" />,
      color: "border-accent"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase mb-4">Choose Your <span className="text-primary">Tier</span></h1>
          <p className="text-xl text-gray-400">Flexible plans for every fitness journey.</p>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {plans.map((plan, i) => (
            <Col xs={24} lg={8} key={i}>
              <div className={`glass-card relative overflow-hidden h-full flex flex-col border-2 ${plan.color} transition-transform hover:scale-105`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Tag color="#ccff00" className="text-black font-bold m-4 px-4 py-1 rounded-full uppercase">Most Popular</Tag>
                  </div>
                )}
                
                <div className="mb-8">
                  {plan.icon}
                  <h3 className="text-3xl font-bold mt-4 uppercase italic">{plan.name}</h3>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300">
                      <CheckCircleFilled className="text-primary text-xs" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button 
                  type={plan.popular ? "primary" : "default"} 
                  size="large" 
                  block 
                  loading={loading === plan.name}
                  onClick={() => handleCheckout(plan)}
                  className={`h-14 font-bold text-lg rounded-xl ${!plan.popular && 'bg-white/5 border-white/20 text-white'}`}
                >
                  Get Started
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </main>
  );
}
