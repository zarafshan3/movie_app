import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);[]
  const [totalPageNo, setTotalPageNo] = useState(0);

  const fetchData = async () => {
    try {
      const type = params.explore === 'movie' ? 'movie' : 'tv';
      const response = await axios.get(`discover/${type}`, {
        params: {
          page: pageNo,
        },
      });
      setData((prev) => [...prev, ...response.data.results]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setData([]);
    setPageNo(1);
    fetchData();
  }, [pageNo, params.explore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup
    };
  }, []);

  return (
    <div className='py-16 flex justify-center'>
      <div className='w-full max-w-screen-lg'>
        <h3 className='capitalize text-lg font-semibold my-3'>
          Popular {params.explore === 'movie' ? 'Movies' : 'TV Shows'}
        </h3>

        <div className='grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6 justify-center lg:justify-start'>
          {data.map((exploreData) => (
            <Card data={exploreData} key={exploreData.id + "exploreSECtion"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
