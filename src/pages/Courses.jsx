import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

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

  const { data: apiCourses = [], isLoading, error } = useQuery({
    queryKey: ['courses', searchTerm, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`http://localhost:5000/courses?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      return response.json();
    },
    onError: (error) => {
      toast.error('Failed to load courses');
      console.error('Error fetching courses:', error);
    }
  });

  // Combine popular courses with API courses
  const courses = [...popularCourses, ...apiCourses].filter(course => {
    const matchesSearch = !searchTerm || course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories([...new Set([...popularCourses.map(c => c.category), ...data])]);
        } else {
          setCategories([...new Set(popularCourses.map(c => c.category))]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([...new Set(popularCourses.map(c => c.category))]);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pt-20 flex justify-center items-center">
        <LoadingSpinner size="text-6xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error bg-[#EF4444] text-white shadow-lg rounded-lg">
            <span>Failed to load courses. Please try again later.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-[#1F2937] tracking-tight">
          All Courses
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-bold mb-6 text-[#1F2937] border-b pb-2">Filter Courses</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="input input-bordered w-full border border-black p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    className="select select-bordered w-full rounded-lg border-gray-500 p-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:w-3/4">
            {courses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#1F2937]">No courses found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <div
                    key={course._id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-fade-up border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Course Image with Overlay */}
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'}
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
