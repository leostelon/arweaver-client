import { Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Othent } from "arweavekit/auth";
import GImg from "../assets/google-logo.png";
import { getWalletAddress } from "../utils/wallet";
import { createUser, getUser } from "../api/user";
import { timeout } from "../utils/timeout";
import { toast } from "react-toastify";

export const ConnectWalletDialog = ({ isOpen, handleExternalClose }) => {
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		handleExternalClose();
	};

	async function signInUser() {
		await timeout(1);
		const address = await getWalletAddress();
		if (address && address !== "") {
			cU(address);
		} else {
			toast("Please install ArConnect wallet.", { type: "info" });
		}
	}

	async function cU(address, email) {
		let user = await getUser(address);
		if (!user) user = await createUser(address, email);
		localStorage.setItem("user", JSON.stringify(user));
		handleExternalClose(user);
	}

	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	return (
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
			<Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
				<Box>
					<h2>Login</h2>
					<br />
				</Box>
				<p style={{ fontWeight: "500" }}>
					Connect your wallet or login with Google.
				</p>
				<Box
					sx={{
						mt: 2,
						width: "100%",
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<Box
						sx={{
							padding: "8px 80px",
							backgroundColor: "#ff92a2",
							width: "fit-content",
							borderRadius: "4px",
							fontWeight: "600",
							color: "white",
							cursor: "pointer",
						}}
						onClick={signInUser}
					>
						<p>Connect Wallet</p>
					</Box>
					<Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
						<p>(Or)</p>
					</Box>
					<Box
						sx={{
							padding: "8px 40px",
							width: "fit-content",
							borderRadius: "4px",
							fontWeight: "600",
							cursor: "pointer",
							mt: 1,
							border: "0.5px solid #adadad2e",
						}}
						onClick={async () => {
							const result = await Othent.logIn({
								apiId: process.env.REACT_APP_API_ID,
							});
							if (result && result.contract_id) {
								cU(result.contract_id, result.email);
							}
						}}
					>
						<Box display="flex">
							<img src={GImg} alt="Google" height={"20px"} />
							<Box width="4px"></Box>
							<p>Continue with Google</p>
						</Box>
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
