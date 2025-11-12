const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About LearnHub</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          LearnHub is a modern online learning platform designed to make education accessible to everyone.
        </p>
        <p className="mb-4">
          Our mission is to provide high-quality courses that help learners develop new skills and advance their careers.
        </p>
        <div className="stats shadow mt-8">
          <div className="stat">
            <div className="stat-title">Total Courses</div>
            <div className="stat-value">100+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Students</div>
            <div className="stat-value">10K+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Instructors</div>
            <div className="stat-value">50+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;