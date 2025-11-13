import { FaGraduationCap, FaUsers, FaChalkboardTeacher, FaAward, FaHeart, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDark } = useTheme();

  return (
    <div className={`pt-16 transition-colors duration-300 ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-base-100 text-gray-900'}`}>
      {/* Hero Section */}
      <section className={`bg-gradient-to-r from-primary to-secondary text-white py-20 shadow-lg`}>
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl font-extrabold mb-4 tracking-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className='text-blue-500'> About</span> <span className="text-yellow-400">LearnVerse</span>
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Empowering learners worldwide with quality education and innovative learning experiences.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-base-100 text-gray-900'}`}>
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            LearnVerse is a modern online learning platform designed to make quality education accessible to everyone,
            anywhere in the world. We believe that learning should be engaging, flexible, and tailored to individual needs.
          </motion.p>
          <motion.p
            className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Our mission is to provide high-quality courses that help learners develop new skills, advance their careers, and achieve their goals through innovative teaching and expert instruction.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-base-200'}`}>
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaGraduationCap />, title: 'Total Courses', value: '150+', color: 'text-primary' },
              { icon: <FaUsers />, title: 'Active Students', value: '25K+', color: 'text-secondary' },
              { icon: <FaChalkboardTeacher />, title: 'Expert Instructors', value: '75+', color: 'text-accent' },
              { icon: <FaAward />, title: 'Completion Rate', value: '92%', color: 'text-primary' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-8 text-center border ${
                  isDark ? 'bg-gray-900 border-gray-700' : 'bg-base-100 border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-5xl mx-auto mb-4 ${stat.color}`}>{stat.icon}</div>
                <p className="text-sm uppercase tracking-wide mb-2 text-gray-400">{stat.title}</p>
                <h3 className={`${stat.color} text-3xl font-extrabold`}>{stat.value}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaGraduationCap />,
                color: 'bg-gradient-to-r from-purple-600 to-blue-600',
                title: 'Quality Education',
                text: 'We are committed to providing the highest quality educational content and experiences.',
              },
              {
                icon: <FaHeart />,
                color: 'bg-gradient-to-r from-pink-500 to-red-500',
                title: 'Community Focus',
                text: 'We foster a supportive community where learners and instructors grow together.',
              },
              {
                icon: <FaLightbulb />,
                color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
                title: 'Innovation',
                text: 'We embrace innovative teaching methods and cutting-edge technology for better learning.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className={`text-center p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <motion.div 
                  className={`${value.color} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{value.title}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
