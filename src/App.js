import "./App.css";
import React, { useEffect } from "react";
import { createUser, getUser } from "./api/user";
import { getWalletAddress } from "./utils/wallet";
import { timeout } from "./utils/timeout";

function App() {
	async function signInUser() {
		await timeout(1);
		const address = await getWalletAddress();
		let user = await getUser(address);
		if (!user) user = await createUser(address);
	}

	useEffect(() => {
		signInUser();
	}, []);

	return (
		<div className="App">
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
		</div>
	);
}

export default App;
