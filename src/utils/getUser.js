export function getLocalUser() {
	return JSON.parse(localStorage.getItem("user"));
}
