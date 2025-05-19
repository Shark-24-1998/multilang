import AnimatedImage from "./components/AnimatedImage";
import BlogShowcaseSection from "./components/BlogSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mt-15 px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1
            className="text-3xl leading-snug md:text-4xl font-semibold"
            style={{ color: 'rgb(77, 145, 188)' }}
          >
            Build, share, and explore community-made <br className="hidden lg:block" /> components with Tailwind CSS
          </h1>

          <p className="mt-4 text-lg text-black">
            Discover open-source UI elements to kickstart your apps, projects, or websites —<br className="hidden lg:block" />
            all built with the power and flexibility of Tailwind CSS.
          </p>
        </div>

        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <AnimatedImage />
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12"></div>

      {/* Blog Section Box */}
      <section className="px-4 md:px-8">
        <div className="border border-gray-200 rounded-2xlpy-12 px-6 md:px-12">
          <BlogShowcaseSection />
        </div>
      </section>
      <section className="mt-10 py-20 bg-[rgb(77,145,188)]" >
        <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            What Our Users Say  
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Frontend Developer",
                feedback:
                  "This platform saved me hours! The Tailwind components are sleek, responsive, and easy to implement.",
              },
              {
                name: "Alex Green",
                role: "UI/UX Designer",
                feedback:
                  "I love the clean structure and creativity of this site. It’s my go-to for quick layout ideas.",
              },
              {
                name: "Maya Patel",
                role: "Full-Stack Engineer",
                feedback:
                  "Animations, transitions, everything just works so well together. Hats off to the team!",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <p className="text-gray-700 mb-4">“{testimonial.feedback}”</p>
                <div className="text-sm text-gray-500 font-medium">
                  — {testimonial.name}, {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>

  );
}
