export const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: data
	});
	return await res.json();
}

export const getResource = async (url) => {
	const res = await fetch(url);
	if(res.ok){
		return await res.json()
	} else {
		throw new Error(`Clound not fetch data with erro ${res.status}`)
	}
}
