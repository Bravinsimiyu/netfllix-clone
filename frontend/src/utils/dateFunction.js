export function formatReleaseDate(date) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function formatDate(dateString) {
	// Create a date obect from the input date string
	const date = new Date(dateString);

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Extract the month, day, and year from the date object
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();

	//Return the formatted date string
	return `${month} ${day}, ${year}`
}