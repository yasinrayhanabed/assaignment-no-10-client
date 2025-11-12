import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCourses([
          {
            id: 1,
            title: 'React Fundamentals',
            category: 'Web Development',
            price: 99,
            duration: '8 weeks',
            instructor: 'John Doe',
            image: 'https://via.placeholder.com/300x200'
          },
          {
            id: 2,
            title: 'Node.js Backend',
            category: 'Backend',
            price: 129,
            duration: '10 weeks',
            instructor: 'Jane Smith',
            image: 'https://via.placeholder.com/300x200'
          },
          {
            id: 3,
            title: 'UI/UX Design',
            category: 'Design',
            price: 79,
            duration: '6 weeks',
            instructor: 'Mike Johnson',
            image: 'https://via.placeholder.com/300x200'
          }
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchCourses();
  }, []);

  const categories = ['Web Development', 'Backend', 'Design', 'Mobile'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search courses..."
          className="input input-bordered flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course.title}</h2>
              <div className="badge badge-secondary">{course.category}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold">${course.price}</span>
                <span className="text-sm text-gray-500">{course.duration}</span>
              </div>
              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/courses/${course.id}`} className="btn btn-secondary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;