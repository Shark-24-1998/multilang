'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import LanguageSelect from './LanguageSelect';
import { Menu, X, Home, Info, Mail, Edit, BookOpen, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMobileMenuContent, setShowMobileMenuContent] = useState(true);
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  // Update scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 20) {
        setScrolled(true);
        setShowMobileMenuContent(false);
      } else {
        setScrolled(false);
        setShowMobileMenuContent(true);
      }
      
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
            <NavLink 
              href="/create-post" 
              icon={<Edit size={16} />} 
              text="Create Post" 
            />
            <NavLink href="/blog" icon={<BookOpen size={16} />} text="Blog" />
            <div className="ml-2 pl-2 border-l border-gray-200">
              <LanguageSelect />
            </div>
            <div className="ml-2 pl-2 border-l border-gray-200 flex items-center space-x-2">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              )}
            </div>
          </nav>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div 
        className={`md:hidden fixed inset-0 z-40 ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu container */}
        <div 
          className={`absolute right-0 top-0 h-full w-[300px] bg-white/95 backdrop-blur-sm shadow-2xl transition-all duration-500 ease-in-out transform ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu header - Always visible */}
          <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              {isSignedIn ? (
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9"
                    }
                  }}
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <User size={20} className="text-gray-500" />
                </div>
              )}
              {!scrolled && (
                <div className="flex flex-col">
                  {isSignedIn ? (
                    <>
                      <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                      <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                    </>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">Guest User</p>
                  )}
                </div>
              )}
            </div>
            {scrolled && (
              <div className="flex-1 text-center">
                <span className="text-xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Blogify</span>
                </span>
              </div>
            )}
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-2"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Menu content - Hidden on scroll */}
          <div className={`transition-all duration-300 ease-in-out h-[calc(100vh-64px)] overflow-y-auto ${
            showMobileMenuContent 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          >
            <div className="py-6 px-4">
              <nav className="flex flex-col gap-8">
                {/* Main Menu */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                    Main Menu
                  </h3>
                  <div className="flex flex-col gap-2">
                    <MobileNavLink 
                      href="/" 
                      icon={<Home size={18} />} 
                      text={t('home')} 
                      onClick={() => setMenuOpen(false)} 
                    />
                    <MobileNavLink 
                      href="/about" 
                      icon={<Info size={18} />} 
                      text={t('about')} 
                      onClick={() => setMenuOpen(false)} 
                    />
                    <MobileNavLink 
                      href="/contact" 
                      icon={<Mail size={18} />} 
                      text={t('contact')} 
                      onClick={() => setMenuOpen(false)} 
                    />
                  </div>
                </div>

                {/* Blog Menu */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                    Blog
                  </h3>
                  <div className="flex flex-col gap-2">
                    <MobileNavLink 
                      href="/blog" 
                      icon={<BookOpen size={18} />} 
                      text="Blog" 
                      onClick={() => setMenuOpen(false)} 
                    />
                    <MobileNavLink 
                      href="/create-post" 
                      icon={<Edit size={18} />} 
                      text="Create Post" 
                      onClick={() => setMenuOpen(false)} 
                    />
                  </div>
                </div>

                {/* Auth Section */}
                {!isSignedIn && (
                  <div className="space-y-3 mt-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                      Account
                    </h3>
                    <div className="flex flex-col gap-2">
                      <SignInButton mode="modal">
                        <button className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
                          <User size={18} className="mr-2 opacity-75" />
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all">
                          Sign Up
                        </button>
                      </SignUpButton>
                    </div>
                  </div>
                )}

                {/* Language Selector */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                    Language
                  </h3>
                  <div className="px-3">
                    <LanguageSelect />
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Desktop Navigation Link Component
function NavLink({ href, icon, text, onClick }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
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
      className="flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
    >
      <span className="mr-3.5 opacity-75">{icon}</span>
      <span className="font-medium">{text}</span>
    </Link>
  );
}