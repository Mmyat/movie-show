"use client"; // Make it a client component
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  
  const [popularIndex, setPopularIndex] = useState(0); // Separate index for popular movies
  const [trendingIndex, setTrendingIndex] = useState(0); // Separate index for trending movies

  const posterUrl = "https://image.tmdb.org/t/p/w342";
  const apiKey = "a9f349c5e40a298d426a92d2b800bba7";

  // Fetch popular movies
  async function fetchPopular() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    return await res.json();
  }

  // Fetch trending movies
  async function fetchTrending() {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`);
    return await res.json();
  }

  useEffect(() => {
    async function fetchData() {
      const popular = await fetchPopular();
      const trending = await fetchTrending();
      
      setPopularMovies(popular.results);
      setTrendingMovies(trending.results);
    }
    fetchData();
  }, []);

  // // Autoplay logic for popular movies
  // useEffect(() => {
  //   if (popularMovies.length > 0) {
  //     const interval = setInterval(() => {
  //       setPopularIndex((prevIndex) => (prevIndex + 1) % popularMovies.length);
  //     }, 2000);
  //     return () => clearInterval(interval); // Clean up
  //   }
  // }, [popularMovies.length]);

  // // Autoplay logic for trending movies
  // useEffect(() => {
  //   if (trendingMovies.length > 0) {
  //     const interval = setInterval(() => {
  //       setTrendingIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
  //     }, 2000);
  //     return () => clearInterval(interval); // Clean up
  //   }
  // }, [trendingMovies.length]);

  const handleNextPopular = () => {
    setPopularIndex((prevIndex) => (prevIndex + 1) % popularMovies.length);
  };

  const handlePreviousPopular = () => {
    setPopularIndex(
      (prevIndex) => (prevIndex - 1 + popularMovies.length) % popularMovies.length
    );
  };

  const handleNextTrending = () => {
    setTrendingIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
  };

  const handlePreviousTrending = () => {
    setTrendingIndex(
      (prevIndex) => (prevIndex - 1 + trendingMovies.length) % trendingMovies.length
    );
  };

  if (!popularMovies.length || !trendingMovies.length) return <div>Loading...</div>;

  return (
    <div className="z-0">
      {/* Popular Movies Carousel */}
      <h3 className="font-bold border-b mb-4 pb-2">Popular Movies</h3>
      <Carousel opts={{align: "start",loop: false}} plugins={[Autoplay({ delay: 3000})]} className="">
        <CarouselContent
          className="flex transition-transform ease-in-out duration-500"
          style={{
            transform: `translateX(-${popularIndex * 100}%)`,
          }}>
          {popularMovies.map((movie, index) => (
            <CarouselItem key={index} className="flex md:basis-1/2 lg:basis-1/3">
              <div>
                <Card>
                  <CardContent className="flex flex-col w-full h-1/3 aspect-square items-center justify-center">
                    <img
                      src={`${posterUrl}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto"
                    />
                    <h4>{movie.title}</h4>
                    <span className="text-sm text-gray-500">
                      {movie.release_date.split("-")[0]}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Trending Movies Carousel */}
      <h3 className="font-bold border-b my-4 pb-2">Trending Movies</h3>
      <Carousel opts={{align: "start",loop: false}} plugins={[Autoplay({ delay: 3000})]}>
        <CarouselContent
          className="flex transition-transform ease-in-out duration-500"
          style={{
            transform: `translateX(-${trendingIndex * 100}%)`,
          }}
        >
          {trendingMovies.map((movie, index) => (
            <CarouselItem key={index} className="flex md:basis-1/2 lg:basis-1/3">
              <div>
                <Card>
                  <CardContent className="flex flex-col w-full h-1/3 aspect-square items-center justify-center">
                    <img
                      src={`${posterUrl}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto"
                    />
                    <h4>{movie.title}</h4>
                    <span className="text-sm text-gray-500">
                      {movie.release_date.split("-")[0]}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
