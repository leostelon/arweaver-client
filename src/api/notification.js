import { default as axios } from "axios";
import { SERVER_URL } from "../constants";
import { getLocalUser } from "../utils/getUser";

export const createNotification = async function (address) {
	try {
		const response = await axios.post(
			SERVER_URL + "/user",
			{
				address,
				email: "nethajimessi10@gmail.com",
			},
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);
		if (response.status === 200) {
			console.log(response.data);
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
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
