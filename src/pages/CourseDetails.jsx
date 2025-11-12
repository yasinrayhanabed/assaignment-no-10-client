import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);

  const popularCourses = [
    {
      _id: '1',
      title: 'Complete React Development Course',
      description: 'Master React from basics to advanced concepts. Build real-world projects and learn modern React patterns. This comprehensive course covers everything from React fundamentals to advanced topics like hooks, context API, and performance optimization.',
      image: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=React+Course',
      price: 89,
      duration: 12,
      instructor: { name: 'John Smith', email: 'john@example.com' },
      category: 'Web Development',
      rating: 4.8,
      enrolled: 1250,
      enrolledCount: 1250
    },
    {
      _id: '2', 
      title: 'Python for Data Science',
      description: 'Learn Python programming for data analysis, visualization, and machine learning with hands-on projects. Cover pandas, numpy, matplotlib, seaborn, and scikit-learn libraries with real-world datasets.',
      image: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Python+Course',
      price: 75,
      duration: 10,
      instructor: { name: 'Sarah Johnson', email: 'sarah@example.com' },
      category: 'Data Science',
      rating: 4.9,
      enrolled: 980,
      enrolledCount: 980
    },
    {
      _id: '3',
      title: 'UI/UX Design Masterclass', 
      description: 'Create stunning user interfaces and experiences. Learn design principles, prototyping, and user research. Master tools like Figma, Adobe XD, and create portfolio-worthy projects.',
      image: 'https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Design+Course',
      price: 95,
      duration: 8,
      instructor: { name: 'Mike Wilson', email: 'mike@example.com' },
      category: 'Design',
      rating: 4.7,
      enrolled: 750,
      enrolledCount: 750
    }
  ];

  const { data: apiCourse, isLoading, error } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      // First check if it's a popular course
      const popularCourse = popularCourses.find(course => course._id === id);
      if (popularCourse) {
        return popularCourse;
      }
      
      // If not found in popular courses, fetch from API
      const response = await fetch(`http://localhost:5000/courses/${id}`);
      if (!response.ok) {
        throw new Error('Course not found');
      }
      return response.json();
    },
  });

  const course = apiCourse;

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please login to enroll in courses');
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      const response = await fetch('http://localhost:5000/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course._id,
          userEmail: user.email,
          courseName: course.title,
          instructorName: course.instructor?.name,
          duration: course.duration,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('🎉 Enrolled successfully!');
      } else {
        toast.error(data.error || 'Enrollment failed');
      }
    } catch {
      toast.error('Enrollment failed. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
        <LoadingSpinner size="text-6xl" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Course Not Found</h1>
          <button
            onClick={() => navigate('/courses')}
            className="btn bg-gradient-to-r from-blue-500 to-blue-700 text-white border-none px-8 py-3 rounded-xl font-medium hover:scale-105 transition-transform"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-100 to-white pt-16">
      {/* Hero Image Section */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={course.image || 'https://via.placeholder.com/1200x600'}
          alt={course.title}
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">{course.title}</h1>
          <p className="text-lg text-blue-100 mt-2">{course.category}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8">
          {/* Course Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Course Details */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Course Details</h3>
              <ul className="space-y-3 text-gray-700 font-medium">
                <li className="flex justify-between">
                  <span>💲 Price:</span>
                  <span className="text-blue-600 font-semibold">${course.price}</span>
                </li>
                <li className="flex justify-between">
                  <span>⏱ Duration:</span>
                  <span>{course.duration} weeks</span>
                </li>
                <li className="flex justify-between">
                  <span>👥 Enrolled:</span>
                  <span>{course.enrolledCount || 0} students</span>
                </li>
              </ul>
            </div>

            {/* Instructor Info */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">Instructor</h3>
              <div className="flex items-center gap-4">
                <img
                  src={course.instructor?.photo || 'https://via.placeholder.com/60'}
                  alt="Instructor"
                  className="w-16 h-16 rounded-full border-2 border-indigo-300"
                />
                <div>
                  <p className="font-semibold text-gray-800">{course.instructor?.name || 'Unknown'}</p>
                  <p className="text-sm text-gray-600">{course.instructor?.email || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 mb-10 shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Description</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              {course.description}
            </p>
          </div>

          {/* Enroll Button */}
          <div className="text-center">
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="btn bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none text-lg font-semibold px-10 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              {enrolling ? <LoadingSpinner size="text-lg" /> : 'Enroll Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
