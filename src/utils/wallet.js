export async function connectWalletToSite() {
	try {
		if (!window.arweaveWallet) return;
		await window.arweaveWallet.connect(["ACCESS_ADDRESS"], {
			name: "Arweave Notifier",
			logo: "https://i.ibb.co/nfXX76j/mail-notification4831-1-1-1.jpg",
		});
	} catch (error) {
		console.log(error);
	}
}

export async function getWalletAddress() {
	try {
		if (!window.arweaveWallet) return;
		const userAddress = await window.arweaveWallet.getActiveAddress();
		return userAddress;
	} catch (error) {
		console.log(error);
		if (error.includes("permissions")) {
			await connectWalletToSite();
			return await getWalletAddress();
		}
	}
}
