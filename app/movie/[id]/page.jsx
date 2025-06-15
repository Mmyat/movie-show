'use client'
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/apiClient/api";
import { endpoints } from "@/lib/apiClient/endpoint";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function Movie({ params }) {
	const [movie, setMovie] = useState({});
	const [casts, setCasts] = useState([]);
	const cover = "http://image.tmdb.org/t/p/w1280";
	const profile = "http://image.tmdb.org/t/p/w185";
	const router = useRouter();

	const fetchMovie = async (id) => {
		const res = await api.get(`${endpoints.getMovieById}${id}`);
		setMovie(res);
	};

	const fetchCasts = async (id) => {
		const res = await api.get(`${endpoints.getMovieById}${id}/credits`);
		// The API response for credits usually has a 'cast' property which is an array
		setCasts(Array.isArray(res.cast) ? res.cast : []);
	};

	const handleBack = () => {
		router.back();
	};

	useEffect(() => {
		if (params?.id) {
			fetchMovie(params.id);
			fetchCasts(params.id);
		}
	}, [params?.id]);

	return (
		<div>
			<button className="bg-gray-200 py-2 px-4 rounded-lg cursor-pointer" onClick={handleBack}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
            </button>
			<h2>
				{movie?.title}
				<span className="ml-1">
					({movie?.release_date?.split("-")[0]})
				</span>
			</h2>
			<div className="mb-4 mt-2">
				{movie?.genres?.map(genre => {
					return (
						<Badge
							key={genre.id}
							variant="outline"
							className="mr-2">
							{genre.name}
						</Badge>
					);
				})}
			</div>
			<img
				src={`${cover}${movie?.backdrop_path}`}
				className="w-fit"
			/>
			<p className="mt-3">{movie?.overview}</p>
			<div className="mt-4 border-t pt-3">
				<h5 className="mb-2">Starring</h5>
				<div className="flex gap-4 flex-row flex-wrap">
					{casts?.map(cast => {
						return (
							<div className="w-[180px] bg-gray-100 text-center flex flex-col justify-between">
								{cast.profile_path ? (
									<img
										src={`${profile}${cast?.profile_path}`}
									/>
								) : (
									<div></div>
								)}
								<div className="p-2">
									<div className="text-sm">
										<Link href={`/person/${cast.id}`}>
											{cast?.name}
										</Link>
									</div>
									<span className="text-sm text-gray-500">
										{cast?.character}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
