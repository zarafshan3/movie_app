import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieSlice';

function App() {
  const dispatch = useDispatch();
  const apiKey = 'ef88283ea555ea9ec60c7779aebf954c'; // Your TMDB API key
  const baseURL = 'https://api.themoviedb.org/3'; // Base URL for TMDB API

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get(`${baseURL}/trending/all/week?api_key=${apiKey}`);
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get(`${baseURL}/configuration?api_key=${apiKey}`);
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-[80vh]'>
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
