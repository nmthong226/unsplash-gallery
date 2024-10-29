import { useEffect, useState } from 'react';
import BG_Error from '/BG_Error.jpg?url';
import './style.css'

function NotFound() {
    const [spotlightStyle, setSpotlightStyle] = useState({});
    useEffect(() => {
        const handleMouseMove = (e: any) => {
            // Get mouse page coordinates
            const percentageX = (e.pageX / window.innerWidth) * 100;
            const percentageY = (e.pageY / window.innerHeight) * 100;
            // Center the background spotlight on mouse coordinates
            setSpotlightStyle({
                backgroundImage: `radial-gradient(circle at ${percentageX}% ${percentageY}%, transparent 180px, rgba(0,0,0,0.75) 240px)`,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            className="relative flex justify-center items-center h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${BG_Error})`,
            }}>
            <div
                className="absolute inset-0 spotlight"
                style={spotlightStyle}
            />
            <div className='absolute flex flex-col items-center justify-center w-full h-full space-y-4 text-white'>
                <div className='relative'>
                    <p className='absolute font-bold text-6xl blur-sm'>Page not fou<span className='flicker'>n</span>d</p>
                    <p className='font-bold text-6xl '>Pag<span className='flicker'>e</span> not fou<span className='flicker-slow'>n</span>d</p>
                </div>
                <p className=''>Hmm, the page you were looking for doesn’t seem to exist anymore.</p>
                <a href="/" className='p-2 bg-white hover:bg-gray-100 text-black rounded-md'>Back to Homepage</a>
            </div>
        </div>
    );
}

export default NotFound;
