import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const MyAddedCourses = () => {
  const { user } = useAuth();
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
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, courseId: null });

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
          Failed to load courses. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-10 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">My Added Courses</h1>
        <Link to="/add-course" className="btn bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-6 py-2 transition-all">
          Add New Course
        </Link>
      </div>

      {/* No courses */}
      {courses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">No courses added yet</h2>
          <p className="text-gray-500 mb-4">Start by adding your first course</p>
          <Link to="/add-course" className="btn bg-[#10B981] hover:bg-[#059669] text-white rounded-lg px-6 py-2">
            Add Course
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="table w-full bg-white table-fixed">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="font-medium w-1/4 px-4 py-3">Title</th>
                <th className="font-medium w-1/6 px-4 py-3">Category</th>
                <th className="font-medium w-1/8 px-4 py-3">Price</th>
                <th className="font-medium w-1/8 px-4 py-3">Duration</th>
                <th className="font-medium w-1/3 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50 transition-colors border-b">
                  <td className="font-medium px-4 py-3 truncate" title={course.title}>{course.title}</td>
                  <td className="px-4 py-3">{course.category}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">${course.price}</td>
                  <td className="px-4 py-3">{course.duration} weeks</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 flex-wrap">
                      <Link to={`/courses/${course._id}`} className="btn btn-sm px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white border-none flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                      <Link to={`/update-course/${course._id}`} className="btn btn-sm px-3 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white border-none flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeleteModal(course._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 px-3 py-2 rounded-xl text-white border-none flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
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
        <div className="modal modal-open">
          <div className="modal-box rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>
            <div className="modal-action flex justify-end gap-2">
              <button onClick={closeDeleteModal} className="btn btn-outline">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal.courseId)}
                className="btn btn-error"
                disabled={deleting}
              >
                {deleting ? <LoadingSpinner size="text-sm" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedCourses;
