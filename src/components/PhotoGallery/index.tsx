import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import PhotoDetail from '@/components/PhotoDetail';

interface PhotoGalleryProps {
    photos: Photo[];
    fetchPhotos: () => void;
    hasMore: boolean;
    loading: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
    photos,
    fetchPhotos,
    hasMore,
    loading,
}) => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [showModal, setShowModal] = useState(false);

    const masonryBreakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    };

    const handlePhotoClick = (photo: Photo) => {
        setSelectedPhoto(photo);
        setShowModal(true);
        window.history.pushState(null, '', `/photos/${photo.slug}`);
    };

    const closeModal = () => {
        setShowModal(false);
        window.history.replaceState(null, '', '/photos');
    };

    useEffect(() => {
        const handlePopState = () => {
            // Close modal if back button is clicked
            setShowModal(false);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <div className="flex flex-col w-full h-full items-center">
            <h1 className="text-3xl font-bold mb-4">Unsplash Gallery</h1>
            <InfiniteScroll
                dataLength={photos.length}
                next={fetchPhotos}
                hasMore={hasMore}
                loader={''}
                endMessage={<p>No more photos to display.</p>}
                className="w-full m-10"
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
