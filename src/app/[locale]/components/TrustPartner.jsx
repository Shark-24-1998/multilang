// components/TrustPartnerSection.js
import {
  FaCogs,
  FaRocket,
  FaChartLine,
  FaChartPie,
  FaProjectDiagram,
  FaSyncAlt,
} from "react-icons/fa";

const features = [
  { icon: FaCogs, label: "Above-And-Beyond Account Management", color: "bg-yellow-100 text-yellow-600" },
  { icon: FaRocket, label: "Publish-Ready Articles", color: "bg-purple-100 text-purple-600" },
  { icon: FaChartLine, label: "Data-Driven Strategy", color: "bg-blue-100 text-blue-600" },
  { icon: FaChartPie, label: "Analytics, Graphics & More", color: "bg-sky-100 text-sky-600" },
  { icon: FaProjectDiagram, label: "Bespoke Workflows and Tailored Solutions", color: "bg-green-100 text-green-600" },
  { icon: FaSyncAlt, label: "Content Update", color: "bg-pink-100 text-pink-600" },
];

export default function TrustPartner() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Features */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Background Circle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 bg-gray-100 rounded-full opacity-30"></div>
          </div>
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative z-10 bg-white shadow-sm p-4 rounded-xl flex items-center gap-3"
              >
                <div className={`p-2 rounded-full ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Text */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-snug">
            Everything you need from{" "}
            <br className="hidden md:inline" />
            one trusted partner
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Tailored to your unique goals and needs, our comprehensive
            solutions include SEO content strategy, topic-expert writing,
            professional editing, performance monitoring, content updates, and
            more.
          </p>
        </div>
      </div>
    </section>
  );
}
