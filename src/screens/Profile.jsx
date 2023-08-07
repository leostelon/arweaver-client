import "./Profile.css";
import React, { useEffect, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { deleteNotification, getNotification } from "../api/notification";
import { BsFiles } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

import { Loader } from "../components/Loader";
import EmptyBox from "../assets/629-empty-box.gif";
import { getShortAddress } from "../utils/addressShort";

export const Profile = () => {
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState("");
	const [open, setOpen] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [isSettings, setIsSettings] = useState(false);

	const { user } = useParams();

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	async function getNotifications() {
		setLoading(true);
		const nots = await getNotification();
		setNotifications(nots);
		setLoading(false);
	}

	async function checkIfuserLoggedIn() {
		const token = localStorage.getItem("token");
		if (token && token !== "") {
			setToken(token);
		}
	}

	useEffect(() => {
		getNotifications();
		checkIfuserLoggedIn();
	}, [user]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Navbar />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: "840px",
				}}
			>
				<Box className="profile">
					<Box className="profile-navigation">
						<Box onClick={() => setIsSettings(false)} className="item">
							<p>Notifications</p>
							<BsFiles />
						</Box>
						{token !== "" && (
							<Box onClick={() => setIsSettings(true)} className="item">
								<p>Settings</p>
								<IoSettingsOutline />
							</Box>
						)}
					</Box>
					{isSettings ? (
						<Box sx={{ flex: 1 }}>
							<h2>Settings</h2>
							<br />
							<h3>CLI</h3>
							<p style={{ fontWeight: "500", marginTop: "4px" }}>
								In order to push images from your computer you need to login to
								CLI using the token provided below. Enter to below command in
								powershell or command line.
							</p>
							<br />
							<h3>Token</h3>
							<Tooltip
								title="Copied!"
								placement="top"
								open={open}
								onClose={handleTooltipClose}
							>
								<Box
									sx={{
										fontFamily: "monospace",
										borderRadius: "8px",
										backgroundColor: "rgb(225, 225, 225)",
										padding: "12px",
										mt: 3,
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										width: "fit-content",
										cursor: "pointer",
									}}
									onClick={() => {
										navigator.clipboard.writeText(token);
										handleTooltipOpen();
									}}
								>
									Click to copy the token
									<MdContentCopy
										style={{
											marginLeft: "12px",
										}}
										size={20}
										className="copy-icon"
									/>
								</Box>
							</Tooltip>
						</Box>
					) : (
						<Box sx={{ flex: 1 }}>
							{loading ? (
								<Loader />
							) : notifications.length === 0 ? (
								<Box
									sx={{
										width: "100%",
										alignItems: "center",
										flexDirection: "column",
										display: "flex",
										backgroundColor: "white",
										borderRadius: "8px",
										p: 3,
									}}
								>
									<img width={"100px"} src={EmptyBox} alt="empty box" />
									<h3
										style={{
											color: "grey",
											marginTop: "12px",
											textAlign: "center",
										}}
									>
										You have 0 notification, Try creating one from homepage😃
									</h3>
								</Box>
							) : (
								notifications.map((d, i) => {
									return (
										<Box className="repoimage" key={d._id}>
											<Box
												display="flex"
												alignItems={"center"}
												justifyContent={"space-between"}
											>
												<h3>{getShortAddress(d.address)}</h3>
												<Box
													sx={{ cursor: "pointer" }}
													onClick={async () => {
														await deleteNotification(d._id);
														let nots = notifications.filter(
															(n) => n._id !== d._id
														);
														setNotifications(nots);
													}}
												>
													<AiOutlineDelete />
												</Box>
											</Box>
											<Box
												display="flex"
												justifyContent="space-between"
												alignItems={"center"}
												sx={{
													marginTop: "12px",
													fontWeight: "600",
													fontSize: "12px",
												}}
											>
												<p>Created at {new Date(d.createdAt).toDateString()}</p>
											</Box>
										</Box>
									);
								})
							)}
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};
