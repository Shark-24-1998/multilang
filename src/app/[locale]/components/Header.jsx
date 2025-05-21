'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageSelect from './LanguageSelect';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Blogify
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center text-sm text-gray-700 font-medium">
          <Link href="/" className="hover:text-black">{t('home')}</Link>
          <Link href="/about" className="hover:text-black">{t('about')}</Link>
          <Link href="/contact" className="hover:text-black">{t('contact')}</Link>
          <Link href="/create-post" className="hover:text-black">Create Post</Link>
          <Link href="/blog" className="hover:text-black">Blog</Link>
          <LanguageSelect />
        </nav>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3 bg-white border-t border-gray-200 shadow-sm">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block text-gray-700">{t('home')}</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-gray-700">{t('about')}</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="block text-gray-700">{t('contact')}</Link>
          <Link href="/create-post" onClick={() => setMenuOpen(false)} className="block text-gray-700">Create Post</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="block text-gray-700">Blog</Link>
          <LanguageSelect />
        </div>
      )}
    </header>
  );
}
