import React, { useEffect, useState } from 'react'
import axios from "axios";

import CustomPagination from "../../components/Pagination/CustomPagination";
import './Trending.css'; 
import SingleContent from '../../components/SingleContent/SingleContent';




const Trending = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);


  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      console.log(data.results);
      setContent(data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      setError('Error fetching trending movies. Please check your API key and network connection.');
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);


  return (
    <div>
      <span className='pageTitle'>Trending</span>
      {error ? (
        <div className='error'>{error}</div>
      ) : (
        <div className='trending'>
          {content &&
            content.map((cont) => (
<SingleContent
              key={cont.id}
              id={cont.id}
              poster={cont.poster_path}
              title={cont.title || cont.name}
              date={cont.first_air_date || cont.release_date}
              media_type={cont.media_type}
              vote_average={cont.vote_average}
            />            ))}
        </div>
      )}
            <CustomPagination setPage={setPage} />

    </div>
  );
};

export default Trending;

