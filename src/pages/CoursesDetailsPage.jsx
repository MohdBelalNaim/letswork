import React from 'react'
import Header from './Header';
import Sidebar from '../components/Sidebar';
import Visited from '../components/Visited';
import Courses from '../components/Courses';
import CourseDetail from '../components/CourseDetail';
const CoursesPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-4 mt-2 max-sm:px-1">
        <aside className="hidden sm:block">
          <Sidebar />
        </aside>
        <main>
            <CourseDetail/>
        </main>
      </div>
    </div>
  );
}

export default CoursesPage
