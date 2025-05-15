"use client";
import { useRouter } from "next/navigation";

const blogs = [
  {
    title: "Next.js 15 Released!",
    description: "Explore the new features and improvements in Next.js 15.",
    slug: "nextjs-15-released",
    date: "2025-05-10",
    author: "John Doe",
    comments: 12,
    likes: 150,
    dislikes: 3,
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
    image: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
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
            "//images.pexels.com/photos/31840012/pexels-photo-31840012/free-photo-of-moody-misty-forest-path-in-ocypel-poland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: `
      <p>In my <a href="#">previous article</a>, I demonstrated the power of a functional core architecture in Rust.</p>
      <p>This approach helps build safer and more testable code using immutable data.</p>
    `,
    },
];

export default function Blog() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 md:px-12 py-10 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div
            key={index}
            onClick={() => router.push(`/blog/${blog.slug}`)}
            className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-[220px]">
              <div>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm">{blog.description}</p>
              </div>
              <div className="mt-4 text-sm text-gray-500 flex flex-wrap justify-between items-center">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
              <div className="flex justify-end items-center mt-3 text-sm text-gray-600 gap-4">
                <div className="flex items-center gap-1">
                  {/* Comment Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 2H4C2.9 2 2 2.9 2 4v14l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                  {blog.comments}
                </div>
                <div className="flex items-center gap-1">
                  {/* Thumbs Up */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 20h2v-8H2v8zm20-9c0-.6-.4-1-1-1h-6.3l.9-4.5v-.2c0-.2-.1-.5-.3-.7L14 4l-6 6.2V19h10.1c.5 0 .9-.3 1-.8l2-7c.1-.1.1-.2.1-.2v-.1z" />
                  </svg>
                  {blog.likes}
                </div>
                <div className="flex items-center gap-1">
                  {/* Thumbs Down */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 4h-2v8h2V4zM2 13c0 .6.4 1 1 1h6.3l-.9 4.5v.2c0 .2.1.5.3.7l1.3 1.6 6-6.2V5H6.9c-.5 0-.9.3-1 .8l-2 7c-.1.1-.1.2-.1.2V13z" />
                  </svg>
                  {blog.dislikes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
