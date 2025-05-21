'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageSelect from './LanguageSelect';
import { Menu, X, Home, Info, Mail, Edit, BookOpen } from 'lucide-react';

export default function Header() {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if page is scrolled to apply visual effects
      if (currentScrollY > 20) { 
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Always keep header visible for sticky behavior
      setShowHeader(true);
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (menuOpen) {
      const handleClickOutside = (e) => {
        if (!e.target.closest('.mobile-menu-container')) {
          setMenuOpen(false);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 transition hover:text-blue-600"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Blogify</span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mobile-menu-container"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink href="/" icon={<Home size={16} />} text={t('home')} />
            <NavLink href="/about" icon={<Info size={16} />} text={t('about')} />
            <NavLink href="/contact" icon={<Mail size={16} />} text={t('contact')} />
            <NavLink href="/create-post" icon={<Edit size={16} />} text="Create Post" />
            <NavLink href="/blog" icon={<BookOpen size={16} />} text="Blog" />
            <div className="ml-2 pl-2 border-l border-gray-200">
              <LanguageSelect />
            </div>
          </nav>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div 
        className={`md:hidden mobile-menu-container overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-2 bg-gray-50/90 backdrop-blur-sm">
          <MobileNavLink href="/" icon={<Home size={18} />} text={t('home')} onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/about" icon={<Info size={18} />} text={t('about')} onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/contact" icon={<Mail size={18} />} text={t('contact')} onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/create-post" icon={<Edit size={18} />} text="Create Post" onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/blog" icon={<BookOpen size={18} />} text="Blog" onClick={() => setMenuOpen(false)} />
          <div className="pt-2 mt-2 border-t border-gray-200">
            <LanguageSelect />
          </div>
        </div>
      </div>
    </header>
  );
}

// Desktop Navigation Link Component
function NavLink({ href, icon, text }) {
  return (
    <Link 
      href={href} 
      className="relative flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-blue-600 hover:bg-blue-50 transition-all group"
    >
      <span className="mr-1.5">{icon}</span>
      <span>{text}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ href, icon, text, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all"
    >
      <span className="mr-3 text-gray-500">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}