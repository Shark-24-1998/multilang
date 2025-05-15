"use client";
import { notFound } from "next/navigation";
import { useState } from "react";
import ShareMenu from "../../components/ShareMenu";
import CommentsSidebar from "../../components/Comments";

// Dummy blog data
const blogs = [
  {
    title: "Immutability in Data Flows for Safer, Simpler Code",
    subtitle: "How Immutable Data Improves Reasoning, Safety, and Testability",
    slug: "immutability-in-data-flows",
    author: "Rico Fritzsche",
    date: "2025-04-28",
    readTime: "11 min read",
    comments: 3,
    likes: 142,
    dislikes: 4,
    image:
      "https://images.pexels.com/photos/31840012/pexels-photo-31840012/free-photo-of-moody-misty-forest-path-in-ocypel-poland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `
      <p>In my <a href="#">previous article</a>, I demonstrated the power of a functional core architecture in Rust.</p>
      <p>This approach helps build safer and more testable code using immutable data.</p>
    `,
  },
  {
    title: "Next.js 15 Released!",
    description: "Explore the new features and improvements in Next.js 15.",
    slug: "nextjs-15-released",
    date: "2025-05-10",
    author: "John Doe",
    comments: 12,
    likes: 150,
    dislikes: 3,
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `
      <p>Next.js 15 introduces powerful new features including enhanced routing and server actions.</p>
      <p>This guide walks through what's new and how to migrate.</p>
    `,
  },
  {
    title: "Understanding React Server Components",
    description: "A complete guide to React Server Components in Next.js.",
    slug: "react-server-components-guide",
    date: "2025-04-22",
    author: "Jane Smith",
    comments: 8,
    likes: 95,
    dislikes: 2,
    image:
      "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `
      <p>React Server Components allow you to build apps with better performance and smaller bundles.</p>
      <p>Learn how they work and how to use them effectively.</p>
    `,
  },
];

export default function BlogDetail({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  const [likes, setLikes] = useState(blog?.likes || 0);
  const [dislikes, setDislikes] = useState(blog?.dislikes || 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [commentsList, setCommentsList] = useState([
    "Great article!",
    "Really helpful.",
    "Waiting for more posts.",
  ]);

  if (!blog) return notFound();

  const handleAddComment = (newComment) => {
    setCommentsList((prev) => [...prev, newComment]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      {/* Title and Subtitle */}
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <p className="text-xl text-gray-600 mt-2">{blog.subtitle}</p>

      {/* Author Section */}
      <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
        <div className="w-9 h-9 rounded-full bg-gray-300" />
        <span>{blog.author}</span>
        <span>• {blog.readTime}</span>
        <span>• {blog.date}</span>
      </div>

      {/* Reaction Row */}
      <div className="flex items-center gap-6 text-gray-500 text-sm mt-6 border-y py-4">
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => setLikes(likes + 1)}>
          <span>👍</span>
          <span>{likes}</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-gray-400" viewBox="0 0 24 24">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v14l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <span>{blog.comments}</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer" onClick={() => setDislikes(dislikes + 1)}>
          <span>👎</span>
          <span>{dislikes}</span>
        </div>

        <ShareMenu />
      </div>

      {/* Blog Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="rounded-xl mt-8 shadow-md object-cover"
        width={800}
        height={400}
      />

      {/* Blog Content */}
      <div
        className="prose max-w-none mt-6 text-gray-800"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Comments Sidebar Component */}
      <CommentsSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        comments={commentsList}
        addComment={handleAddComment}
      />
    </div>
  );
}
