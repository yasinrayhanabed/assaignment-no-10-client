import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const MyAddedCourses = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const queryClient = useQueryClient();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, courseId: null });
  const [deleting, setDeleting] = useState(false);

  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['myCourses', user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/courses/instructor/${user.email}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
    enabled: !!user?.email
  });

  const handleDelete = async (courseId) => {
    setDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/delete-course/${courseId}`, { method: 'DELETE' });
      const data = await response.json();

      if (response.ok) {
        toast.success('Course deleted successfully');
        queryClient.invalidateQueries(['myCourses']);
        setDeleteModal({ isOpen: false, courseId: null });
      } else {
        toast.error(data.error || 'Failed to delete course');
      }
    } catch {
      toast.error('Failed to delete course');
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteModal = (courseId) => setDeleteModal({ isOpen: true, courseId });
  const closeDeleteModal = () => {
    if (!deleting) {
      setDeleteModal({ isOpen: false, courseId: null });
    }
  };

  if (isLoading) {
    return (
      <div className={`container mx-auto px-4 py-20 flex justify-center items-center h-64 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <LoadingSpinner size="text-6xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`container mx-auto px-4 py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="alert alert-error text-white bg-red-600">
          Failed to load courses. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 pt-20 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>My Added Courses</h1>
          <Link to="/add-course" className="btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg px-6 py-2 transition-all">
            Add New Course
          </Link>
        </div>

        {/* No courses */}
        {courses.length === 0 ? (
          <div className={`text-center py-16 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
            <div className="text-6xl mb-4">📚</div>
            <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>No courses added yet</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-500'} mb-4`}>Start by adding your first course</p>
            <Link to="/add-course" className="btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg px-6 py-2">
              Add Course
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className={`table w-full ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <thead className={`${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                <tr>
                  <th className="font-medium px-4 py-3 text-left">Title</th>
                  <th className="font-medium px-4 py-3 text-left">Category</th>
                  <th className="font-medium px-4 py-3 text-left">Price</th>
                  <th className="font-medium px-4 py-3 text-left">Duration</th>
                  <th className="font-medium px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id} className={`${isDark ? 'hover:bg-gray-700 border-gray-600' : 'hover:bg-gray-50 border-gray-200'} transition-colors border-b`}>
                    <td className={`font-medium px-4 py-4 align-top ${isDark ? 'text-white' : 'text-gray-900'}`}>{course.title}</td>
                    <td className={`px-4 py-4 align-top ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{course.category}</td>
                    <td className="px-4 py-4 font-semibold text-green-600 align-top">${course.price}</td>
                    <td className={`px-4 py-4 align-top ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{course.duration} weeks</td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex gap-5">
                        <Link to={`/courses/${course._id}`} className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium transition-colors">
                          <FaEye /> View
                        </Link>
                        <Link to={`/update-course/${course._id}`} className="flex items-center gap-1 text-yellow-500 hover:text-yellow-600 font-medium transition-colors">
                          <FaEdit /> Edit
                        </Link>
                        <button
                          onClick={() => openDeleteModal(course._id)}
                          className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition-colors hover:cursor-pointer"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={closeDeleteModal}
          >
            <div 
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Warning Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} text-center mb-4`}>Delete Course?</h3>
              
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-center mb-8 leading-relaxed`}>
                Are you sure you want to delete this course? This action cannot be undone and all enrolled students will lose access.
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={closeDeleteModal} 
                  className={`flex-1 px-6 py-3 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} font-medium rounded-xl transition-colors duration-200`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.courseId)}
                  disabled={deleting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <LoadingSpinner size="text-sm" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedCourses;