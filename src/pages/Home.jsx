import { Link } from 'react-router-dom';
import { FaUserTie, FaClock, FaDollarSign, FaStar } from 'react-icons/fa';

const Home = () => {
  const popularCourses = [
    { id: 1, title: "React Development", instructor: "John Doe", price: "$99", image: "https://via.placeholder.com/300x200" },
    { id: 2, title: "Python Programming", instructor: "Jane Smith", price: "$79", image: "https://via.placeholder.com/300x200" },
    { id: 3, title: "Web Design", instructor: "Mike Johnson", price: "$89", image: "https://via.placeholder.com/300x200" }
  ];

  const instructors = [
    { id: 1, name: "John Doe", expertise: "React Developer", rating: 4.9, image: "https://via.placeholder.com/150x150" },
    { id: 2, name: "Jane Smith", expertise: "Python Expert", rating: 4.8, image: "https://via.placeholder.com/150x150" },
    { id: 3, name: "Mike Johnson", expertise: "UI/UX Designer", rating: 4.7, image: "https://via.placeholder.com/150x150" },
    { id: 4, name: "Sarah Wilson", expertise: "Data Scientist", rating: 4.9, image: "https://via.placeholder.com/150x150" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-8">Empower Your Learning Journey</h1>
          <Link 
            to="/courses" 
            className="btn btn-accent text-white hover:scale-105 transition-transform"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <div key={course.id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{course.title}</h3>
                  <p>Instructor: {course.instructor}</p>
                  <p className="text-lg font-bold text-primary">{course.price}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">Enroll</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaUserTie className="text-6xl text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Mentors</h3>
              <p>Learn from industry professionals with years of experience</p>
            </div>
            <div className="text-center">
              <FaClock className="text-6xl text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Flexible Schedule</h3>
              <p>Study at your own pace with 24/7 access to course materials</p>
            </div>
            <div className="text-center">
              <FaDollarSign className="text-6xl text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Affordable Learning</h3>
              <p>Quality education at competitive prices with payment plans</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Instructors Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Instructors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="card bg-base-100 shadow-xl hover:scale-105 hover:shadow-2xl transition-all">
                <figure className="px-10 pt-10">
                  <img src={instructor.image} alt={instructor.name} className="rounded-full w-32 h-32 object-cover" />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{instructor.name}</h3>
                  <p>{instructor.expertise}</p>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{instructor.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;