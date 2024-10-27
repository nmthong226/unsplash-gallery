// src/hooks/useFetchPhotos.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
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
      const newPhotos = response.data.map((photo: any) => ({
        id: photo.id,
        urls: photo.urls,
        author: {
          username: photo.user.username,
          avatar: photo.user.profile_image.small,
        },
        title: photo.description || photo.alt_description || '',
        description: photo.description || photo.alt_description || '',
        topic: photo.topic_submissions.title || '',
        date: new Date(photo.updated_at),
        likes: photo.likes,
        slug: photo.alternative_slugs.en
      }));
      setPhotos((prevPhotos) => {
        const uniquePhotos = newPhotos.filter(
          (newPhoto: any) => !prevPhotos.some((photo) => photo.id === newPhoto.id)
        );
        return [...prevPhotos, ...uniquePhotos];
      });

      setHasMore(newPhotos.length === 10); // If fewer than 10 photos, no more pages
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching photos from Unsplash:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return { photos, fetchPhotos, hasMore, loading };
};

export default useFetchPhotos;