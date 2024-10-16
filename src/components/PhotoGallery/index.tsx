import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * PhotoGallery component
 *
 * @returns {JSX.Element} The component
 */
const PhotoGallery = (): JSX.Element => {
    const [photos, setPhotos] = useState<string[]>([]);

    console.log(import.meta.env.VITE_UNSPLASH_ACCESS_KEY);
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/photos', {
                    params: {
                        per_page: 10, // Number of photos you want to fetch
                    },
                    headers: {
                        Authorization: `Client-ID YWEdU2q9YaOcvslvfO-SwVN77sxfD4rQpJ3RDsI42Kc`, // Authorization header with your access key
                    },
                });
                
                const photoUrls = response.data.map((photo: any) => photo.urls.small); // Get small-sized images
                setPhotos(photoUrls);
            } catch (error) {
                console.error('Error fetching photos from Unsplash:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div className="flex flex-col w-full h-full items-center m-10">
            <h1 className="text-3xl font-bold underline">Unsplash Gallery</h1>
            <p>Photo Gallery:</p>
            <div className="grid grid-cols-3 gap-4">
                {photos.length > 0 ? (
                    photos.map((url, i) => <img key={i} src={url} alt={`Unsplash photo ${i + 1}`} className="rounded shadow-md" />)
                ) : (
                    <p>Loading photos...</p>
                )}
            </div>
        </div>
    );
};

export default PhotoGallery;