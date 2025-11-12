import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    imageURL: '',
    price: '',
    duration: '',
    category: '',
    description: '',
    featured: false
  });

  const categories = ['Web Development', 'Backend', 'Design', 'Mobile', 'Data Science'];

  // Mock course data - replace with actual API call
  const mockCourse = {
    _id: '1',
    title: 'React Fundamentals',
    imageURL: 'https://via.placeholder.com/400x300',
    price: 99,
    duration: '8 weeks',
    category: 'Web Development',
    description: 'Learn React from basics to advanced concepts',
    featured: true
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      // Simulate API call - GET /courses/:id
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Pre-fill form with existing course data
      setFormData({
        title: mockCourse.title,
        imageURL: mockCourse.imageURL,
        price: mockCourse.price.toString(),
        duration: mockCourse.duration,
        category: mockCourse.category,
        description: mockCourse.description,
        featured: mockCourse.featured
      });
    } catch (error) {
      toast.error('Failed to fetch course details');
      navigate('/my-courses');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      // Simulate API call - PUT /courses/:id
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Course Updated Successfully');
      navigate('/my-courses');
    } catch (error) {
      toast.error('Failed to update course. Please try again.');
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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Update Course</h1>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="url"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Price ($)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    min="0"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Duration</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 8 weeks"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                  required
                ></textarea>
              </div>

              <div className="form-control mb-6">
                <label className="label cursor-pointer">
                  <span className="label-text">Featured Course</span>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="checkbox"
                  />
                </label>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => navigate('/my-courses')}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;