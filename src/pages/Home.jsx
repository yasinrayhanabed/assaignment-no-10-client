import { Link } from 'react-router-dom';
import { FaUserTie, FaClock, FaDollarSign, FaStar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  const { data: featuredCourses = [], isLoading } = useQuery({
    queryKey: ['featuredCourses'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/courses/featured');
      if (!response.ok) throw new Error('Failed to fetch featured courses');
      return response.json();
    }
  });

  const popularCourses = [
    {
      _id: '1',
      title: 'Complete React Development Course',
      description: 'Master React from basics to advanced concepts. Build real-world projects and learn modern React patterns.',
      image: 'https://i.ibb.co.com/SXzrFH67/react-js-inscription-against-laptop-and-code-background-learn-react-programming-language-computer-co.jpg',
      price: 89,
      duration: 12,
      instructor: { name: 'John Smith' },
      category: 'Web Development',
      rating: 4.8,
      enrolled: 1250
    },
    {
      _id: '2', 
      title: 'Python for Data Science',
      description: 'Learn Python programming for data analysis, visualization, and machine learning with hands-on projects.',
      image: 'https://i.ibb.co.com/v6qd0KQJ/pythom-data-science.webp',
      price: 75,
      duration: 10,
      instructor: { name: 'Sarah Johnson' },
      category: 'Data Science',
      rating: 4.9,
      enrolled: 980
    },
    {
      _id: '3',
      title: 'UI/UX Design Masterclass', 
      description: 'Create stunning user interfaces and experiences. Learn design principles, prototyping, and user research.',
      image: 'https://i.ibb.co.com/vvjB7KDW/images-q-tbn-ANd9-Gc-Rhf-OQKOixn45-CBe-Tn-Xq-PDJCDFd-ADC1-Tx-Flfg-s.jpg',
      price: 95,
      duration: 8,
      instructor: { name: 'Mike Wilson' },
      category: 'Design',
      rating: 4.7,
      enrolled: 750
    }
  ];

  const instructors = [
    { id: 1, name: "John Doe", expertise: "React Developer", rating: 4.9, image: "https://i.ibb.co.com/jPz5Pxkn/speaker3-min.jpg" },
    { id: 2, name: "Jane Smith", expertise: "Python Expert", rating: 4.8, image: "https://i.ibb.co.com/YqMPVYb/images-q-tbn-ANd9-Gc-RMYR0-TAT4x-CZgg-7cv-Ds2g-H02s-MGHAIb-FDYQ-s.jpg" },
    { id: 3, name: "Mike Johnson", expertise: "UI/UX Designer", rating: 4.7, image: "https://i.ibb.co.com/V0nGpT4g/images-q-tbn-ANd9-Gc-Tvv-L76q808x9p-Jl7tnl-A77tqj-2ei0ri-Y5-KQ-s.jpg" },
    { id: 4, name: "Sarah Wilson", expertise: "Data Scientist", rating: 4.9, image: "https://i.ibb.co.com/MDVJXpbz/young-people-eating-berries-street-23-2150163636.jpg" }
  ];

  return (
    <div className="pt-16">

      {/* Hero Section */}
      <section className="bg-[#3B82F6] text-white py-24 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empower Your Learning Journey
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-white/90 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover world-class courses from expert instructors
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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

      {/* Popular Courses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1F2937]"
            data-aos="fade-up"
          >
            Popular Courses
          </motion.h2>

          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="text-4xl" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {(featuredCourses.length > 0 ? featuredCourses.slice(0, 3) : popularCourses).map((course, index) => (
                <motion.div 
                  key={course._id} 
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Course Image with Overlay */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={course.image || 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=Course+Image'} 
                      alt={course.title} 
                      className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-[#F59E0B] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ${course.price}
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        {course.category}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Course Title */}
                    <h2 className="text-xl font-bold text-[#1F2937] mb-3 line-clamp-2 group-hover:text-[#3B82F6] transition-colors duration-300">
                      {course.title}
                    </h2>
                    
                    {/* Course Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {course.description || 'Enhance your skills with this comprehensive course designed for learners of all levels.'}
                    </p>
                    
                    {/* Instructor Info */}
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        {course.instructor?.name?.charAt(0) || 'I'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {course.instructor?.name || 'Expert Instructor'}
                        </p>
                        <p className="text-xs text-gray-500">Course Instructor</p>
                      </div>
                    </div>
                    
                    {/* Course Stats */}
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {course.duration || 8} weeks
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        {course.enrolled || Math.floor(Math.random() * 500) + 50} students
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {course.rating || (4.0 + Math.random()).toFixed(1)}
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <Link
                      to={`/courses/${course._id}`}
                      className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg group-hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center">
                        View Details
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                  
                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#3B82F6] rounded-2xl transition-all duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div 
            className="text-center mt-12"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link 
              to="/courses" 
              className="btn bg-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:text-white hover:bg-clip-border border-2 border-purple-600 hover:border-none transition-all duration-300 px-8 py-3"
            >
              View All Courses
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1F2937]"
            data-aos="fade-up"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div 
              className="text-center bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              data-aos="zoom-in"
              data-aos-delay="100"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FaUserTie className="text-6xl text-[#F59E0B] mx-auto mb-5" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-[#1F2937]">Expert Mentors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of experience</p>
            </motion.div>
            <motion.div 
              className="text-center bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              data-aos="zoom-in"
              data-aos-delay="200"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <FaClock className="text-6xl text-[#F59E0B] mx-auto mb-5" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-[#1F2937]">Flexible Schedule</h3>
              <p className="text-gray-600">Study at your own pace with 24/7 access to course materials</p>
            </motion.div>
            <motion.div 
              className="text-center bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              data-aos="zoom-in"
              data-aos-delay="300"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FaDollarSign className="text-6xl text-[#F59E0B] mx-auto mb-5" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-[#1F2937]">Affordable Learning</h3>
              <p className="text-gray-600">Quality education at competitive prices with payment plans</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Instructors Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1F2937]"
            data-aos="fade-up"
          >
            Top Instructors
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {instructors.map((instructor, index) => (
              <motion.div 
                key={instructor.id} 
                className="card bg-white shadow-md p-5 hover:shadow-xl transition-all duration-300 rounded-xl"
                data-aos="flip-left"
                data-aos-delay={index * 100}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
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
                  <h3 className="card-title font-bold text-[#1F2937]">{instructor.name}</h3>
                  <p className="text-gray-600">{instructor.expertise}</p>
                  <motion.div 
                    className="flex items-center mt-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <FaStar className="text-[#F59E0B] mr-1" />
                    <span className="font-medium">{instructor.rating}</span>
                  </motion.div>
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
