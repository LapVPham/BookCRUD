const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
	title: {
		type: String,
		require: true,
	},
	slug: {
		type: String,
		// require: true,
	},
	description: {
		type: String,
		// require: true,
	},
	thumbnail: {
		type: String,
		// require: true,
	},
	stars: {
		type: Number,
		// require: true,
	},
	category: {
		type: Array,
		// require: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Book", BookSchema);
