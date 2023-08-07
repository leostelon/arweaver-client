import { default as axios } from "axios";
import { SERVER_URL } from "../constants";
import { getLocalUser } from "../utils/getUser";
import { toast } from "react-toastify";

export const createNotification = async function (address) {
	try {
		const user = getLocalUser();

		const response = await axios.post(
			SERVER_URL + "/notification",
			{
				creator_address: user.address,
				address,
				tx_type: " ",
			},
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);
		if (response.status === 200) {
			toast("Successfully created notification", { type: "success" });
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
		if (error.response && error.response.data.message.includes("exists.")) {
			toast("Notification alert exists for this address.", { type: "info" });
		}
	}
};

export const deleteNotification = async function (id) {
	try {
		const response = await axios.delete(SERVER_URL + "/notification/" + id, {
			headers: {
				"Content-Type": `application/json`,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const getNotification = async function () {
	try {
		const user = getLocalUser();
		const response = await axios.get(
			SERVER_URL + "/notification/" + user.address
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};
