const global = {
	path: window.location.pathname,
};

function highlightLink() {
	const links = document.querySelectorAll(".nav-link");
	links.forEach((e) => {
		if (e.getAttribute("href") === global.path) {
			e.classList.add("active");
		}
	});
}
function router(global) {
	switch (global) {
		case "/":
		case "/index.html":
			fetchPopularMovies();
			break;

		case "/shows.html":
			fetchPopularShows();
			console.log("TV Shows");
			break;

		case "/search.html":
			console.log("Search");
			break;

		case "/movie-details.html":
			console.log("Movie Details");
			break;

		case "/tv-details.html":
			console.log("TV Details");
			break;
	}
}

async function fetchPopularMovies() {
	const { results } = await fetchAPIData("movie/popular");
	const list = document.querySelector("#popular-movies");
	console.log(results);
	results.forEach((movie) => {
		const div = document.createElement("div");
		div.classList.add("card");
		const a = document.createElement("a");
		a.setAttribute("href", `movie-details.html?id=${movie.id}`);
		const img = document.createElement("img");
		img.classList.add("card-img-top");
		img.setAttribute(
			"src",
			`${
				movie.poster_path
					? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
					: "images/no-image.jpg"
			}`
		);
		img.setAttribute("alt", `${movie.title}`);
		a.appendChild(img);
		const newDiv = document.createElement("div");
		newDiv.classList.add("card-body");
		const h5 = document.createElement("h5");
		h5.classList.add("card-title");
		const h5Text = document.createTextNode(`${movie.title}`);
		h5.appendChild(h5Text);
		newDiv.appendChild(h5);
		const p = document.createElement("p");
		p.classList.add("card-text");
		const small = document.createElement("small");
		small.classList.add("text-muted");
		const release = document.createTextNode(
			`Realease : ${movie.release_date}`
		);
		small.appendChild(release);
		p.appendChild(small);
		newDiv.appendChild(p);
		div.appendChild(a);
		div.appendChild(newDiv);
		list.appendChild(div);

		//Traversy Approach
		// const div = document.createElement("div");
		// div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
		// 		<img
		// 			src="images/no-image.jpg"
		// 			class="card-img-top"
		// 			alt="Movie Title"
		// 		/>
		// 	</a>
		// 	<div class="card-body">
		// 		<h5 class="card-title">Movie Title</h5>
		// 		<p class="card-text">
		// 			<small class="text-muted">Release: XX/XX/XXXX</small>
		// 		</p>
		// 	</div>`;
	});
}

async function fetchPopularShows() {}

async function fetchAPIData(endpoint) {
	const api_key = "5c895aec56f1b35cd626c747ce4183e1";
	const api_url = "https://api.themoviedb.org/3/";
	const api_token =
		"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzg5NWFlYzU2ZjFiMzVjZDYyNmM3NDdjZTQxODNlMSIsInN1YiI6IjY0ODIwOTlhZTM3NWMwMDEzOWJlZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UL4U1Xyc3pGQouB3cMpyAvgHxYTOAaRW8rmUJ2td1ew";
	const resp = await fetch(`${api_url}${endpoint}?language=en-US`, {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${api_token}`,
		},
	});
	const data = await resp.json();
	return data;
}

function initialize() {
	router(global.path);
	highlightLink();
}

document.addEventListener("DOMContentLoaded", initialize);
