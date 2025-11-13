import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';

const Profile = () => {
  const { user } = useAuth();
  const { isDark } = useTheme(); // Dark mode context
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });

  // Fetch created courses count
  const { data: createdCourses = [] } = useQuery({
    queryKey: ['myCourses', user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/courses/instructor/${user.email}`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!user?.email
  });

  // Fetch enrolled courses count
  const { data: enrolledCourses = [] } = useQuery({
    queryKey: ['enrolledCourses', user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/enroll/${user.email}`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!user?.email
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-[#F8FAFC] text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className={`rounded-2xl p-8 mb-6 transition-colors duration-300 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img
                  src={user?.photoURL || `https://via.placeholder.com/120x120/3B82F6/FFFFFF?text=${user?.displayName?.charAt(0) || 'U'}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto border-4 border-[#3B82F6] shadow-lg"
                />
              </div>
              <h1 className={`text-3xl font-bold mt-4 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-[#1F2937]'}`}>My Profile</h1>
              <p className={`mt-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account information</p>
            </div>

            {/* Profile Information */}
            {!isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-4 rounded-xl transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-[#F8FAFC]'}`}>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                    <p className={`text-lg font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-[#1F2937]'}`}>{user?.displayName || 'Not provided'}</p>
                  </div>
                  <div className={`p-4 rounded-xl transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-[#F8FAFC]'}`}>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                    <p className={`text-lg font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-[#1F2937]'}`}>{user?.email}</p>
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-[#F8FAFC]'}`}>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Profile Photo URL</label>
                  <p className={`text-sm break-all transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{user?.photoURL || 'Using default avatar'}</p>
                </div>

                <div className={`p-4 rounded-xl transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-[#F8FAFC]'}`}>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Account Created</label>
                  <p className={`text-lg font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-[#1F2937]'}`}>
                    {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            ) : (
              /* Edit Form */
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-300 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500'} focus:ring-2 focus:border-transparent`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Profile Photo URL</label>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-300 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500'} focus:ring-2 focus:border-transparent`}
                      placeholder="Enter photo URL"
                    />
                  </div>

                  <div className={`p-4 rounded-xl border transition-colors duration-300 ${isDark ? 'bg-gray-800 border-yellow-600' : 'bg-[#FEF3C7] border-[#F59E0B]'}`}>
                    <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-[#92400E]'}`}>
                      <strong>Note:</strong> Email address cannot be changed. Contact support if you need to update your email.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                  >
                    {updating ? 'Updating...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        displayName: user?.displayName || '',
                        photoURL: user?.photoURL || ''
                      });
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-xl shadow-md text-center transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-3xl font-bold text-[#3B82F6] mb-2">{enrolledCourses.length}</div>
              <div className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Courses Enrolled</div>
            </div>
            <div className={`p-6 rounded-xl shadow-md text-center transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-3xl font-bold text-[#10B981] mb-2">{createdCourses.length}</div>
              <div className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Courses Created</div>
            </div>
            <div className={`p-6 rounded-xl shadow-md text-center transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-3xl font-bold text-[#F59E0B] mb-2">{enrolledCourses.length}</div>
              <div className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Certificates Earned</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
