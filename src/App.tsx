import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoGallery from '@/components/PhotoGallery';
import useFetchPhotos from '@/hooks/useFetchPhotos';
import './App.css';

function App() {
  const { photos, fetchPhotos, hasMore, loading, error } = useFetchPhotos();

  return (
    <Router>
      <div className="flex flex-col w-full h-screen">
        <Routes>
          <Route
            path="/photos"
            element={
              <PhotoGallery
                photos={photos}
                fetchPhotos={fetchPhotos}
                hasMore={hasMore}
                loading={loading}
                error={error}  // Pass error to PhotoGallery
              />
            }
          />
          <Route path="*" element={<Navigate to="/photos" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
