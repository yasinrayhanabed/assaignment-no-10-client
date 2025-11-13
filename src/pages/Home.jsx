import { Link } from "react-router-dom";
import { FaUserTie, FaClock, FaDollarSign, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  const { data: featuredCourses = [], isLoading } = useQuery({
    queryKey: ["featuredCourses"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/courses/featured");
      if (!response.ok) throw new Error("Failed to fetch featured courses");
      return response.json();
    },
  });

  const popularCourses = [
    {
      _id: "1",
      title: "Complete React Development Course",
      description:
        "Master React from basics to advanced concepts. Build real-world projects and learn modern React patterns.",
      image:
        "https://i.ibb.co.com/SXzrFH67/react-js-inscription-against-laptop-and-code-background-learn-react-programming-language-computer-co.jpg",
      price: 89,
      duration: 12,
      instructor: { name: "John Smith" },
      category: "Web Development",
      rating: 4.8,
      enrolled: 1250,
    },
    {
      _id: "2",
      title: "Python for Data Science",
      description:
        "Learn Python programming for data analysis, visualization, and machine learning with hands-on projects.",
      image: "https://i.ibb.co.com/v6qd0KQJ/pythom-data-science.webp",
      price: 75,
      duration: 10,
      instructor: { name: "Sarah Johnson" },
      category: "Data Science",
      rating: 4.9,
      enrolled: 980,
    },
    {
      _id: "3",
      title: "UI/UX Design Masterclass",
      description:
        "Create stunning user interfaces and experiences. Learn design principles, prototyping, and user research.",
      image:
        "https://i.ibb.co.com/vvjB7KDW/images-q-tbn-ANd9-Gc-Rhf-OQKOixn45-CBe-Tn-Xq-PDJCDFd-ADC1-Tx-Flfg-s.jpg",
      price: 95,
      duration: 8,
      instructor: { name: "Mike Wilson" },
      category: "Design",
      rating: 4.7,
      enrolled: 750,
    },
  ];

  const instructors = [
    {
      id: 1,
      name: "John Doe",
      expertise: "React Developer",
      rating: 4.9,
      image: "https://i.ibb.co.com/jPz5Pxkn/speaker3-min.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      expertise: "Python Expert",
      rating: 4.8,
      image:
        "https://i.ibb.co.com/YqMPVYb/images-q-tbn-ANd9-Gc-RMYR0-TAT4x-CZgg-7cv-Ds2g-H02s-MGHAIb-FDYQ-s.jpg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      expertise: "UI/UX Designer",
      rating: 4.7,
      image:
        "https://i.ibb.co.com/V0nGpT4g/images-q-tbn-ANd9-Gc-Tvv-L76q808x9p-Jl7tnl-A77tqj-2ei0ri-Y5-KQ-s.jpg",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      expertise: "Data Scientist",
      rating: 4.9,
      image:
        "https://i.ibb.co.com/MDVJXpbz/young-people-eating-berries-street-23-2150163636.jpg",
    },
  ];

  return (
    <div
      className={`pt-16 transition-colors duration-300 ${
        isDark ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section
        className="text-white py-24 relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/FbFXK72z/group-three-young-good-looking-startupers-sitting-light-coworking-space-talking-about-future-project.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empower Your Learning Journey
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-10 text-white/90 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover world-class courses from expert instructors
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/courses"
              className="btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white border-none px-10 py-4 text-lg font-medium transition-transform duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Popular Courses */}
      <section
        className={`py-20 ${
          isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            data-aos="fade-up"
          >
            Popular Courses
          </motion.h2>

          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="text-4xl" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {(featuredCourses.length > 0
                  ? featuredCourses.slice(0, 3)
                  : popularCourses
                ).map((course, index) => (
                  <motion.div
                    key={course._id}
                    className={`group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border ${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-100"
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-[#F59E0B] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ${course.price}
                      </div>
                      <div className="absolute top-4 left-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        {course.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h2
                        className={`text-xl font-bold mb-3 line-clamp-2 ${
                          isDark
                            ? "text-white group-hover:text-[#60A5FA]"
                            : "text-[#1F2937] group-hover:text-[#3B82F6]"
                        }`}
                      >
                        {course.title}
                      </h2>
                      <p
                        className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {course.description}
                      </p>

                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                          {course.instructor?.name?.charAt(0) || "I"}
                        </div>
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              isDark ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            {course.instructor?.name || "Expert Instructor"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Course Instructor
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                        <div>{course.duration} weeks</div>
                        <div>{course.enrolled} students</div>
                        <div className="flex items-center">
                          <FaStar className="text-[#F59E0B] mr-1" />{" "}
                          {course.rating}
                        </div>
                      </div>

                      <Link
                        to={`/courses/${course._id}`}
                        className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 🔹 View All Courses Button */}
              <div className="text-center mt-16">
                <Link
                  to="/courses"
                  className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-4 px-10 rounded-xl text-lg transition-transform duration-300 hover:scale-105 shadow-lg"
                >
                  View All Courses →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className={`py-20 ${
          isDark ? "bg-gray-950 text-gray-100" : "bg-[#F8FAFC] text-[#1F2937]"
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            data-aos="fade-up"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaUserTie />,
                title: "Expert Mentors",
                desc: "Learn from industry professionals with years of experience",
              },
              {
                icon: <FaClock />,
                title: "Flexible Schedule",
                desc: "Study at your own pace with 24/7 access to materials",
              },
              {
                icon: <FaDollarSign />,
                title: "Affordable Learning",
                desc: "Quality education at competitive prices",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`text-center p-10 rounded-xl shadow-md hover:shadow-lg transition-shadow ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
                data-aos="zoom-in"
                data-aos-delay={100 * (i + 1)}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl text-[#F59E0B] mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Instructors */}
      <section className={`py-20 ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            data-aos="fade-up"
          >
            Top Instructors
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                className={`card p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
                data-aos="flip-left"
                data-aos-delay={index * 100}
              >
                <figure className="px-10 pt-10">
                  <motion.img
                    src={instructor.image}
                    alt={instructor.name}
                    className="rounded-full w-32 h-32 object-cover"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                </figure>
                <div className="card-body items-center text-center pb-10">
                  <h3 className="card-title font-bold">{instructor.name}</h3>
                  <p className="text-gray-400">{instructor.expertise}</p>
                  <div className="flex items-center mt-3 justify-center">
                    <FaStar className="text-[#F59E0B] mr-1" />
                    <span className="font-medium">{instructor.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
