import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
	try {
		const { latLong, limit } = req.query;
		const response = await fetchCoffeeStores(latLong, limit);
		console.log(
			"🚀 ~ file: getCoffeeStoresByLocation.js:7 ~ getCoffeeStoresByLocation ~ response:",
			response
		);
		res.status(200);
		res.json(response);
	} catch (err) {
		console.error("There is an error", err);
		res.status(500);
		res.json({ message: "Oh no! Something went wrong", err });
	}

	//return
};

export default getCoffeeStoresByLocation;
