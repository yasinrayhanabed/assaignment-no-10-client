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
                      <Link to={`/courses/${course._id}`} className="btn btn-sm px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white border-none">
                        View
                      </Link>
                      <Link to={`/update-course/${course._id}`} className="btn btn-sm px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white border-none">
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeleteModal(course._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-white border-none"
                      >
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
