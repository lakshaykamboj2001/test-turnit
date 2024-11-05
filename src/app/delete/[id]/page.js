"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DeletePost = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Extract 'id' from 'params'
  const [isDeleting, setIsDeleting] = useState(false); // To track the deletion state

  useEffect(() => {
    if (id && !isDeleting) {
      const deletePost = async () => {
        // Set the flag to true to prevent multiple confirmations
        setIsDeleting(true);

        // Show a confirmation dialog to the user
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        console.log("confirmDelete", confirmDelete);

        if (confirmDelete) {
          try {
            const response = await fetch(`http://localhost:3001/posts/${id}`, {
              method: 'DELETE',
            });

            if (response.ok) {
              // Post deleted successfully, redirect to the home page
              router.push('/');
            } else {
              console.error('Error deleting post:', response.statusText);
            }
          } catch (error) {
            console.error('Error deleting post:', error);
          }
        } else {
          // User canceled the deletion, redirect to home page
          router.push('/');
        }
      };

      deletePost();
    }
  }, [id, isDeleting, router]);

  return (
    <div>
      <h1>Deleting post {id}...</h1>
    </div>
  );
};

export default DeletePost;
