const apiKey = "CdfMlhYHJ7E5lNWzmJiVcYNA1YVuC2iiJbL4fgceyas";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".class-results");
const showMore = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImage() {
	inputData = inputElement.value;
	console.log(inputData);

	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

	const response = await fetch(url);
	const data = await response.json();

	const results = data.results;

	if (page === 1) {
		searchResults.innerHTML = "";
	}

	results.map((result) => {
		const imageWrapper = document.createElement("div");
		imageWrapper.classList.add("class-result");

		const image = document.createElement("img");
		image.src = result.urls.small;
		image.alt = result.alt_description;
		console.log(image.alt);

		const imgLink = document.createElement("a");
		imgLink.href = result.links.html;
		imgLink.target = "_blank";
		imgLink.textContent = result.alt_description;

		imageWrapper.appendChild(image);
		imageWrapper.appendChild(imgLink);
		searchResults.appendChild(imageWrapper);
	});

	page++;
	if (page > 1) {
		showMore.style.display = "block";
	}
}

formElement.addEventListener("submit", (e) => {
	e.preventDefault();
	page = 1;
	searchImage();
});

showMore.addEventListener("click", () => {
	searchImage();
});
