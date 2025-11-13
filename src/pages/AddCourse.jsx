import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const AddCourse = () => {
  const { user } = useAuth();
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
  const [loading, setLoading] = useState(false);

  const categories = [
    'Web Development',
    'Backend Development',
    'Design',
    'Mobile Development',
    'Data Science',
    'Marketing',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        instructor: {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
      };

      const response = await fetch('http://localhost:5000/add-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('✅ Course added successfully!');
        navigate('/my-courses');
      } else {
        toast.error(data.error || 'Failed to add course');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#EFF6FF] via-[#E0F2FE] to-[#DBEAFE] min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold text-center text-[#1E3A8A] mb-8">
            Add a New Course
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Course Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Price & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Duration (weeks)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                required
              ></textarea>
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                <span className="text-gray-700 font-medium">Mark as Featured Course</span>
              </label>
            </div>

            {/* Instructor Info */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-[#1E3A8A] mb-4">Instructor Information</h3>
              <div className="flex items-center gap-4">
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/60'}
                  alt="Instructor"
                  className="w-14 h-14 rounded-full border-2 border-blue-300"
                />
                <div>
                  <p className="font-semibold text-gray-800">{user?.displayName}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none rounded-xl py-3 text-lg font-semibold transition-transform duration-300 hover:scale-105"
            >
              {loading ? <LoadingSpinner size="text-lg" /> : 'Add Course'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
