"use client";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import Carousel from "react-multi-carousel";
import Autoplay from "embla-carousel-autoplay";
import api from "@/lib/apiClient/api";
import { endpoints } from "@/lib/apiClient/endpoint";
import Link from "next/link";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const popularPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const trendingPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  // Fetch popular movies
  async function fetchPopular() {
    const res = await api.get(`${endpoints.getPopularMovies}api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
    return res;
  }

  // Fetch trending movies
  async function fetchTrending() {
    const res = await api.get(`${endpoints.getTrendingMovies}api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
    return res;
  }

  useEffect(() => {
    async function fetchData() {
      const popular = await fetchPopular();
      const trending = await fetchTrending();
      setPopularMovies(popular.results);
      setTrendingMovies(trending.results.slice().reverse());
    }
    //   const reversedArray = images.slice().reverse();
    fetchData();
  }, []);

  if (!popularMovies.length || !trendingMovies.length) return <div>Loading...</div>;

  return (
    <div className="z-10">
      {/* Popular Movies Carousel (LTR) */}
      <h3 className="font-bold border-b mb-4 pb-2">Popular Movies</h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          direction: 'ltr',
          skipSnaps: true,
        }}
        plugins={[popularPlugin.current]}
        className="relative z-10"
      >
        <CarouselContent>
          {popularMovies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
              <Link href={`/movie/${movie.id}`}>
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-2">
                    <img
                      src={`${endpoints.posterUrl}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto"
                    />
                    <h4 className="mt-2 text-center">{movie.title}</h4>
                    <span className="text-sm text-gray-500">
                      {movie.release_date?.split("-")[0]}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Trending Movies Carousel (RTL) */}
      <h3 className="font-bold border-b my-4 pb-2">Trending Movies</h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          direction: "ltr",
          skipSnaps: true,
        }}
        plugins={[trendingPlugin.current]}
      >
        <CarouselContent>
          {trendingMovies.map((movie, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
              <Link href={`/movie/${movie.id}`}>
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-2">
                    <img
                      src={`${endpoints.posterUrl}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto"
                    />
                    <h4 className="mt-2 text-center">{movie.title}</h4>
                    <span className="text-sm text-gray-500">
                      {movie.release_date?.split("-")[0]}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}