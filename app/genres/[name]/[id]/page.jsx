import Movies from "@/components/Movies";
import api from "@/lib/apiClient/api";
import { endpoints } from "@/lib/apiClient/endpoint";

async function fetchMovies(id) {
	const res = await api.get(
		`${endpoints.getMovieByGenreId}${id}`);
	return res;
}

export default async function Home({ params }) {
	const byGenres = await fetchMovies(params.id);
	return (
		<>
			<h3 className="text-lg mb-3">{params.name}</h3>
			<Movies movies={byGenres.results} />
		</>
	);
}
