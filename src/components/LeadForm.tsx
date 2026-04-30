"use client";

import { Form, Input, Button, message } from "antd";
import { useState } from "react";

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (data.success) {
        message.success("Success! We'll contact you shortly.");
        form.resetFields();
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error: any) {
      message.error(error.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl text-black shadow-[0_0_50px_rgba(204,255,0,0.2)]">
      <h3 className="text-2xl font-bold mb-6 text-center">JOIN THE REVOLUTION</h3>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item 
          name="name" 
          label={<span className="font-semibold">Full Name</span>}
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input size="large" placeholder="John Doe" />
        </Form.Item>
        <Form.Item 
          name="phone" 
          label={<span className="font-semibold">Phone Number</span>}
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input size="large" placeholder="+91 98765 43210" />
        </Form.Item>
        <Form.Item 
          name="goal" 
          label={<span className="font-semibold">Fitness Goal</span>}
        >
          <Input.TextArea size="large" placeholder="What do you want to achieve?" rows={3} />
        </Form.Item>
        <Button 
          type="primary" 
          size="large" 
          block 
          htmlType="submit"
          loading={loading}
          className="h-14 text-lg mt-4"
        >
          Get My Free Pass
        </Button>
      </Form>
    </div>
  );
}
