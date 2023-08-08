import "../styles/navbar.css";
import React, { useEffect, useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { BsPerson } from "react-icons/bs";
import BgImg from "../assets/background.png";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { EmailUpdateDialog } from "./EmailUpdateDialog";
import { getLocalUser } from "../utils/getUser";
import { ConnectWalletDialog } from "./ConnectWallet";
import { Othent } from "arweavekit/auth";
import { getUser } from "../api/user";

export const Navbar = () => {
	const [updateEmail, setUpdateEmail] = useState(false);
	const [connectOpen, setConnectOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const [connectedToSite, setConnectedToSite] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	async function signInUser() {
		let user = JSON.parse(localStorage.getItem("user"));
		if (!user) return;
		user = await getUser(user.address);
		localStorage.setItem("user", JSON.stringify(user));
		setConnectedToSite(true);
		if (!user.email) {
			setUpdateEmail(true);
		}
	}

	async function handleConnectWalletClose(user) {
		if (user) {
			setConnectedToSite(true);
			setConnectOpen(false);
			if (!user.email) {
				setUpdateEmail(true);
			}
		}
	}

	useEffect(() => {
		signInUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {}, []);

	return (
		<Box
			sx={{
				position: "relative",
				width: "100%",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<EmailUpdateDialog isOpen={updateEmail} />
			<ConnectWalletDialog
				isOpen={connectOpen}
				handleExternalClose={handleConnectWalletClose}
			/>
			<Box
				position={"absolute"}
				sx={{
					backgroundImage: `url('${BgImg}')`,
					backgroundPosition: "right",
					backgroundRepeat: "no-repeat",
					width: "100vw",
					height: "100vh",
					filter: "brightness(2)",
					zIndex: -1,
					backgroundPositionY: "top",
					backgroundPositionX: "right",
				}}
			></Box>
			<div className="navbar">
				<div
					onClick={() => {
						navigate("/");
					}}
					style={{ cursor: "pointer" }}
				>
					<h1 style={{ alignItems: "center", display: "flex" }}>
						<span style={{ marginBottom: "16px" }}>📨</span>Arweaver{" "}
					</h1>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box className="navlist">
						<p
							onClick={() =>
								window.open("https://github.com/leostelon/arweaver", "_blank")
							}
						>
							Github
						</p>
					</Box>
					{!connectedToSite ? (
						<Box onClick={() => setConnectOpen(true)} className="upload-button">
							Connect Wallet
						</Box>
					) : (
						<Box>
							<Box className="profile-icon" onClick={handleClick}>
								<BsPerson size={30} />{" "}
							</Box>
							<Menu
								sx={{ top: "4px" }}
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									"aria-labelledby": "basic-button",
								}}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
							>
								<MenuItem
									onClick={() => {
										const user = getLocalUser();
										navigate("/profile/" + user.address);
										setAnchorEl(null);
									}}
								>
									<p
										style={{
											marginRight: "4px",
											fontSize: "14px",
										}}
									>
										Profile
									</p>
									<MdOutlinePersonOutline size={20} />
								</MenuItem>
								<MenuItem
									onClick={async () => {
										localStorage.removeItem("user");
										await Othent.logOut({
											apiId: process.env.REACT_APP_API_ID,
										});
										window.location.replace("/");
										setAnchorEl(null);
									}}
								>
									<p
										style={{
											marginRight: "4px",
											fontSize: "14px",
										}}
									>
										Logout
									</p>
									<HiOutlineLogout size={20} />
								</MenuItem>
							</Menu>
						</Box>
					)}
				</div>
			</div>
		</Box>
	);
};
