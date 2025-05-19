'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSelect from './LanguageSelect';

export default function Header() {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm fixed top-0 left-0 w-full z-50 "
      style={{ backgroundColor: 'rgba(60, 116, 151, 0.8)' }} // light transparent background
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
          style={{ color: 'rgba(102, 182, 231, 0.96)' }}
        >
          Blogify
        </Link>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center text-gray-700 dark:text-gray-300 text-base font-medium">
          <Link href="/" className="hover:text-black">{t('home')}</Link>
          <Link href="/about" className="hover:text-black">{t('about')}</Link>
          <Link href="/contact" className="hover:text-black">{t('contact')}</Link>
          <Link href="/create-post" className="hover:text-black">Create Post</Link>
          <Link href="/blog" className="hover:text-[rgb(77,145,188)]">Blog</Link>
          <LanguageSelect />
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 space-y-2 shadow-md backdrop-blur-md border-t border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: 'rgba(60, 116, 151, 0.8)' }}
        >
          <Link href="/" onClick={() => setMenuOpen(false)} className="block text-white">{t('home')}</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-white">{t('about')}</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="block text-white">{t('contact')}</Link>
          <Link href="/create-post" onClick={() => setMenuOpen(false)} className="block text-white">Create Post</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="block text-white">Blog</Link>
          <LanguageSelect />
        </div>
      )}
    </header>
  );
}
