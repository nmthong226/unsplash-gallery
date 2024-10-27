// PhotoDetail.tsx
import React from 'react';
import { IoClose } from 'react-icons/io5';
import DownloadButton from '../ui/DownloadButton';


interface PhotoDetailProps {
  selectedPhoto: Photo | null;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhotoDetail: React.FC<PhotoDetailProps> = ({ selectedPhoto, showModal, setShowModal }) => {
  if (!selectedPhoto) return <div>Photo not found</div>;
  const downloadOptions = [
    { label: 'Large', subLabel: '(2400 x 3000)', url: selectedPhoto.urls.full },
    { label: 'Regular', subLabel: '(1920 x 2400)', url: selectedPhoto.urls.regular },
    { label: 'Small', subLabel: '(640 x 800)', url: selectedPhoto.urls.small },
  ];
  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <button
              className="absolute p-2 top-4 left-4 bg-black/20 hover:bg-black/30 rounded-full border-0 text-white opacity-100 text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <IoClose className='size-6' />
            </button>
            <div className="relative mx-auto w-[1280px]">
              <div className="border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none relative">
                <div className="flex items-center justify-between py-3 px-5 rounded-t">
                  <h3 className="flex">
                    <img src={selectedPhoto.author.avatar} alt={selectedPhoto.author.username} className='w-8 h-8 rounded-full mr-2' />
                    <p>{selectedPhoto.author.username}</p>
                  </h3>
                  <DownloadButton imageUrl={selectedPhoto.urls.raw} sizes={downloadOptions} label="Download" />
                </div>
                <div className="flex items-center justify-center relative p-6 flex-auto">
                  <img src={selectedPhoto.urls.full} alt={selectedPhoto.title} className="w-auto h-[540px] object-cover" />
                </div>
                <div className="flex items-center justify-between p-6 rounded-b text-sm">
                  <div className='flex space-x-20'>
                    <div className='flex flex-col'>
                      <p className='text-gray-500'>Updated at</p>
                      <p>{selectedPhoto.date.toLocaleDateString()}</p>
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-gray-500'>Likes</p>
                      <p>{selectedPhoto.likes}</p>
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-gray-500'>Topic</p>
                      <p>{selectedPhoto.topic ? selectedPhoto.topic : 'N/A'}</p>
                    </div>
                  </div>
                  <div className='flex w-[500px] justify-end'>
                    <div className='flex flex-col'>
                      <p className='flex text-gray-500 justify-end'>Description</p>
                      <p className='w-full line-clamp-1'>{selectedPhoto.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default PhotoDetail;
