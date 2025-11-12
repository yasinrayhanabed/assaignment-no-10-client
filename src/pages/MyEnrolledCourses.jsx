import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const MyEnrolledCourses = () => {
  const { user } = useAuth();

  const { data: enrolledCourses = [], isLoading, error } = useQuery({
    queryKey: ['enrolledCourses', user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/enroll/${user.email}`);
      if (!response.ok) throw new Error('Failed to fetch enrolled courses');
      return response.json();
    },
    enabled: !!user?.email
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center items-center h-64">
        <LoadingSpinner size="text-6xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="alert alert-error text-white bg-red-600">
          Failed to load enrolled courses. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-10 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Enrolled Courses</h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">You haven't enrolled yet.</h2>
          <p className="text-gray-500 mb-4">Explore our courses and start learning today!</p>
          <Link to="/courses" className="btn bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-6 py-2">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((enrollment) => (
            <div key={enrollment._id} className="card bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
              <div className="card-body p-6">
                <h2 className="card-title text-lg font-bold text-gray-800 mb-2">{enrollment.courseName}</h2>
                
                {/* Instructor Info */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-sm font-semibold">
                      {enrollment.instructorName?.charAt(0) || 'I'}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{enrollment.instructorName}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{enrollment.progress || 0}%</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={enrollment.progress || 0}
                    max="100"
                  ></progress>
                </div>

                {/* Duration & Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">{enrollment.duration} weeks</span>
                  <div className="badge badge-success gap-2">
                    ✅ Enrolled
                  </div>
                </div>

                {/* Enrollment Date */}
                <div className="text-xs text-gray-500 mb-4">
                  Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </div>

                {/* Continue Button */}
                <div className="card-actions justify-end">
                  <Link
                    to={`/courses/${enrollment.courseId}`}
                    className="btn btn-primary btn-sm w-full"
                  >
                    Continue Learning
                  </Link>
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
