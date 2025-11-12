import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCourse({
          id: parseInt(id),
          title: 'React Fundamentals',
          category: 'Web Development',
          price: 99,
          duration: '8 weeks',
          instructor: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          },
          image: 'https://via.placeholder.com/600x400',
          description: 'Learn the fundamentals of React including components, state management, hooks, and modern React patterns. This comprehensive course will take you from beginner to intermediate level with hands-on projects and real-world examples.'
        });
        setLoading(false);
      }, 1000);
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      // Simulate enrollment API call
      // POST /enroll → save in "enrolledCourses" collection
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Enrolled Successfully!');
    } catch (error) {
      toast.error('Enrollment failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-3xl mb-4">{course.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Course Details</h3>
                <p><strong>Price:</strong> ${course.price}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Category:</strong> {course.category}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Instructor</h3>
                <p><strong>Name:</strong> {course.instructor.name}</p>
                <p><strong>Email:</strong> {course.instructor.email}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{course.description}</p>
            </div>

            <div className="card-actions justify-center">
              <button onClick={handleEnroll} className="btn btn-primary btn-lg">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;