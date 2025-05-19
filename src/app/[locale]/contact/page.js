"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    query: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        contact: "",
        query: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 py-10 bg-gradient-to-br from-gray-700 to-blue-500">
      <div className="w-full max-w-md rounded-lg p-6 sm:p-8 text-center border border-gray-700 backdrop-blur-md bg-white/10 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Get in Touch</h2>
        <p className="text-gray-300 mb-6 text-sm sm:text-base">
          {"We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
        </p>

        {isSubmitted && (
          <div className="bg-green-500/20 border border-green-500 rounded-md p-4 mb-6">
            <p className="text-green-300 font-medium">
             {" Thank you for your message! We'll be in touch soon."}
            </p>
          </div>
        )}

        {["name", "email", "contact"].map((field, index) => (
          <div key={index} className="relative border-b-2 border-gray-400 mb-6">
            <label
              className={`absolute ${
                formData[field] ? "text-sm -translate-y-[1.9rem] mb-1" : ""
              } left-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none transition-all duration-200`}
            >
              {`Enter your ${field === "contact" ? "contact number" : field}`}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full h-10 bg-transparent border-none outline-none text-base text-white autofill:bg-transparent"
              onFocus={(e) =>
                e.target.previousElementSibling.classList.add(
                  "text-sm",
                  "-translate-y-[1.9rem]",
                  "mb-1"
                )
              }
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.previousElementSibling.classList.remove(
                    "text-sm",
                    "-translate-y-[1.9rem]",
                    "mb-1"
                  );
                }
              }}
            />
          </div>
        ))}

        <div className="relative border-b-2 border-gray-400 mb-8">
          <label
            className={`absolute ${
              formData.query ? "text-sm -translate-y-[1.9rem] mb-1" : ""
            } left-0 top-8 -translate-y-1/2 text-gray-300 pointer-events-none transition-all duration-200`}
          >
            Enter your query
          </label>
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            required
            rows="4"
            className="w-full bg-transparent border-none outline-none text-base text-white pt-6 resize-none autofill:bg-transparent"
            onFocus={(e) =>
              e.target.previousElementSibling.classList.add(
                "text-sm",
                "-translate-y-[1.9rem]",
                "mb-1"
              )
            }
            onBlur={(e) => {
              if (!e.target.value) {
                e.target.previousElementSibling.classList.remove(
                  "text-sm",
                  "-translate-y-[1.9rem]",
                  "mb-1"
                );
              }
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-white text-gray-900 font-semibold py-3 px-5 rounded hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent transition-all duration-300"
        >
          Submit Message
        </button>
      </div>
    </div>
  );
}
