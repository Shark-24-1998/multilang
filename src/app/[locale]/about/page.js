import React from 'react';
import { PiPlantLight } from "react-icons/pi";
import { BsPersonStanding } from "react-icons/bs";
import { MdOutlineFindInPage } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { GoRocket } from "react-icons/go";

const About = () => {
  return (
    <section className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            About <span className="italic">This</span> Website
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-20 md:space-y-32 text-left md:text-right md:pt-10">
            <div className="mb-20 md:pr-8">
              <h3 className="font-medium mb-3 flex items-center md:justify-end">
                <PiPlantLight className="text-green-600 text-xl mr-2 md:order-2 md:ml-2 md:mr-0" />
                <span>Purpose of the Blog</span>
              </h3>
              <p className="text-gray-600 text-sm">
                This blog is a place to share insights, experiences, and ideas on topics that inspire us — from coding and creativity to community stories. Our goal is to spark curiosity and meaningful conversations.
              </p>

            </div>

            <div className="mb-6 md:pr-8">
              <h3 className="font-medium mb-3 flex items-center md:justify-end">
                <BsPersonStanding className="text-blue-600 text-xl mr-2 md:order-2 md:ml-2 md:mr-0" />
               <span>Who&apos;s Behind This</span>
              </h3>
              <p className="text-gray-600 text-sm">
                {"Hi! I'm the creator of this blog — passionate about building things with code and connecting with like-minded people. This project started as a simple idea and has grown into a platform for voices to be heard."}
              </p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col items-center">
            <div className="mb-6 text-center px-2 md:px-6">
              <h3 className="font-medium mb-3 flex items-center justify-center">
                <MdOutlineFindInPage className="text-yellow-600 text-xl mr-2" />
                <span>{"What You'll Find Here"}</span>
              </h3>
              <p className="text-gray-600 text-sm">
                {"Expect blog posts on development, tutorials, user-submitted stories, and more. It's a place for learning, sharing, and growing together."}
              </p>
            </div>

            <div className="relative flex justify-center mb-6">
              <img
                src="/images/about.png"
                alt="Blog community illustration"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-20 md:space-y-32 text-left md:pt-10">
            <div className="mb-20 md:pl-8">
              <h3 className="font-medium mb-3 flex items-center">
                <FaRegComments className="text-purple-600 text-xl mr-2" />
                <span>Join the Conversation</span>
              </h3>
              <p className="text-gray-600 text-sm">
               {" Love something you read? Leave a comment! Got something to share? Create your own post and be part of the blog's community."}
              </p>
            </div>

            <div className="mb-6 md:pl-8">
              <h3 className="font-medium mb-3 flex items-center">
                <GoRocket className="text-red-600 text-xl mr-2" />
                <span>{"What's Next"}</span>
              </h3>
              <p className="text-gray-600 text-sm">
               {"We're just getting started! Expect new features, more interaction, and even collaborations as this platform evolves."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto mt-16">
        This blog is a growing hub for curious minds, passionate creators, and everyday storytellers. Thanks for being part of the journey!
      </div>
    </section>
  );
};

export default About;