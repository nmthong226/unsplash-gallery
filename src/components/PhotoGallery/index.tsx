import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import PhotoDetail from '@/components/PhotoDetail';
import './style.css';
import ThemeButton from '../ui/ThemeButton';
import { useNavigate } from 'react-router-dom';

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
    const [userData, setUserData] = useState<any>(null);  // New state for user data
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        // Fetch user data from local storage
        const storedUser = localStorage.getItem('user');
        console.log(storedUser);
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setUserData(null);
        setDropdownVisible(false);
    };


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
        setSelectedPhoto(null);
        window.history.replaceState(null, '', '/photos');
    };

    useEffect(() => {
        const handlePopState = () => {
            setShowModal(false);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        const currentPath = window.location.pathname;
        const photoSlug = currentPath.split('/').pop();

        const photo = photos.find((p) => p.slug === photoSlug);
        if (photo) {
            setSelectedPhoto(photo);
            setShowModal(true);
        }
    }, [photos, selectedPhoto]);

    const navigate = useNavigate();
    const navigateToSignUp = () => {
        navigate('/sign-up', { replace: true });
    }
    const navigateToSignIn = () => {
        navigate('/login', { replace: true });
    }
    return (
        <div className="flex flex-col w-full p-2 px-0 md:px-20 lg:px-40 h-full items-center">
            <div className='relative flex flex-row items-center justify-center my-10 p-2 bg-gray-50 border rounded-lg w-full'>
                <ThemeButton toggleTheme={() => { }} className='absolute top-1/2 left-2 transform -translate-y-1/2' />
                <div className='flex flex-col justify-center items-center'>
                    <h1 className="flex items-center text-lg lg:text-xl font-bold">Unsplash Gallery</h1>
                    <a
                        href='https://github.com/nmthong226'
                        target='_blank'
                        className='font-thin text-sm text-gray-700'>
                        nmthong226
                    </a>
                </div>
                {!userData ? (
                    <div className='flex absolute top-1/2 right-2 transform -translate-y-1/2 space-x-1'>
                        <button
                            onClick={navigateToSignUp}
                            className=' text-zinc-900 hover:text-zinc-600 py-1 px-4 rounded-lg'>
                            Sign up
                        </button>
                        <button
                            onClick={navigateToSignIn}
                            className=' bg-zinc-900 text-white hover:bg-white hover:text-zinc-900 hover:border-zinc-900 border border-gray-50  py-1 px-4 rounded-lg'>
                            Log In
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center absolute top-1/2 right-2 transform -translate-y-1/2 space-x-1">
                        <p className="text-[13px] text-gray-600 mr-2">{userData?.user.name}</p>
                        <div className="relative">
                            <div
                                className="flex p-2 rounded-full border bg-white cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                <img
                                    width="20"
                                    height="20"
                                    src="https://img.icons8.com/material-rounded/24/user.png"
                                    alt="user"
                                />
                            </div>
                            {dropdownVisible && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-20">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {error && <div className="error-message text-red-500 mb-4">{error}</div>}

            <InfiniteScroll
                dataLength={photos.length}
                next={fetchPhotos}
                hasMore={hasMore}
                loader={'Loading...'}
                endMessage={<p>No more photos to display.</p>}
                className="w-full"
            >
                <Masonry
                    key={photos.length}
                    breakpointCols={masonryBreakpoints}
                    className="flex gap-6 masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            onClick={() => handlePhotoClick(photo)}
                            className="relative group hover:cursor-zoom-in overflow-hidden rounded-md mb-4"
                            title={`${photo.title}`}
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
