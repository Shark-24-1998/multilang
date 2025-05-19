'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const blogs = [
  {
    title: 'Next.js 15 Released!',
    description: 'Explore the new features and improvements in Next.js 15.',
    slug: 'nextjs-15-released',
    author: 'John Doe',
    date: '2025-05-10',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
  },
  {
    title: 'React Server Components Explained',
    description: 'Everything you need to know about RSC in production.',
    slug: 'react-server-components',
    author: 'Jane Smith',
    date: '2025-04-22',
    image: 'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg',
  },
  {
    title: 'Immutable Data for Safer Code',
    description: 'Improve safety and testability using immutable data.',
    slug: 'immutability-in-data-flows',
    author: 'Rico Fritzsche',
    date: '2025-04-28',
    image: 'https://images.pexels.com/photos/3184012/pexels-photo-3184012.jpeg',
  },
];

const BlogShowcaseSection = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-lg w-full order-2 lg:order-1">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'rgb(77, 145, 188)' }}>
            Latest Insights
          </h2>
          <p className="text-gray-600 mb-6">
            Discover fresh tutorials and insights from our blog. Stay current with Next.js,
            React, and modern web development.
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="bg-black text-white px-6 py-3 rounded-md transition hover:bg-[#4d91bc]"
          >
            View all posts
          </button>
        </div>

        <div className="relative w-full max-w-md h-[320px] mx-auto order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 bg-white rounded-xl shadow-lg cursor-pointer p-4 flex flex-col"
              onClick={() => router.push(`/blog/${blogs[index].slug}`)}
            >
              <img
                src={blogs[index].image}
                alt={blogs[index].title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-black">{blogs[index].title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                {blogs[index].description}
              </p>
              <span className="text-sm text-gray-400 mt-auto">{blogs[index].date}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BlogShowcaseSection;
