'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSelect from './LanguageSelect';

export default function Header() {
  
 const t = useTranslations("Header")

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      {/* Left Side */}
      <div className="text-xl font-bold">
        <Link href="/">MyWebsite</Link>
      </div>

      {/* Right Side */}
      <nav className="flex gap-6 items-center">
        <Link href="/" className="hover:text-blue-600">{t('home')}</Link>
        <Link href="/about" className="hover:text-blue-600">{t('about')}</Link>
        <Link href="/contact" className="hover:text-blue-600">{t('contact')}</Link>
        <Link href="/create-post" className="hover:text-blue-600">Creat Post</Link>

        <LanguageSelect />
      
      </nav>
    </header>
  );
}
