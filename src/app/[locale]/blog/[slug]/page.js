import { notFound } from "next/navigation";
import BlogClientPage from "./BlogClientPage";
import { generateSeo } from "../../utils/seoGenerator";

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
      <p>In my <a href="#">previous article</a>, I demonstrated the power of a functional core architecture in Rust.</p>
      <p>This approach helps build safer and more testable code using immutable data.</p>
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
      <p>In my <a href="#">previous article</a>, I demonstrated the power of a functional core architecture in Rust.</p>
      <p>This approach helps build safer and more testable code using immutable data.</p>
    `,
  },
  // ... other blogs
];

// ✅ Dynamic Metadata
export async function generateMetadata({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return notFound();

  return generateSeo({
    title: blog.title,
    description: blog.subtitle || blog.description,
    images: [
      {
        url: blog.image,
        width: 1200,
        height: 630,
        alt: blog.title,
      },
    ],
    metadataBase: new URL("https://multilang-nine.vercel.app/en"),
  });
}

// ✅ Server component (passes data to client)
export default function BlogPage({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return notFound();

  return <BlogClientPage blog={blog} />;
}
