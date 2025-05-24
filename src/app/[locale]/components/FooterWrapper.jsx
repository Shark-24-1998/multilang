'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()

  // Example: pathname might be '/en/create-post' or '/fr/create-post'
  const isCreatePostPage = pathname?.match(/^\/[a-z]{2}(?:-[A-Z]{2})?\/create-post$/)

  return !isCreatePostPage ? <Footer /> : null
}
