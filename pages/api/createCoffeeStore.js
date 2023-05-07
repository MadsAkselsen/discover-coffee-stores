import {
	airTable,
	getMinifiedRecords,
	findRecordByFilter,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
	const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

	try {
		if (req.method === "POST") {
			// find a record
			if (id) {
				const records = await findRecordByFilter(id);

				if (records.length !== 0) {
					res.json(records);
				} else {
					// create a record
					if (name) {
						const createRecords = await airTable.create([
							{
								fields: {
									id,
									name,
									address,
									neighbourhood,
									voting,
									imgUrl,
								},
							},
						]);
						const records = getMinifiedRecords(createRecords);
						res.json(records);
					} else {
						res.status(400);
						res.json({ message: "Id or name is missing" });
					}
				}
			} else {
				res.status(400);
				res.json({ message: "Id is missing" });
			}
		}
	} catch (error) {
		console.error("Error creating or finding a store", error);
		res.status(500);
		res.json({ message: "Error creating or finding a store", error });
	}
};

export default createCoffeeStore;
