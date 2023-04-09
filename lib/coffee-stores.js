import { createApi } from "unsplash-js";
// import nodeFetch from "node-fetch";

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	// fetch: nodeFetch, // optional
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStoresPhotos = async () => {
	const photos = await unsplash.search.getPhotos({
		query: "coffee",
		page: 1,
		perPage: 30,
		color: "green",
		orientation: "portrait",
	});
	return photos.response.results.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async () => {
	const photos = await getListOfCoffeeStoresPhotos();
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: process.env.FOURSQUARE_API_KEY,
		},
	};

	const response = await fetch(
		getUrlForCoffeeStores(
			"55.68139607353823%2C12.556844966066258",
			"coffee",
			6
		),
		options
	);
	const data = await response.json();
	return data.results.map((result, i) => {
		const neighborhood = result.location.neighborhood;
		return {
			id: result.fsq_id,
			name: result.name,
			address: result.location.address,
			neighborhood: neighborhood?.length > 0 ? neighborhood[0] : "",
			imgUrl: photos.length > 0 ? photos[i] : null,
		};
	});
};
