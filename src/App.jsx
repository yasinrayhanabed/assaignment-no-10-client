import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layout/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import AddCourse from './pages/AddCourse';
import MyAddedCourses from './pages/MyAddedCourses';
import UpdateCourse from './pages/UpdateCourse';
import MyEnrolledCourses from './pages/MyEnrolledCourses';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/add-course" element={<PrivateRoute><AddCourse /></PrivateRoute>} />
              <Route path="/my-courses" element={<PrivateRoute><MyAddedCourses /></PrivateRoute>} />
              <Route path="/update-course/:id" element={<PrivateRoute><UpdateCourse /></PrivateRoute>} />
              <Route path="/my-enrolled-courses" element={<PrivateRoute><MyEnrolledCourses /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#F8FAFC',
                color: '#1E293B',
                border: '1px solid #3B82F6',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#F8FAFC',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#F8FAFC',
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;