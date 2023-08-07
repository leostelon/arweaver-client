import { Box, CircularProgress, Dialog, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateEmail } from "../api/user";

export const EmailUpdateDialog = ({ isOpen }) => {
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		if (reason && reason === "backdropClick") return;
	};

	async function updateUser(username) {
		if (!username || username === "") return;
		if (!validateEmail(username)) return alert("Enter a valid email");
		setLoading(true);
		const response = await updateEmail(username);
		setLoading(false);
		if (response.email) window.location.reload();
	}

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	useEffect(() => {
		if (isOpen) {
			setOpen(isOpen);
		}
	}, [isOpen]);

	return (
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
			<Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
				<Box>
					<h2>Update Email</h2>
					<br />
				</Box>
				<p style={{ fontWeight: "500" }}>
					Please update your email, we have not enabled validation. Make sure to
					enter a valid email id.
				</p>
				<Box
					sx={{
						p: 1,
						borderRadius: "12px",
						fontWeight: "600",
					}}
				>
					<p>🚨Email can be updated only once🚨</p>
				</Box>
				<Box sx={{ mt: 1 }}>
					<TextField
						placeholder="Enter email"
						size="small"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</Box>
				<Box
					sx={{
						mt: 2,
						width: "100%",
						display: "flex",
						justifyContent: "center",
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
						onClick={() => updateUser(username)}
					>
						{loading ? (
							<CircularProgress size={"14px"} sx={{ color: "white" }} />
						) : (
							<p>Update</p>
						)}
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
