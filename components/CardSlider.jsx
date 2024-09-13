import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { useEffect, useRef } from "react";

const CardSlider = (movieList) => {
    const poster = "http://image.tmdb.org/t/p/w342";

  // Duplicate first and last movies for seamless looping
  const extendedMovieList = [
    movieList[movieList.length - 1], // Add last movie to the beginning
    ...movieList,
    movieList[0], // Add first movie to the end
  ];

  // Carousel logic (useRef for manual controls)
  const carouselRef = useRef(null);

  // UseEffect to automate the scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({
          left: carouselRef.current.offsetWidth, // Scroll by one item width
          behavior: "smooth",
        });
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth, // Scroll by one item width
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth, // Scroll by one item width in reverse
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative w-full max-w-sm overflow-hidden">
        <Carousel ref={carouselRef} className="w-full">
          <CarouselContent className="flex transition-all ease-in-out duration-500">
            {extendedMovieList.map((movie, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3 flex-shrink-0 w-full"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Link href={`/movie/${movie.id}`}>
                        <img
                          src={`${poster}${movie.poster_path}`}
                          className="w-full hover:scale-105 transition-all"
                          alt={movie.title}
                        />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <CarouselPrevious onClick={handlePrevious} />
        <CarouselNext onClick={handleNext} />
      </div>
    )
}

export default CardSlider