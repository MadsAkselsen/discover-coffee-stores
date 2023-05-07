const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_KEY
);

const airTable = base("coffee-stores");
const getMinifiedRecord = (record) => {
	return {
		recordId: record.id,
		...record.fields,
	};
};

const getMinifiedRecords = (records) => {
	return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id) => {
	const findCoffeeStoreRecords = await airTable
		.select({
			filterByFormula: `id="${id}"`,
		})
		.firstPage();

	return getMinifiedRecords(findCoffeeStoreRecords);
};

export { airTable, getMinifiedRecords, findRecordByFilter };
