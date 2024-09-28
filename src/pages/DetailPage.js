import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDetail from '../hooks/useFetchDetail';
import { useSelector } from 'react-redux';

const DetailPage = () => {
  const params = useParams()
  const apiKey = 'ef88283ea555ea9ec60c7779aebf954c';
  const type = params.explore === 'movie' ? 'movie' : 'tv';
  const imageURL = useSelector(state => state.movieData.imageURL)
  const { data } = useFetchDetail(`https://api.themoviedb.org/3/${type}/${params.id}?api_key=${apiKey}`)
  const {data :castData} = useFetchDetail(`https://api.themoviedb.org/3/${type}/${params.id}?api_key=${apiKey}`)

  console.log("data", data);
  console.log("start cast", castData)


  return (
    <div>
      {data && (
        <div>
          <h1>{type === 'movie' ? data.title : data.name}</h1>
          <p>{data.overview}</p>
        
        </div>
      )}
    </div>
  );
};

export default DetailPage;
