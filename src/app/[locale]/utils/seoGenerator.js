export function generateSeo({
  title = 'Tech Blog | Stay updated with the latest in web development',
  description = 'Explore insightful articles on Next.js, React, and modern web development trends. Stay current with best practices and expert advice.',
  images = [
    {
      url: '/blog_cover.png', // Update this to a relevant image in your public folder
      width: 1200,
      height: 630,
      alt: 'Tech Blog Cover'
    }
  ],
  siteName = 'DevBlog',
  metadataBase = new URL("https://multilang-nine.vercel.app/en"),
  type = 'article',
  locale = 'en_US'
} = {}) {
  return {
    title: {
      default: title,
      template: `%s - ${title.split('|')[0].trim()}`
    },
    description,
    metadataBase,
    openGraph: {
      title,
      description,
      images,
      type,
      siteName,
      locale
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images
    }
  };
}
