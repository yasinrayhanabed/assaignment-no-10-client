import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    price: '',
    duration: '',
    category: '',
    description: '',
    isFeatured: false,
  });
  const [updating, setUpdating] = useState(false);

  const categories = [
    'Web Development',
    'Backend Development',
    'Design',
    'Mobile Development',
    'Data Science',
    'Marketing',
  ];

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/courses/${id}`);
      if (!response.ok) throw new Error('Course not found');
      return response.json();
    },
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        image: course.image || '',
        price: course.price?.toString() || '',
        duration: course.duration?.toString() || '',
        category: course.category || '',
        description: course.description || '',
        isFeatured: course.isFeatured || false,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
      };

      const response = await fetch(`http://localhost:5000/update-course/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Course updated successfully!');
        navigate('/my-courses');
      } else {
        toast.error(data.error || 'Failed to update course');
      }
    } catch {
      toast.error('Failed to update course. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8 pt-20 flex justify-center items-center h-64">
        <LoadingSpinner size="text-6xl" />
      </div>
    );

  if (error || !course)
    return (
      <div className="container mx-auto px-4 py-8 pt-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Course not found
        </h1>
        <button
          onClick={() => navigate('/my-courses')}
          className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-6 py-3 hover:opacity-90"
        >
          Back to My Courses
        </button>
      </div>
    );

  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center transition-colors duration-300 bg-gradient-to-br from-[#EFF6FF] via-[#E0F2FE] to-[#DBEAFE] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8">
          <h1 className="text-4xl font-extrabold text-center text-[#1E3A8A] dark:text-blue-400 mb-8">
            Update Course
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-400 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-400 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
            </div>

            {/* Price & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-400 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Duration (weeks)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-400 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-400 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              >
                <option value="">Select a Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-400 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none transition"
                required
              ></textarea>
            </div>

            {/* Featured */}
            <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 p-4 rounded-xl border border-blue-200 dark:border-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  Mark as Featured Course
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/my-courses')}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white rounded-xl py-3 text-lg font-semibold transition-transform duration-300 hover:scale-105"
                disabled={updating}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl py-3 text-lg font-semibold transition-transform duration-300 hover:scale-105"
                disabled={updating}
              >
                {updating ? <LoadingSpinner size="text-lg" /> : 'Update Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
