"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { useRef, useState, useEffect } from "react";
import './style.css'
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaHeading,
  FaImage,
} from "react-icons/fa";
import "./style.css";

const TextEditor = () => {
  const [headingLevel, setHeadingLevel] = useState(1);
  const [showImageDropdown, setShowImageDropdown] = useState(false);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[250px]",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowImageDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result, width: '300' }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const saveContent = () => {
    if (editor) {
      console.log(editor.getJSON());
    }
  };

  if (!editor) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl p-2">
        <h2>Editor</h2>
        <div className="flex space-x-2 mb-2">
          <div className="relative">
            <button className="p-2">
              <FaHeading />
            </button>
            <select
              value={headingLevel}
              onChange={(e) => {
                const level = Number(e.target.value);
                setHeadingLevel(level);
                editor.chain().focus().toggleHeading({ level }).run();
              }}
              className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <option key={level} value={level}>
                  H{level}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 ${editor.isActive("underline") ? "bg-gray-300" : ""}`}
          >
            <FaUnderline />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}
          >
            <FaListUl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}
          >
            <FaListOl />
          </button>

          {/* Image dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowImageDropdown(!showImageDropdown)}
              className="p-2"
            >
              <FaImage />
            </button>
            {showImageDropdown && (
              <div className="absolute top-full mt-1 z-50 bg-white border shadow-md rounded text-sm py-1 w-32">
                <button
                  onClick={() => {
                    const url = window.prompt("Image URL");
                    if (url) {
                      editor.chain().focus().setImage({ src: url, width: '300' }).run();
                    }
                    setShowImageDropdown(false);
                  }}
                  className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                >
                  +URL
                </button>
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                >
                  Upload Image
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            )}
          </div>
        </div>

        <EditorContent editor={editor} className="border rounded-lg p-4 bg-white min-h-[300px]" />

        <button
          onClick={saveContent}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TextEditor;