import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerHome = () => {
    const bannerData = useSelector(state => state.movieData.bannerData);
    // console.log(bannerData)
    const imageURL = useSelector(state => state.movieData.imageURL);
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(prev => prev + 1);
        } else {
            setCurrentImage(0); // Loop back to the first image
        }
    };

    const handlePrev = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1);
        } else {
            setCurrentImage(bannerData.length - 1); // Loop back to the last image
        }
    };

    useEffect(()=>{
        const interval = setInterval(()=>{
            if (currentImage < bannerData.length - 1) {
                handleNext()
            }else{
                setCurrentImage(0)
            }
        },4000)

        return ()=> clearInterval(interval)
    },[bannerData,imageURL])

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full overflow-hidden'>
                {bannerData.map((data, index) => {
                    // console.log("data",data)
                    const title = data.title || data.name;

                    return (
                        <div
                            className='min-w-full min-h-[450px] lg:h-full overflow-hidden relative'
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                            key={data.id+"bannerHome"+index}
                        >
                            <div className='w-full h-full'>
                                <img
                                    src={imageURL + data.backdrop_path}
                                    className='h-full w-full object-cover'
                                    alt={title}
                                />
                            </div>

                            {/* Navigation buttons */}
                            <div className='absolute top-0 w-full h-full flex items-center justify-between p-4'>
                                <button onClick={handlePrev} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                                    <FaAngleLeft />
                                </button>
                                <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                                    <FaAngleRight />
                                </button>
                            </div>

                            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

                            <div className='container mx-auto'>
                                <div className='absolute bottom-0 max-w-md px-3 text-white'>
                                    <h2 className='font-bold text-2xl lg:text-4xl drop-shadow-2xl'>{title}</h2>
                                    <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                    <div className='flex items-center gap-4'>
                                        <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                        <span>|</span>
                                        <p>View: {Number(data.popularity).toFixed(0)}</p>
                                    </div>
                                    <button className='px-4 py-2 text-black font-bold rounded mt-4 bg-white hover:bg-gradient-to-l from-blue-500 to-blue-200 shadow-md transition-all'>
                                        Play Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default BannerHome;
