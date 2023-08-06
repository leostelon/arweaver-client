export async function timeout(seconds = 1) {
	await new Promise((res, rej) => {
		setTimeout(() => {
			res(true);
		}, seconds * 1000);
	});
}
