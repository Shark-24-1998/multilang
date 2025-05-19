export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-gray-200 ">
      <div className="max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
        <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Build with Tailwind. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-black transition">Privacy</a>
          <a href="#" className="hover:text-black transition">Terms</a>
          <a href="#" className="hover:text-black transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
