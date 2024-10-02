import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDetail from '../hooks/useFetchDetail';
import { useSelector } from 'react-redux';

const DetailPage = () => {
  const params = useParams()
  const apiKey = 'ef88283ea555ea9ec60c7779aebf954c';
  const type = params.explore === 'movie' ? 'movie' : 'tv';
  const imageURL = useSelector(state => state.movieData.imageURL)
  const { data } = useFetchDetail(`https://api.themoviedb.org/3/${type}/${params?.id}?api_key=${apiKey}`)
  const { data: castData } = useFetchDetail(`https://api.themoviedb.org/3/${type}/${params?.id}/credits?api_key=${apiKey}`)

  console.log("data", data);
  console.log("start cast", castData)

  const duration = (Number(data.runtime)/60).toFixed(1).split(".")


  return (
    <div>

      <div className='w-full h-[500px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img
            src={imageURL + data?.backdrop_path}
            className='h-full w-full object-cover'
          />
          <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
        </div>
      </div>
      <div className='container mx-auto px-3'>
          <div className='lg:-mt-28 relative'>
            <img
              src={imageURL + data?.poster_path}
              className='h-85 w-80 object-cover rounded'
            />
          </div>

          <div>
            <h2 className='text-2xl font-bold text-white'>{data.title || data.name}</h2>
            <p className='text-neutral-400'>{data.tagline}</p>

            <div>
              <p>
                Rating : {Number(data.vote_average).toFixed(1)}
              </p>
              <p>
                View : {Number(data.vote_count)}
              </p>
              <p>
                Duration : {duration[0]}h {duration[1]}m
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default DetailPage;
