import { useState, useEffect } from 'react';

const MyEnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock user data - replace with actual Firebase user
  const currentUser = {
    email: 'john.doe@example.com'
  };

  // Mock enrolled courses data - replace with actual API call
  const mockEnrolledCourses = [
    {
      _id: '3',
      title: 'JavaScript Mastery',
      imageURL: 'https://via.placeholder.com/400x300',
      instructor: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
      },
      price: 79,
      category: 'Web Development'
    },
    {
      _id: '4',
      title: 'Python for Data Science',
      imageURL: 'https://via.placeholder.com/400x300',
      instructor: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com'
      },
      price: 129,
      category: 'Data Science'
    }
  ];

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      // Simulate API call - GET /enrollments?userEmail=currentUser.email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEnrolledCourses(mockEnrolledCourses);
    } catch (error) {
      console.error('Failed to fetch enrolled courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-2xl font-semibold mb-2">You haven't enrolled yet.</h2>
          <p className="text-gray-600 mb-4">Explore our courses and start learning today!</p>
          <a href="/courses" className="btn btn-primary">
            Browse Courses
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img 
                  src={course.imageURL} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg">{course.title}</h2>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm">
                      {course.instructor.name.charAt(0)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{course.instructor.name}</span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-primary">${course.price}</span>
                  <div className="badge badge-success gap-2">
                    <span>✅</span>
                    Enrolled
                  </div>
                </div>

                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm w-full">
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;