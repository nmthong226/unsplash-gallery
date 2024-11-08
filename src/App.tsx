// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import PhotoGallery from '@/components/PhotoGallery';
import NotFound from '@/pages/NotFound/NotFound';
import useFetchPhotos from '@/hooks/useFetchPhotos';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { photos, fetchPhotos, hasMore, loading, error } = useFetchPhotos();
  const { user, userLoading } = useAuth();

  return (
    <Router>
      <div className="flex flex-col w-full h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/photos" />} />
          <Route
            path="/photos/:slug"
            element={<PhotoDetailRedirect photos={photos} />}
          />
          <Route
            path="/photos"
            element={
              <PhotoGallery
                photos={photos}
                fetchPhotos={fetchPhotos}
                hasMore={hasMore}
                loading={loading}
                error={error}
                user={user}
                userLoading={userLoading}
              />
            }
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          stacked
          transition={Bounce}
        />
      </div>
    </Router>
  );
}

export default App;

const PhotoDetailRedirect = ({ photos }: { photos: Photo[] }) => {
  const { slug } = useParams();
  const isValidSlug = photos.some(photo => photo.slug === slug);
  return isValidSlug ? <Navigate to="/photos" /> : <NotFound />;
};
