import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTheme } from "../contexts/ThemeContext";

const MyEnrolledCourses = () => {
  const { user } = useAuth();
  const { isDark } = useTheme(); // Dark mode context

  const {
    data: enrolledCourses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["enrolledCourses", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `https://online-learning-platform-server-orpin.vercel.app/enroll/${user.email}`
      );
      if (!response.ok) throw new Error("Failed to fetch enrolled courses");
      return response.json();
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div
        className={`container mx-auto px-4 py-20 flex justify-center items-center h-64 ${
          isDark ? "text-gray-100" : ""
        }`}
      >
        <LoadingSpinner size="text-6xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div
          className={`alert text-white p-4 rounded-lg ${
            isDark ? "bg-red-700" : "bg-red-600"
          }`}
        >
          Failed to load enrolled courses. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto px-4 mt-10 py-12 transition-colors duration-300 ${
        isDark ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-8 text-center transition-colors duration-300 ${
          isDark ? "text-gray-100" : "text-gray-800"
        }`}
      >
        My Enrolled Courses
      </h1>

      {enrolledCourses.length === 0 ? (
        <div
          className={`text-center py-16 rounded-lg shadow-md p-8 transition-colors duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="text-6xl mb-4">🎓</div>
          <h2
            className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            You haven't enrolled yet.
          </h2>
          <p
            className={`mb-4 transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Explore our courses and start learning today!
          </p>
          <Link
            to="/courses"
            className="btn bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-6 py-2"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((enrollment) => (
            <div
              key={enrollment._id}
              className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-transparent"
              }`}
            >
              <div className="p-6">
                <h2
                  className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {enrollment.courseName}
                </h2>

                {/* Instructor Info */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-semibold"
                    style={{ backgroundColor: "#3B82F6", color: "#fff" }}
                  >
                    {enrollment.instructorName?.charAt(0) || "I"}
                  </div>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {enrollment.instructorName}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div
                    className={`flex justify-between items-center mb-2 text-sm transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <span>Progress</span>
                    <span>{enrollment.progress || 0}%</span>
                  </div>
                  <progress
                    className={`progress w-full ${
                      isDark ? "progress-info" : "progress-primary"
                    }`}
                    value={enrollment.progress || 0}
                    max="100"
                  ></progress>
                </div>

                {/* Duration & Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {enrollment.duration} weeks
                  </span>
                  <div className="badge badge-success gap-2">✅ Enrolled</div>
                </div>

                {/* Enrollment Date */}
                <div
                  className={`text-xs mb-4 transition-colors duration-300 ${
                    isDark ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  Enrolled:{" "}
                  {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </div>

                {/* Continue Button */}
                <div className="flex justify-end">
                  <Link
                    to={`/courses/${enrollment.courseId}`}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-center"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;
