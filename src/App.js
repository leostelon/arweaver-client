import "./App.css";
import "./screens/Explore.css";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/profile/:user" exact element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
