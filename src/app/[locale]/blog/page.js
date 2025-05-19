"use client";
import { useRouter } from "next/navigation";
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

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
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
  },
  {
    title: "Immutability in Data Flows for Safer, Simpler Code",
    subtitle:
      "How Immutable Data Improves Reasoning, Safety, and Testability",
    slug: "immutability-in-data-flows",
    author: "Rico Fritzsche",
    date: "2025-04-28",
    readTime: "11 min read",
    comments: 3,
    likes: 142,
    dislikes: 4,
    image:
      "//images.pexels.com/photos/31840012/pexels-photo-31840012/free-photo-of-moody-misty-forest-path-in-ocypel-poland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `...`,
  },
];

export default function Blog() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 md:px-12 py-20 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>

      {/* Mobile view: vertical list */}
      <div className="block md:hidden">
        {blogs.map((blog, index) => (
          <div key={index}>
            <div
              onClick={() => router.push(`/blog/${blog.slug}`)}
              className="cursor-pointer"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="py-4">
                <p className="text-sm text-gray-500">
                  By <span className="font-semibold">{blog.author}</span>
                </p>
                <h2 className="text-lg font-bold mt-1">{blog.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                  {blog.description}
                </p>
                
                {/* Updated mobile view: date and icons in one row */}
                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <div>{blog.date}</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <FaRegComment />
                      {blog.comments}
                    </div>
                    <div className="flex items-center gap-1">
                      <BiLike />
                      {blog.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <BiDislike />
                      {blog.dislikes}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal line between posts */}
            {index !== blogs.length - 1 && (
              <hr className="my-6 border-gray-300" />
            )}
          </div>
        ))}
      </div>

      {/* Desktop grid view */}
      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="p-4 flex flex-col justify-between min-h-[220px]">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  By <span className="font-semibold">{blog.author}</span>
                </p>
                <h2 className="text-lg font-bold mb-1">{blog.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {blog.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500 w-full">
                {/* Date on the left */}
                <span className="whitespace-nowrap">{blog.date}</span>

                {/* Icons on the right */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <FaRegComment className="text-base" />
                    <span>{blog.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BiLike className="text-base" />
                    <span>{blog.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BiDislike className="text-base" />
                    <span>{blog.dislikes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}