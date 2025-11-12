import { useState } from 'react';
import toast from 'react-hot-toast';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    imageURL: '',
    price: '',
    duration: '',
    category: '',
    description: '',
    featured: false
  });

  // Mock user data - replace with actual Firebase user
  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    photoURL: 'https://via.placeholder.com/100'
  };

  const categories = ['Web Development', 'Backend', 'Design', 'Mobile', 'Data Science'];

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
        instructor: {
          name: currentUser.name,
          email: currentUser.email,
          photo: currentUser.photoURL
        },
        createdAt: new Date().toISOString()
      };

      // Simulate API call - POST to /courses
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Course Added Successfully');
      
      // Reset form
      setFormData({
        title: '',
        imageURL: '',
        price: '',
        duration: '',
        category: '',
        description: '',
        featured: false
      });
    } catch (error) {
      toast.error('Failed to add course. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Course</h1>
        
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

              {/* Instructor Info Display */}
              <div className="bg-base-200 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Instructor Information</h3>
                <div className="flex items-center gap-3">
                  <img src={currentUser.photoURL} alt="Instructor" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-sm text-gray-600">{currentUser.email}</p>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Add Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;