import {
  useState,
  useEffect,
  useMemo,
  useDeferredValue,
  useTransition,
} from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";

const Courses = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isPending, startTransition] = useTransition();
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Non-blocking search update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      startTransition(() => {
        setActiveSearchTerm(deferredSearchTerm);
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [deferredSearchTerm]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(value !== deferredSearchTerm);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearchTerm(searchTerm);
    setIsSearching(false);
  };

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

  const {
    data: apiCourses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses", activeSearchTerm, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeSearchTerm) params.append("search", activeSearchTerm);
      if (selectedCategory) params.append("category", selectedCategory);

      const response = await fetch(
        `https://online-learning-platform-server-orpin.vercel.app/courses?${params}`
      );
      if (!response.ok) throw new Error("Failed to fetch courses");
      return response.json();
    },
    onError: (error) => {
      toast.error("Failed to load courses");
      console.error("Error fetching courses:", error);
    },
  });

  const courses = useMemo(() => {
    return [...popularCourses, ...apiCourses].filter((course) => {
      const matchesSearch =
        !activeSearchTerm ||
        course.title.toLowerCase().includes(activeSearchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [apiCourses, activeSearchTerm, selectedCategory]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://online-learning-platform-server-orpin.vercel.app/categories"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories([
            ...new Set([...popularCourses.map((c) => c.category), ...data]),
          ]);
        } else {
          setCategories([...new Set(popularCourses.map((c) => c.category))]);
        }
      } catch {
        setCategories([...new Set(popularCourses.map((c) => c.category))]);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div
        className={`${
          isDark ? "bg-gray-900" : "bg-[#F8FAFC]"
        } min-h-screen pt-20 flex justify-center items-center transition-colors duration-300`}
      >
        <LoadingSpinner size="text-6xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${
          isDark ? "bg-gray-900" : "bg-[#F8FAFC]"
        } min-h-screen pt-20 transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 py-8">
          <div
            className={`alert alert-error shadow-lg rounded-lg ${
              isDark ? "bg-red-700 text-white" : "bg-[#EF4444] text-white"
            }`}
          >
            <span>Failed to load courses. Please try again later.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isDark ? "bg-gray-900 text-gray-100" : "bg-[#F8FAFC] text-gray-900"
      } min-h-screen pt-20 transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight">
          All Courses
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel */}
          <div className="lg:w-1/4">
            <div
              className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-6 border-b pb-2 ${
                  isDark
                    ? "text-gray-100 border-gray-600"
                    : "text-[#1F2937] border-gray-200"
                }`}
              >
                Filter Courses
              </h3>
              <div className="space-y-5">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Search
                  </label>
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search courses..."
                        className={`w-full px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border ${
                          isDark
                            ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
                            : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                        }`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      {(isSearching || isPending) && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      {!isSearching && !isPending && searchTerm && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg
                            className="w-4 h-4 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {isPending
                        ? "Updating results..."
                        : "Live search with non-blocking updates"}
                    </p>
                  </form>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Category
                  </label>
                  <select
                    className={`w-full rounded-lg p-2 transition-all border focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-100"
                        : "border-gray-500 text-gray-900 bg-white"
                    }`}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:w-3/4">
            {courses.length === 0 ? (
              <div
                className={`text-center py-16 rounded-xl shadow-md ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  No courses found
                </h3>
                <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <div
                    key={course._id}
                    className={`group relative rounded-2xl shadow-lg transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-fade-up border ${
                      isDark
                        ? "bg-gray-800 border-gray-700 hover:shadow-2xl"
                        : "bg-white border-gray-100 hover:shadow-2xl"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Course Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          course.image ||
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"
                        }
                        alt={course.title}
                        className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-[#F59E0B] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          ${course.price}
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <div className="bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          {course.category}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h2
                        className={`text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300 ${
                          isDark
                            ? "text-gray-100 group-hover:text-blue-400"
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
                        {course.description ||
                          "Enhance your skills with this comprehensive course."}
                      </p>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 bg-gradient-to-r from-[#3B82F6] to-[#10B981]">
                          {course.instructor?.name?.charAt(0) || "I"}
                        </div>
                        <div>
                          <p
                            className={`${
                              isDark ? "text-gray-100" : "text-gray-700"
                            } text-sm font-medium`}
                          >
                            {course.instructor?.name || "Expert Instructor"}
                          </p>
                          <p
                            className={`text-xs ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Course Instructor
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-center justify-between mb-6 text-sm ${
                          isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {course.duration || 8} weeks
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                          </svg>
                          {course.enrolled ||
                            Math.floor(Math.random() * 500) + 50}{" "}
                          students
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1 text-[#F59E0B]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {course.rating || (4.0 + Math.random()).toFixed(1)}
                        </div>
                      </div>

                      <Link
                        to={`/courses/${course._id}`}
                        className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
