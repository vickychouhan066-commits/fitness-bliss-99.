"use client";

import { useState } from "react";
import { Button, Input, List, Avatar } from "antd";
import { RobotOutlined, SendOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am your Fitness Bliss AI assistant. How can I help you reach your goals today?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      
      const data = await response.json();
      
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-secondary border border-white/10 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] animate-slide-up">
          <div className="bg-primary p-4 flex justify-between items-center text-black">
            <div className="flex items-center gap-2">
              <RobotOutlined className="text-xl" />
              <span className="font-bold">Fitness Bliss AI</span>
            </div>
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              onClick={() => setIsOpen(false)} 
              className="hover:rotate-90 transition-transform"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar 
                    icon={m.role === 'user' ? <UserOutlined /> : <RobotOutlined />} 
                    className={m.role === 'user' ? 'bg-accent' : 'bg-primary'}
                  />
                  <div className={`p-3 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-primary/20 text-white rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl animate-pulse text-xs">AI is thinking...</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 flex gap-2">
            <Input 
              placeholder="Ask anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSend}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
            />
            <Button 
              type="primary" 
              icon={<SendOutlined />} 
              onClick={handleSend}
              disabled={loading}
            />
          </div>
        </div>
      ) : (
        <Button 
          type="primary" 
          shape="circle" 
          size="large" 
          icon={<RobotOutlined />} 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:scale-110 transition-transform"
        />
      )}
    </div>
  );
}
