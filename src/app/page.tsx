"use client";

import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import LeadForm from "@/components/LeadForm";
import { Button, Card, Col, Row, Input, Form, Tag } from "antd";
import { ArrowRightOutlined, CheckCircleOutlined, ThunderboltOutlined, UserOutlined, ArrowRightCircleHorizontal } from "@ant-design/icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

const heroImages = [
  "/images/hero-1.png",
  "/images/hero-2.png",
  "/images/hero-3.png"
];

const classes = [
  {
    title: "Yoga Flow",
    category: "Freestyle",
    image: "/images/yoga.png",
    desc: "Enhance flexibility, strength and mental clarity in our signature yoga sessions."
  },
  {
    title: "Body Pump",
    category: "High Intensity",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
    desc: "The original barbell class that strengthens your entire body and challenges your limits."
  },
  {
    title: "Power Lifting",
    category: "Strength",
    image: "/images/powerlifting.png",
    desc: "Master the big three lifts with expert guidance in our dedicated strength zones."
  }
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center px-4 md:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt="Gym Background"
              fill
              className={`object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-60" : "opacity-0"
              } scale-105`}
              priority={index === 0}
            />
          ))}
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-black via-black/40 to-transparent' : 'bg-gradient-to-r from-white via-white/40 to-transparent'}`} />
        </div>

        <div className="relative z-10 max-w-2xl">
          <Tag color="#ccff00" className="text-black font-bold mb-4 uppercase tracking-[0.2em] px-4 py-1">Welcome to Fitness Bliss</Tag>
          <h1 className="text-5xl md:text-8xl font-black mb-8 italic uppercase leading-none tracking-tighter">
            PUSH YOUR <br /><span className="text-primary italic">LIMITS</span> FURTHER
          </h1>
          <p className={`text-xl md:text-2xl mb-10 max-w-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Our range of Freestyle Group Training and signature classes are designed to take your fitness journey further.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary flex items-center justify-center gap-2">
              Find A Club <ArrowRightOutlined />
            </button>
            <button className={`px-10 py-3 font-bold border-2 transition-all uppercase text-sm tracking-widest ${isDarkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
              Explore Classes
            </button>
          </div>
        </div>
      </section>

      {/* Signature Classes Section */}
      <section className={`py-24 px-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black italic uppercase mb-2">Signature <span className="text-primary">Classes</span></h2>
              <div className="w-32 h-1 bg-primary" />
            </div>
            <a href="#" className="text-primary font-bold uppercase text-xs tracking-widest hover:underline flex items-center gap-2">
              View All Classes <ArrowRightOutlined />
            </a>
          </div>
          
          <Row gutter={[32, 32]}>
            {classes.map((cls, i) => (
              <Col xs={24} md={8} key={i}>
                <div className={`group cursor-pointer overflow-hidden border-b-4 border-transparent hover:border-primary transition-all duration-300 ${
                  isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="h-64 overflow-hidden relative">
                    <Image src={cls.image} alt={cls.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-primary text-black text-[10px] font-black px-2 py-1 uppercase">{cls.category}</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black mb-4 uppercase italic">{cls.title}</h3>
                    <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{cls.desc}</p>
                    <span className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                      Know More <ArrowRightOutlined />
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Try Us For Free (High Impact CTA) */}
      <section className="bg-primary py-24 text-center px-4">
        <div className="max-w-4xl mx-auto text-black">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-8">Experience Fitness Bliss</h2>
          <p className="text-xl md:text-2xl font-bold mb-12 opacity-80 uppercase tracking-tighter">
            Get a 1-Day free trial pass and see how our range of training and signature classes can take your fitness further.
          </p>
          <button className="bg-black text-white px-16 py-6 font-black uppercase italic text-xl hover:scale-105 transition-transform shadow-2xl">
            Get Your Free Pass
          </button>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-secondary' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={48} align="middle">
            <Col xs={24} md={12}>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight italic uppercase">
                Ready to <span className="text-primary underline decoration-4">Join</span> the Elite?
              </h2>
              <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Leave your details and our experts will help you find the perfect plan for your journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircleOutlined className="text-primary" />
                  <span>Personalized body composition analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleOutlined className="text-primary" />
                  <span>Access to all premium group classes</span>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12} className="mt-12 md:mt-0">
              <LeadForm />
            </Col>
          </Row>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t px-4 ${isDarkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter">FITNESS<span className="text-primary">BLISS</span></div>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-widest opacity-60">
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press Room</a>
            <a href="#">FAQ</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
            © 2026 FITNESS BLISS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      <Chatbot />
    </main>
  );
}
