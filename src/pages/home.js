import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import axios from 'axios';
import useFetch from '../hooks/useFetch';


const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData);
  const { data : nowPlayingData } = useFetch('/movie/now_playing')
  const { data : topRatedMovie } = useFetch('/movie/top_rated')
  const { data : topRatedTv } = useFetch('/tv/top_rated')

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true}/>
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"}/>
      <HorizontalScrollCard data={topRatedMovie} heading={"Top Rated Movies"}/>
      <HorizontalScrollCard data={topRatedTv} heading={"Top Rated Tv Shows"}/>
    </div>
  )
}

export default Home;

