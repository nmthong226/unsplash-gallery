import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import PhotoDetail from '@/components/PhotoDetail';

interface PhotoGalleryProps {
    photos: Photo[];
    fetchPhotos: () => void;
    hasMore: boolean;
    loading: boolean;
    error?: string | null; // Add optional error prop
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
    photos,
    fetchPhotos,
    hasMore,
    loading,
    error,
}) => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [showModal, setShowModal] = useState(false);

    const masonryBreakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    };

    // Function to handle photo click event
    const handlePhotoClick = (photo: Photo) => {
        setSelectedPhoto(photo);
        setShowModal(true);
        window.history.pushState(null, '', `/photos/${photo.slug}`);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPhoto(null);
        window.history.replaceState(null, '', '/photos');
    };

    useEffect(() => {
        const handlePopState = () => {
            // When navigating back, close the modal
            setShowModal(false);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Check URL on component mount to set the modal if a photo slug is present
    useEffect(() => {
        const currentPath = window.location.pathname;
        const photoSlug = currentPath.split('/').pop(); // Get the last part of the URL

        // Find the photo with the matching slug
        const photo = photos.find((p) => p.slug === photoSlug);
        if (photo) {
            setSelectedPhoto(photo); 
            setShowModal(true);
        }
    }, [photos, selectedPhoto]);

    return (
        <div className="flex flex-col w-full p-2 h-full items-center">
            <div className='flex flex-col items-center justify-center my-10'>
                <h1 className="flex items-center text-lg md:text-xl lg:text-2xl font-bold">📷 Unsplash Gallery</h1>
                <p className='font-thin'>✨ nmthong226</p>
            </div>

            {error && <div className="error-message text-red-500 mb-4">{error}</div>} {/* Display error message */}

            <InfiniteScroll
                dataLength={photos.length}
                next={fetchPhotos}
                hasMore={hasMore}
                loader={''}
                endMessage={<p>No more photos to display.</p>}
                className="w-full"
            >
                <Masonry
                    breakpointCols={masonryBreakpoints}
                    className="flex gap-6 masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            onClick={() => handlePhotoClick(photo)}
                            className="relative group hover:cursor-pointer overflow-hidden rounded-md mb-4"
                        >
                            <img
                                src={photo.urls.small}
                                alt={`Unsplash photo ${photo.id}`}
                                className="w-full h-full object-cover transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md z-10">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center absolute bottom-4 left-4 text-white space-x-2">
                                        <img className="w-8 h-8 rounded-full" src={photo.author.avatar} alt={photo.author.username} />
                                        <span className="text-sm md:text-base">{photo.author.username}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Masonry>
            </InfiniteScroll>

            {loading && (
                <div className="flex w-full justify-center items-center mt-24">
                    <div className="w-16 h-16 border-[6px] border-dashed rounded-full border-t-blue-700 animate-spin"></div>
                </div>
            )}
            {showModal && selectedPhoto && (
                <PhotoDetail
                    selectedPhoto={selectedPhoto}
                    showModal={showModal}
                    setShowModal={closeModal}
                />
            )}
        </div>
    );
};

export default PhotoGallery;
