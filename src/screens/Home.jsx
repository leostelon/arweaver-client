import "../styles/app-body.css";
import "./Home.css";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { WelcomeScreen } from "./Welcome";
import { Navbar } from "../components/Navbar";
import { RiTwitterLine } from "react-icons/ri";
import { IoMdOpen } from "react-icons/io";
import { createNotification } from "../api/notification";

export const Home = () => {
	const [input, setInput] = useState("");
	const [isWelcomeScreen, setIsWelcomeScreen] = useState(false);

	function onCloseWelcome() {
		setIsWelcomeScreen(false);
	}

	const handleKeyDown = (event) => {
		const value = event.target.value;
		if (event.key === "Enter" && value !== "") {
			window.location.replace(`/explore?query=${value}`);
		}
	};

	async function addNotification() {
		if (!input || input === "") return;
		await createNotification(input);
		setInput("");
	}

	useEffect(() => {
		const isWelcome = localStorage.getItem("welcome");
		if (isWelcome !== "true") {
			setIsWelcomeScreen(true);
		}
	}, []);

	return (
		<Box>
			{isWelcomeScreen ? (
				<WelcomeScreen onCloseWelcome={onCloseWelcome} />
			) : (
				<div className="App">
					<Navbar />
					<Box className="app-body">
						<Box className="body">
							<Box className="home-main-title">
								<p className="nft-title">Near instant notifications on</p>
								<p>
									<span className="nft-title">
										favourite addresses on Arweave
									</span>
								</p>
							</Box>
							<p
								className="home-main-title"
								style={{
									fontSize: "12px",
									fontWeight: "600",
								}}
							>
								*Limited to 5 email notifications per day, sorry🙏.
							</p>
							{/* Search Bar */}
							<Box
								sx={{
									width: { xs: "85vw", sm: "70vw", md: "35vw" },
									backgroundColor: "white",
									padding: "12px 4px 12px 24px",
									display: "flex",
									alignItems: "center",
									borderRadius: "28px",
									border: "0.5px solid #adadad2e",
								}}
								className="search"
							>
								<MdOutlineMail color="grey" cursor={"pointer"} size={18} />
								<input
									type="search"
									id="search"
									onKeyDown={handleKeyDown}
									placeholder="Add wallet address to notify..."
									value={input}
									onInput={(e) => setInput(e.target.value)}
									style={{ border: "none", marginLeft: "12px", width: "100%" }}
								/>
							</Box>
							<Box
								onClick={addNotification}
								className="add-button"
								sx={{
									fontSize: "14px !important",
								}}
							>
								Notify
							</Box>
						</Box>
						<Box
							sx={{
								pb: 2,
								px: 2,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%",
								maxWidth: "1080px",
							}}
						>
							<Box
								className="built-for"
								onClick={() =>
									window.open(
										"https://arweave-community-hackathon.devpost.com/",
										"__blank"
									)
								}
							>
								built for&nbsp;
								<p style={{ textDecoration: "underline" }}>
									Arweave Community Hackathon
								</p>
								<IoMdOpen style={{ color: "black" }} />
							</Box>
							<Box className="homepage-footer">
								<p>
									<a
										href="https://twitter.com/leostelon"
										target={"_blank"}
										rel="noreferrer"
									>
										<RiTwitterLine />
										@leostelon
									</a>
								</p>
							</Box>
						</Box>
					</Box>
				</div>
			)}
		</Box>
	);
};
