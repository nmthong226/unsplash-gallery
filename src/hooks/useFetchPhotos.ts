// src/hooks/useFetchPhotos.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to track errors

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null); // Reset error before each request
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
          per_page: 10,
          page,
        },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      });

      const newPhotos = response.data.map((photo: any) => {
        const topicKey = photo.topic_submissions ? Object.keys(photo.topic_submissions)[0] : '';
        const topic = topicKey ? topicKey.replace(/-/g, ' ') : ''; // Replace hyphens with spaces if needed
        return {
          id: photo.id,
          urls: photo.urls,
          author: {
            username: photo.user.username,
            avatar: photo.user.profile_image.small,
          },
          title: photo.description || photo.alt_description || '',
          description: photo.description || photo.alt_description || '',
          topic: topic,
          date: new Date(photo.updated_at),
          likes: photo.likes,
          slug: photo.alternative_slugs?.en || '',
        };
      });

      setPhotos((prevPhotos) => {
        const uniquePhotos = newPhotos.filter(
          (newPhoto: any) => !prevPhotos.some((photo) => photo.id === newPhoto.id)
        );
        return [...prevPhotos, ...uniquePhotos];
      });

      setHasMore(newPhotos.length === 10); // If fewer than 10 photos, no more pages
      setPage((prevPage) => prevPage + 1);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          setError('Access denied. Please check your API key.');
          setHasMore(false); // Stop further fetches
        } else if (error.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('An error occurred while fetching photos.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error fetching photos from Unsplash:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return { photos, fetchPhotos, hasMore, loading, error };
};

export default useFetchPhotos;