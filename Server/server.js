require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Books = require("./Models/Books");

const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Get all books
app.get("/api/books", async (request, response) => {
	try {
		const category = request.query.category;
		console.log(category);

		const filter = {};
		if (category) {
			filter.category = category;
		}

		const data = await Books.find(filter);
		response.json(data);
	} catch (error) {
		response.status(500).json({ error: "Error while fetch" });
	}
});
//Get one book/ detail
app.get("/api/books/:slug", async (request, response) => {
	try {
		const slugParam = request.params.slug;

		const data = await Books.findOne({ slug: slugParam });
		response.json(data);
	} catch (error) {
		response.status(500).json({ error: "Error while fetch" });
	}
});

// Create A Book
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

app.post(
	"/api/books",
	upload.single("thumbnail"),
	async (request, response) => {
		try {
			console.log(request.body);
			console.log(request.file);

			const newBook = new Books({
				title: request.body.title,
				slug: request.body.slug,
				stars: request.body.stars,
				description: request.body.description,
				category: request.body.category,
				thumbnail: request.file.filename,
			});

			await Books.updateOne(newBook);
			response.json("Data Submitted");
		} catch (error) {
			response
				.status(500)
				.json({ error: "An error occurred while fetching books." });
		}
	}
);

//edit book
app.put("/api/books", upload.single("thumbnail"), async (request, response) => {
	try {
		const bookId = request.body.bookId;

		const updateBook = {
			title: request.body.title,
			slug: request.body.slug,
			stars: request.body.stars,
			description: request.body.description,
			category: request.body.category,
		};
		if (request.file) {
			updateBook.thumbnail = request.file.filename;
		}

		await Books.findByIdAndUpdate(bookId, updateBook);
		response.json("Data Submitted");
	} catch (error) {
		response
			.status(500)
			.json({ error: "An error occurred while fetching books." });
	}
});

app.delete("/api/books/:id",
	async (request, response) => {
		const bookId = request.params.id;
		try {
			await Books.deleteOne({ _id: bookId });
			response.json("NOOOO dont do it" + request.body.bookId);
		} catch (error) {
			response.json(error);
		}
	});

app.get("/", (request, response) => {
	response.json("Hello");
});

app.get("*", (request, response) => {
	response.sendStatus("404 Not Found");
});

app.listen(PORT, () => {
	console.log(`Server is running on Port: ${PORT}`);
});
