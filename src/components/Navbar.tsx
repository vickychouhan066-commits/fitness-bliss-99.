"use client";

import Link from "next/link";
import { Button } from "antd";
import { MenuOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isDarkMode ? 'bg-black/50 border-white/10' : 'bg-white/70 border-black/10'} backdrop-blur-md border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className={`text-2xl font-bold tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>
              FITNESS<span className="text-primary">BLISS</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/programs" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-primary transition-colors`}>Programs</Link>
              <Link href="/membership" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-primary transition-colors`}>Membership</Link>
              <Link href="/trainers" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-primary transition-colors`}>Trainers</Link>
              
              <Button 
                type="text" 
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} 
                onClick={toggleTheme}
                className={isDarkMode ? 'text-white' : 'text-black'}
              />
              
              <Button type="primary" className="rounded-full">Join Now</Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button 
              type="text" 
              icon={<MenuOutlined className="text-white text-xl" />} 
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 border-b border-white/10 p-4 space-y-4">
          <Link href="/programs" className="block text-gray-300 hover:text-primary">Programs</Link>
          <Link href="/membership" className="block text-gray-300 hover:text-primary">Membership</Link>
          <Link href="/trainers" className="block text-gray-300 hover:text-primary">Trainers</Link>
          <Link href="/contact" className="block text-gray-300 hover:text-primary">Contact</Link>
          <Button type="primary" block className="rounded-full">Join Now</Button>
        </div>
      )}
    </nav>
  );
}
