import { default as axios } from "axios";
import { SERVER_URL } from "../constants";

export const createUser = async function (address) {
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

export const getUser = async function (address) {
	try {
		const response = await axios.get(SERVER_URL + "/user/" + address);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const updateEmail = async function (username) {
	try {
		let token = localStorage.getItem("token");

		const response = await axios
			.post(
				SERVER_URL + "/user/username",
				{ username },
				{
					headers: {
						"Content-Type": `application/json`,
						Authorization: "Bearer " + token,
					},
				}
			)
			.catch((er) => {
				alert(er.response.data.message);
			});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};
