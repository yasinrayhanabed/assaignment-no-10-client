# LearnVerse - Online Learning Platform

The Live Site URL is :- https://online-learning-platform-2b49a.web.app/my-enrolled-courses  

LearnVerse is a modern online learning platform designed to empower learners worldwide with high-quality education, interactive courses, and innovative learning experiences. This platform supports both learners and instructors, providing seamless authentication, course management, and dynamic features for an enhanced learning experience.

---

## Features

- **Dynamic Authentication**
  - Users can sign up and log in using Email/Password or Google authentication.
  - Password validation includes uppercase, lowercase, and minimum 6 characters.
  - Toast notifications for success and error messages.

- **Course Management**
  - Instructors can **add, update, delete, and view courses**.
  - Courses include details like title, image, price, duration, category, and description.
  - “My Courses” and “My Enrolled Courses” sections for personalized dashboards.
  - Data is stored in **MongoDB**, with images handled via **ImgBB**.

- **Home Page & UI**
  - Hero/Banner section with engaging animations using **Framer Motion/AOS**.
  - Featured Courses section highlighting 6 popular courses.
  - Static sections: *Why Choose Us* and *Top Instructors*.
  - Responsive layout with Tailwind CSS.
  - Consistent card, button, and image design with proper spacing and alignment.

- **Advanced Features**
  - Filter courses by category on All Courses page.
  - Dark/Light theme toggle for user preference.
  - Loading spinners when fetching data.
  - Dynamic page titles for better UX.
  - Private routes for authenticated users.
  - Optional: Course rating/review system, certificate generation, student progress tracking.

- **Dashboard**
  - Instructor dashboard: Add Course, My Added Courses.
  - Student dashboard: My Enrolled Courses.
  - Private routes with role-based navigation links.
  - Toast notifications for all CRUD operations.

---

## Project Structure

- **src/components/** – Reusable UI components like Navbar, Footer, CourseCard, LoadingSpinner.
- **src/pages/** – Pages: Home, Login, Register, AddCourse, MyCourses, AllCourses, ViewCourse, Dashboard.
- **src/contexts/** – AuthContext for Firebase authentication.
- **src/firebase.js** – Firebase initialization and Auth export.
- **src/styles/** – Tailwind CSS configuration and custom styles.
- **.env** – Environment variables for Firebase configuration.

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, Framer Motion, AOS, React Router
- **Backend & Database:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Auth (Email/Password + Google)
- **API Requests:** Axios / TanStack Query
- **Image Uploads:** ImgBB
- **Notifications:** react-hot-toast

---

## How to Run

1. Clone the repository:

```bash
git clone :- https://github.com/yasinrayhanabed/assaignment-no-10-client
