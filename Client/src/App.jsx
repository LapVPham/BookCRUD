import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Book from "./routes/Book/book";
import SingleBook from "./routes/Book/singleBook";
import CreateBook from "./routes/Book/createBook";
import EditBook from "./routes/Book/editBook";
function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/book" element={<Book />} />
					<Route path="/book/:slug" element={<SingleBook />} />
					<Route path="/createbook" element={<CreateBook />} />
					<Route path="/editbook/:slug" element={<EditBook/>}/>
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
