"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";

const SideBarMenu = ({apikey,token}) => {
    const pathname = usePathname();
    const [data, setData] = useState([]);
    
    async function fetchGenres() {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=a9f349c5e40a298d426a92d2b800bba7`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
    });    
    setData(response.data);
    return;
}
    // Helper function to check if a link is active
    const isActive = (href) => {
        const isActive = pathname === href;   
        return isActive;
    };
    useEffect(() => {
        fetchGenres();
    }, [pathname]);
    return (
        <aside className="hidden md:block bg-gray-100 dark:bg-gray-900 w-full max-w-[200px] p-4 border-r border-gray-300 dark:border-gray-700 fixed inset-0 z-40 overflow-y-scroll">
            <Button variant="ghost" className="w-full justify-start mb-2">
                <Link 
                    href="/" 
                    className={`flex items-center gap-2 ${isActive("/") ? "text-cyan-400" : "text-gray-700"}`}
                >
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"></path>
                    </svg>
                    All Movies
                </Link>
            </Button>
            {data.genres?.map((genre) => {
                const href = `/genres/${genre.name}/${genre.id}`;
                return (
                    <Button
                        key={genre.id}
                        variant="ghost"
                        className="w-full justify-start gap-2"
                    >
                        <Link
                            href={href}
                            className={`flex items-center gap-2 ${isActive(href) ? "text-cyan-400" : "text-gray-700"}`}
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="text-[#2cb67d]"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"></path>
                            </svg>
                            {genre.name}
                        </Link>
                    </Button>
                );
            })}
        </aside>
    );
}

export default SideBarMenu;