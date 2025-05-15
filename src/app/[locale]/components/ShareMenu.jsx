"use client";
import { useState, useEffect, useRef } from "react";

export default function ShareMenu() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link copied!");
    } catch (err) {
      alert("Failed to copy");
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center gap-1 cursor-pointer hover:text-gray-800"
        onClick={() => setShow(!show)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-gray-400" viewBox="0 0 24 24">
          <path d="M18 2h-8l-6 6v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Share</span>
      </div>

      {show && (
        <div className="absolute top-8 left-0 bg-white border rounded-md shadow-md p-3 z-10 text-sm text-gray-700 space-y-2 w-44">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-2 py-1 rounded hover:bg-gray-100"
          >
            Share on Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-2 py-1 rounded hover:bg-gray-100"
          >
            Share on Facebook
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-2 py-1 rounded hover:bg-gray-100"
          >
            Share on LinkedIn
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-2 py-1 rounded hover:bg-gray-100"
          >
            Share on WhatsApp
          </a>
          <button
            onClick={handleCopy}
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-100"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
