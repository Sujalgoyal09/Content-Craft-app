import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { blog_data, assets, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Moment from 'moment';
import Loader from '../components/Loader';

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async () => {
    const blogPost = blog_data.find(item => item._id === id);
    setData(blogPost);
  };

  const fetchComments = async () => {
    setComments(comments_data || []);
  };

  const addComment = async (e) => {
    e.preventDefault();

    // Simple client-side validation (already done by required attributes)
    if (!name.trim() || !content.trim()) return;

    // Create new comment object
    const newComment = {
      name: name.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    // Add to comments array (you can update this to post to backend later)
    setComments((prevComments) => [newComment, ...prevComments]);

    // Clear form fields
    setName('');
    setContent('');
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  if (!data) {
    return <div><Loader/></div>;
  }

  return (
    <div className='relative'>
      {/* Background */}
      <img
        src={assets.gradientBackground}
        alt="Background"
        className='absolute -top-50 -z-10 opacity-50 w-full h-full object-cover'
      />

      {/* Navbar */}
      <Navbar />

      {/* Blog Header */}
      <div className='text-center mt-20 text-gray-600 px-4'>
        <p className='text-primary py-4 font-medium'>
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
          {data.title}
        </h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          Michael Brown
        </p>
      </div>

      {/* Blog Content */}
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img
          src={data.image}
          alt={data.title}
          className='rounded-3xl mb-5 w-full object-cover'
        />
        <div
          className='rich-text max-w-3xl mx-auto'
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({comments.length})</p>
          {comments.map((item, index) => (
            <div
              key={index}
              className='relative bg-primary/20 border border-primary/5 max-w-xl p-4 rounded text-gray-600 mb-4'
            >
              <div className='flex items-center gap-2 mb-2'>
                <img
                  src={assets.user_icon}
                  alt='User Icon'
                  className='w-6 h-6 rounded-full'
                />
                <p className='font-medium'>{item.name}</p>
              </div>
              <p className='text-sm max-w-md ml-8'>{item.content}</p>
              <div className='ml-8 text-xs text-gray-400'>
                {Moment(item.createdAt).format('LLL')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Comment Form */}
      <div className='max-w-3xl mx-auto mb-20'>
        <p className='font-semibold mb-4'>Add your comment</p>
        <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            placeholder='Name'
            required
            className='w-full p-2 border border-gray-300 rounded outline-none'
          />

          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder='Comment'
            className='w-full p-2 border border-gray-300 rounded outline-none h-48 resize-none'
            required
          ></textarea>

          <button
            type='submit'
            className='bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer'
          >
            Submit
          </button>
        </form>
      </div>

      {/* Share Buttons */}
      <div className='my-24 max-w-3xl mx-auto'>
        <p className='font-semibold my-4'>Share this article on social media</p>
        <div className='flex gap-4'>
          <img src={assets.facebook_icon} width={50} alt='Facebook' />
          <img src={assets.twitter_icon} width={50} alt='Twitter' />
          <img src={assets.googleplus_icon} width={50} alt='Google Plus' />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
