"use client"

import React from 'react'
import styles from './AddPost.module.css'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router

const EditPost = ({params}) => {
  const router = useRouter();
  const { id } = params; // Extract 'id' from 'params' instead of router.query
  const [post, setPost] = useState({ title: '', body: '' });

  // Fetch the post data when the component mounts and 'id' is available
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`http://localhost:3001/posts/${id}`);
          const data = await response.json();
          setPost({ title: data.title, body: data.body });
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      fetchPost();
    }
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Handle form submission to update the post
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/posts/${id}`, {
        method: 'PUT', // or 'PATCH' if you only want to update part of the resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post), // Send the updated post data
      });

      if (response.ok) {
        console.log(`Post with id ${id} updated successfully`);
        router.push('/'); // Redirect to the home page or post listing after success
      } else {
        console.error('Error updating post:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h1>Edit Post {id}</h1>

      <form onSubmit={handleEdit}>
        <div className={styles.postParent}>
        <div >
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={post.title}
            className={styles.TitleText}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Body:</label>
          <textarea
            name="body"
            value={post.body}
            className={styles.BodyText}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit"  className={styles.button}>Update Post</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
