"use client"
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:3001/posts');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);




 

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold  text-[50px] mb-[75px] mt-[40px]">Posts</h1>
      <ul className="space-y-4">
        <Link href={'/create'} className='p-[20px] rounded-[20px] bg-[skyblue] '>Add Post</Link>
    
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow max-w-[900px] m-[auto]">
            
            <div>id : ${post.id}</div>
            <h2 className="text-xl font-semibold ">{post.title}</h2>
            <p className='pb-[20px]'>{post.body}</p>
            <Link href={`/edit/${post.id}`}  className="py-3 px-6 bg-[#A5A5B9] m-10  rounded-[10px] text-[white]"  >Edit</Link>
            <Link  href={`/delete/${post.id}`} className="py-3  px-6 bg-[red] m-10  rounded-[10px] text-[white]"  >Delete</Link>
      
         
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
