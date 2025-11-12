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
    isFeatured: false
  });
  const [updating, setUpdating] = useState(false);

  const categories = ['Web Development', 'Backend Development', 'Design', 'Mobile Development', 'Data Science', 'Marketing'];

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/courses/${id}`);
      if (!response.ok) {
        throw new Error('Course not found');
      }
      return response.json();
    }
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
        isFeatured: course.isFeatured || false
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration)
      };

      const response = await fetch(`http://localhost:5000/update-course/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData)
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Course updated successfully!');
        navigate('/my-courses');
      } else {
        toast.error(data.error || 'Failed to update course');
      }
    } catch (error) {
      toast.error('Failed to update course. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="text-6xl" />
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <button onClick={() => navigate('/my-courses')} className="btn btn-primary">
            Back to My Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Course</h1>
        
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
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="https://example.com/image.jpg"
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
                    <span className="label-text">Duration (weeks)</span>
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="8"
                    className="input input-bordered w-full"
                    min="1"
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
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => navigate('/my-courses')}
                  className="btn btn-outline flex-1"
                  disabled={updating}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1" disabled={updating}>
                  {updating ? <LoadingSpinner size="text-lg" /> : 'Save Changes'}
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