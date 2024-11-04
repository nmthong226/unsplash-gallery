import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import PhotoGallery from '@/components/PhotoGallery';
import NotFound from '@/pages/NotFound';
import useFetchPhotos from '@/hooks/useFetchPhotos';
import './App.css';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

function App() {
  const { photos, fetchPhotos, hasMore, loading, error } = useFetchPhotos();

  return (
    <Router>
      <div className="flex flex-col w-full h-screen">
        <Routes>
          {/* Redirect from "/" to "/photos" */}
          <Route path="/" element={<Navigate to="/photos" />} />
          {/* Handle photo detail slug */}
          <Route
            path="/photos/:slug"
            element={
              // Check if the slug is valid
              <PhotoDetailRedirect photos={photos} />
            }
          />
          {/* Main photo gallery */}
          <Route
            path="/photos"
            element={
              <PhotoGallery
                photos={photos}
                fetchPhotos={fetchPhotos}
                hasMore={hasMore}
                loading={loading}
                error={error}
              />
            }
          />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          {/* Catch-all route for invalid paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// New component to handle slug validation
const PhotoDetailRedirect = ({ photos }: { photos: Photo[] }) => {
  const { slug } = useParams();

  const isValidSlug = photos.some(photo => photo.slug === slug);

  return isValidSlug ? <Navigate to="/photos" /> : <NotFound />;
};
