// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoGallery from '@/components/PhotoGallery';
import useFetchPhotos from '@/hooks/useFetchPhotos';
import './App.css';

function App() {
  const { photos, fetchPhotos, hasMore, loading } = useFetchPhotos();
  return (
    <Router>
      <div className="flex w-full h-screen">
        <Routes>
          <Route
            path="/photos"
            element={
              <PhotoGallery
                photos={photos}
                fetchPhotos={fetchPhotos}
                hasMore={hasMore}
                loading={loading}
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
