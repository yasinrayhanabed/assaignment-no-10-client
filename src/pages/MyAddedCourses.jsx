import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyAddedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, courseId: null });

  // Mock user data - replace with actual Firebase user
  const currentUser = {
    email: 'john.doe@example.com'
  };

  // Mock courses data - replace with actual API call
  const mockCourses = [
    {
      _id: '1',
      title: 'React Fundamentals',
      category: 'Web Development',
      price: 99,
      duration: '8 weeks',
      instructor: { email: 'john.doe@example.com' }
    },
    {
      _id: '2',
      title: 'Node.js Backend',
      category: 'Backend',
      price: 149,
      duration: '10 weeks',
      instructor: { email: 'john.doe@example.com' }
    }
  ];

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      // Simulate API call - GET /courses?instructor.email=currentUser.email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter courses by current user's email
      const userCourses = mockCourses.filter(course => 
        course.instructor.email === currentUser.email
      );
      
      setCourses(userCourses);
    } catch (error) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      // Simulate API call - DELETE /courses/:id
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCourses(courses.filter(course => course._id !== courseId));
      toast.success('Course deleted successfully');
      setDeleteModal({ isOpen: false, courseId: null });
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const openDeleteModal = (courseId) => {
    setDeleteModal({ isOpen: true, courseId });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, courseId: null });
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Added Courses</h1>
        <Link to="/add-course" className="btn btn-primary">
          Add New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold mb-2">No courses added yet</h2>
          <p className="text-gray-600 mb-4">Start by adding your first course</p>
          <Link to="/add-course" className="btn btn-primary">
            Add Course
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td className="font-medium">{course.title}</td>
                  <td>{course.category}</td>
                  <td>${course.price}</td>
                  <td>{course.duration}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link 
                        to={`/courses/${course._id}`}
                        className="btn btn-sm btn-info"
                      >
                        View
                      </Link>
                      <Link 
                        to={`/update-course/${course._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => openDeleteModal(course._id)}
                        className="btn btn-sm btn-error"
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
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this course? This action cannot be undone.</p>
            <div className="modal-action">
              <button 
                onClick={closeDeleteModal}
                className="btn"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deleteModal.courseId)}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedCourses;