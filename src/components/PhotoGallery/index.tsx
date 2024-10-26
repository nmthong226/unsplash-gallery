import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import './style.css';

/**
 * PhotoGallery component
 *
 * @returns {JSX.Element} The component
 */
const PhotoGallery = (): JSX.Element => {
    const [photos, setPhotos] = useState<{ id: string; url: string }[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false); // New loading state

    const fetchPhotos = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get('https://api.unsplash.com/photos', {
                params: {
                    per_page: 10, // Limit to 10 photos per request
                    page,
                },
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
                },
            });

            const newPhotos = response.data.map((photo: any) => ({
                id: photo.id,
                url: photo.urls.small,
            }));

            setTimeout(() => {
                setPhotos((prevPhotos) => {
                    const uniquePhotos = newPhotos.filter(
                        (newPhoto : any) => !prevPhotos.some((photo) => photo.id === newPhoto.id)
                    );
                    return [...prevPhotos, ...uniquePhotos];
                });
                setLoading(false);
            }, 500);

            if (newPhotos.length < 10) {
                setHasMore(false);
            } else {
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error('Error fetching photos from Unsplash:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    // Define breakpoints for the masonry layout
    const masonryBreakpoints = {
        default: 3, // 3 columns for large screens
        1100: 2,    // 2 columns for medium screens
        700: 1      // 1 column for small screens
    };

    return (
        <div className="flex flex-col w-full h-full items-center m-10">
            <h1 className="text-3xl font-bold mb-4">Unsplash Gallery</h1>
            <InfiniteScroll
                dataLength={photos.length}
                next={fetchPhotos}
                loader={''}
                hasMore={hasMore}
                endMessage={<p>No more photos to display.</p>}
                className="w-full"
            >
                <Masonry
                    breakpointCols={masonryBreakpoints}
                    className="flex gap-6 masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {photos.map((photo) => (
                        <img
                            key={photo.id}
                            src={photo.url}
                            alt={`Unsplash photo ${photo.id}`}
                            className="rounded-md mb-4"
                        />
                    ))}
                </Masonry>
            </InfiniteScroll>
            {loading ?
                <div className='flex w-full justify-center mt-24'>
                    <p className='text-center text-3xl font-bold'>Loading more photos...</p>
                </div>
                :
                null
            }
        </div>
    );
};

export default PhotoGallery;
