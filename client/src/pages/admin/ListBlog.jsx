import React, { useState, useEffect } from 'react';
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../admin/BlogTableItem';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    // In a real app, replace this with API call
    setBlogs(blog_data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="text-xl font-semibold mb-4">All Blogs</h1>

      <div className="relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-4">#</th>
              <th scope="col" className="px-2 py-4">Blog Title</th>
              <th scope="col" className="px-2 py-4">Date</th>
              <th scope="col" className="px-2 py-4">Status</th>
              <th scope="col" className="px-2 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {blogs && blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-2 py-4 text-center text-gray-400">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
