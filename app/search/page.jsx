import Movies from "@/components/Movies";
import api from "@/lib/apiClient/api";
import { endpoints } from "@/lib/apiClient/endpoint";

async function fetchSearch(query) {
	const res = await api.get(`${endpoints.searchMovieByQuery}${query}`);
	return res;
}

export default async function Search({ searchParams }) {
	const search = await fetchSearch(searchParams.q);
	console.log("Search Results:", search);
	
	return (
		<>
			<h3 className="text-lg mb-3">Search: {searchParams.q}</h3>
			{search.results.length > 0 ? <Movies movies={search.results} /> : <p className="text-center text-xl text-orange-300 mb-4">Not found results</p>}
		</>
	);
}
