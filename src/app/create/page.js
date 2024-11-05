"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import styles from './AddPost.module.css'
import { useRouter } from 'next/navigation';

const page = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const route = useRouter();
  
    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Create the post data
      const newPost = {
        title,
        body
      };
  
      // Send POST request to json-server
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
  
      const result = await response.json();
      console.log('New Post Added:', result);
      alert("New Post Added");
      route.push('/');

  
      // Reset form inputs
      setTitle('');
      setBody('');
    };
  
    return (
        <>

        <h1 className='font-bold m-auto'>
          Add Post
        </h1>
      <form onSubmit={handleSubmit}>
          <div className={styles.postParent}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className={styles.TitleText}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={styles.BodyText}
        ></textarea>
        <button type="submit" className={styles.button}>Add Post</button>
        </div>
      </form>


      </>
    );
}

export default page