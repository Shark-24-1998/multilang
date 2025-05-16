  "use client";

  import { useEditor, EditorContent } from "@tiptap/react";
  import StarterKit from "@tiptap/starter-kit";
  import Underline from "@tiptap/extension-underline";
  import Image from "@tiptap/extension-image";
  import { useRef, useState, useEffect } from "react";
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
            "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none w-full",
        },
      },
      immediatelyRender: false,
    });

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setShowImageDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result, width: "300" })
            .run();
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
      <div className="flex flex-col items-center w-full p-4 min-h-screen">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Editor</h2>

            {/* Toolbar on Desktop */}
            <div className="hidden md:flex mb-4">
              <Toolbar
                editor={editor}
                headingLevel={headingLevel}
                setHeadingLevel={setHeadingLevel}
                dropdownRef={dropdownRef}
                showImageDropdown={showImageDropdown}
                setShowImageDropdown={setShowImageDropdown}
                fileInputRef={fileInputRef}
                handleFileUpload={handleFileUpload}
              />
            </div>

            {/* Editor */}
                  <EditorContent
              editor={editor}
              className="border border-gray-200 rounded-lg p-4 bg-white min-h-[300px] shadow-inner focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all duration-200 w-full md:w-[650px] lg:w-[700px]"
            />
        
            

            {/* Toolbar on Mobile */}
            <div className="md:hidden mt-4">
              <Toolbar
                editor={editor}
                headingLevel={headingLevel}
                setHeadingLevel={setHeadingLevel}
                dropdownRef={dropdownRef}
                showImageDropdown={showImageDropdown}
                setShowImageDropdown={setShowImageDropdown}
                fileInputRef={fileInputRef}
                handleFileUpload={handleFileUpload}
              />
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={saveContent}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Toolbar = ({
    editor,
    headingLevel,
    setHeadingLevel,
    dropdownRef,
    showImageDropdown,
    setShowImageDropdown,
    fileInputRef,
    handleFileUpload,
  }) => {
    return (
      <div className="toolbar w-full bg-gray-100 rounded-lg p-2 flex flex-wrap gap-1 shadow-sm">
        <div className="relative">
          <button className="p-2 rounded hover:bg-gray-200 transition-colors">
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
          className={`p-2 rounded transition-colors ${
            editor.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <FaBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("underline") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <FaUnderline />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("bulletList") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <FaListUl />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("orderedList") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <FaListOl />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowImageDropdown(!showImageDropdown)}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
          >
            <FaImage />
          </button>
          {showImageDropdown && (
            <div className="absolute top-full mt-1 z-50 bg-white border shadow-lg rounded-md text-sm py-1 w-36">
              <button
                onClick={() => {
                  const url = window.prompt("Image URL");
                  if (url) {
                    editor.chain().focus().setImage({ src: url, width: "300" }).run();
                  }
                  setShowImageDropdown(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
              >
                +URL
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
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
    );
  };

  export default TextEditor;
