'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSelect from './LanguageSelect';

export default function Header() {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="p-4 shadow-md bg-background/50 backdrop-blur">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">MyWebsite</Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-blue-600">{t('home')}</Link>
          <Link href="/about" className="hover:text-blue-600">{t('about')}</Link>
          <Link href="/contact" className="hover:text-blue-600">{t('contact')}</Link>
          <Link href="/create-post" className="hover:text-blue-600">Create Post</Link>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <LanguageSelect />
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">{t('home')}</Link>

          <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">{t('about')}</Link>

          <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">{t('contact')}</Link>

          <Link href="/create-post" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Create Post</Link>

          <Link href="/blog" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Blog</Link>

          <LanguageSelect />
        </div>
      )}
    </header>
  );
}
