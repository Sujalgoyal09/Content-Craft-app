import React, { useState } from 'react';
import { blog_data, blogCategories } from '../assets/assets';
import { motion } from "framer-motion";
import BlogCard from './BlogCard';

function BlogList() {
  const [menu, setMenu] = useState("All");

  return (
    <div className="max-w-7xl mx-auto">
      {/* Category Filter Buttons */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 transition-colors duration-200 ${
                menu === item && 'text-white px-4 pt-0.5'
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId='underline'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='absolute left-0 right-0 top-0 h-7 z-[-1] bg-primary rounded-full'
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 px-4 sm:px-8 xl:px-0">
        {blog_data
          .filter((blog) => menu === "All" ? true : blog.category === menu)
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
}

export default BlogList;
