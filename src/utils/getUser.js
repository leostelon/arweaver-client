import { toast } from "react-toastify";

export function getLocalUser() {
	let user = JSON.parse(localStorage.getItem("user"));
	if (!user) toast("Please connect your wallet", { type: "info" });
	return user;
}
