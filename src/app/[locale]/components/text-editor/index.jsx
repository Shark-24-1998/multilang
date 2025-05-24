'use client'
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import React, { useState, useEffect } from "react";
import { Save, Send, CheckCircle, AlertCircle } from "lucide-react";
import MenuBar from "./menu-bar";

export default function TextEditor({ content = "", onChange = () => {} }) {
  const [title, setTitle] = useState("");
  const [saveStatus, setSaveStatus] = useState(""); // "saving", "saved", "error"
  const [publishStatus, setPublishStatus] = useState(""); // "publishing", "published", "error"
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc ml-6 space-y-1" } },
        orderedList: { HTMLAttributes: { class: "list-decimal ml-6 space-y-1" } },
        heading: {
          HTMLAttributes: {
            class: "font-bold text-gray-900",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "text-gray-700 leading-relaxed",
          },
        },
      }),
      TextAlign.configure({ 
        types: ["heading", "paragraph"] 
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg shadow-sm max-w-full h-auto",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "min-h-[300px] md:min-h-[400px] w-full bg-white rounded-xl border-0 px-3 md:px-6 py-3 md:py-4 focus:outline-none prose prose-sm md:prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-em:text-gray-700 prose-em:italic prose-ul:space-y-1 prose-ol:space-y-1 prose-li:text-gray-700 prose-img:rounded-lg prose-img:shadow-sm placeholder:text-gray-400",
        'data-placeholder': 'Start writing your blog post...',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      // Auto-save after 2 seconds of inactivity
      clearTimeout(window.autoSaveTimeout);
      window.autoSaveTimeout = setTimeout(() => {
        handleAutoSave();
      }, 2000);
    },
  });

  // Auto-save functionality
  const handleAutoSave = async () => {
    if (!editor || (!title.trim() && !editor.getText().trim())) return;
    
    setSaveStatus("saving");
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make your actual API call
      const postData = {
        title: title.trim(),
        content: editor.getHTML(),
        status: 'draft',
        updatedAt: new Date().toISOString()
      };
      
      console.log('Auto-saving draft:', postData);
      setSaveStatus("saved");
      
      // Clear status after 3 seconds
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  // Manual save draft
  const handleSaveDraft = async () => {
    if (!editor) return;
    
    setSaveStatus("saving");
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const postData = {
        title: title.trim() || 'Untitled Draft',
        content: editor.getHTML(),
        status: 'draft',
        savedAt: new Date().toISOString()
      };
      
      console.log('Saving draft:', postData);
      setSaveStatus("saved");
      
      // Clear status after 3 seconds
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error('Save failed:', error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  // Publish post
  const handlePublish = async () => {
    if (!editor || !title.trim()) {
      alert('Please add a title before publishing');
      return;
    }
    
    if (!editor.getText().trim()) {
      alert('Please add some content before publishing');
      return;
    }
    
    setPublishStatus("publishing");
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const postData = {
        title: title.trim(),
        content: editor.getHTML(),
        status: 'published',
        publishedAt: new Date().toISOString()
      };
      
      console.log('Publishing post:', postData);
      setPublishStatus("published");
      
      // Clear status after 5 seconds
      setTimeout(() => setPublishStatus(""), 5000);
    } catch (error) {
      console.error('Publish failed:', error);
      setPublishStatus("error");
      setTimeout(() => setPublishStatus(""), 3000);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (window.autoSaveTimeout) {
        clearTimeout(window.autoSaveTimeout);
      }
    };
  }, []);

  return (
    <div className="w-full relative pb-20 md:pb-0">
      
      {/* Title Input */}
      <div className="mb-4 md:mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog post title..."
          className="w-full text-xl md:text-2xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none pb-2 md:pb-3 placeholder:text-gray-400 transition-colors duration-200"
        />
      </div>

      {/* Desktop MenuBar */}
      <div className="hidden md:block relative z-50 mb-4">
        <MenuBar editor={editor} />
      </div>
      
      {/* Editor Container */}
      <div className="relative z-10 bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
        <EditorContent 
          editor={editor} 
          className="min-h-[300px] md:min-h-[400px] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-300 transition-all duration-200"
        />
      </div>

      {/* Mobile Bottom Toolbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
        <MenuBar editor={editor} isMobile={true} />
      </div>
      
      {/* Status Messages */}
      {(saveStatus || publishStatus) && (
        <div className="mt-4 flex items-center gap-2 relative z-10">
          {saveStatus === "saving" && (
            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Saving draft...</span>
            </div>
          )}
          {saveStatus === "saved" && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Draft saved successfully</span>
            </div>
          )}
          {saveStatus === "error" && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Failed to save draft</span>
            </div>
          )}
          
          {publishStatus === "publishing" && (
            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Publishing post...</span>
            </div>
          )}
          {publishStatus === "published" && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Post published successfully!</span>
            </div>
          )}
          {publishStatus === "error" && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Failed to publish post</span>
            </div>
          )}
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4 relative z-10">
        <button 
          onClick={handleSaveDraft}
          disabled={saveStatus === "saving"}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
        >
          <Save className="w-4 h-4" />
          {saveStatus === "saving" ? "Saving..." : "Save as Draft"}
        </button>
        
        <div className="flex gap-3 order-1 sm:order-2">
          <button 
            onClick={handlePublish}
            disabled={publishStatus === "publishing" || !title.trim()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none w-full sm:w-auto"
          >
            <Send className="w-4 h-4" />
            {publishStatus === "publishing" ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
}