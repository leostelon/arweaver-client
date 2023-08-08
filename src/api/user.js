import { default as axios } from "axios";
import { SERVER_URL } from "../constants";
import { getLocalUser } from "../utils/getUser";

export const createUser = async function (address, email) {
	try {
		const response = await axios.post(
			SERVER_URL + "/user",
			{
				address,
				email,
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

export const updateEmail = async function (email) {
	try {
		const user = getLocalUser();
		const response = await axios
			.post(
				SERVER_URL + "/user/updateemail",
				{ address: user.address, email },
				{
					headers: {
						"Content-Type": `application/json`,
					},
				}
			)
			.catch((er) => {
				console.log(er);
				alert(er.response.data.message);
			});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};
