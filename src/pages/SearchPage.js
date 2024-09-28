import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
    const location = useLocation()
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            //   const type = params.explore === 'movie' ? 'movie' : 'tv';
            const response = await axios.get(`search/collection`, {
                params: {
                    query: location?.search.slice(3),
                    page: 1
                },
            });
            setData((prev) => [...prev, ...response.data.results]);

        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [location.search])

    console.log("location",)
    return (
        <div className="py-16">
            <div className="container mx-auto">
                <h3 className='capitalize text-lg font-semibold my-3'>Search Results</h3>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6 justify-center lg:justify-start'>
                    {data.map((searchData) => (
                        <Card data={searchData} key={searchData.id + "search"} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchPage;