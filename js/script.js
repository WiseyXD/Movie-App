const global = {
    path: window.location.pathname,
    search: {
        term: "",
        type: "",
        page: 1,
        totalPages: 1,
        totalResults: 0,
    },
    api: {
        apiUrl: "https://api.themoviedb.org/3/",
        key: "5c895aec56f1b35cd626c747ce4183e1",
        token: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzg5NWFlYzU2ZjFiMzVjZDYyNmM3NDdjZTQxODNlMSIsInN1YiI6IjY0ODIwOTlhZTM3NWMwMDEzOWJlZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UL4U1Xyc3pGQouB3cMpyAvgHxYTOAaRW8rmUJ2td1ew",
    },
};

function showSpinner() {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("show");
}

function hideSpinner() {
    const spinner = document.querySelector(".spinner");
    spinner.classList.remove("show");
}

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
            displaySlider();
            break;

        case "/shows.html":
            fetchPopularShows();
            console.log("TV Shows");
            break;

        case "/search.html":
            console.log("Search");
            search();
            break;

        case "/movie-details.html":
            console.log("Movie Details");
            fetchMovieDetails();
            break;

        case "/tv-details.html":
            console.log("TV Details");
            fetchTVDetails();
            break;
    }
}

async function fetchPopularMovies() {
    const { results } = await fetchAPIData("movie/popular");
    const list = document.querySelector("#popular-movies");
    // console.log(results);
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

async function fetchPopularShows() {
    const { results } = await fetchAPIData(
        "tv/top_rated?language=en-US&page=1"
    );
    console.log(results);
    results.forEach((show) => {
        const list = document.querySelector("#popular-shows");
        const div = document.createElement("div");
        div.classList.add("card");
        const a = document.createElement("a");
        a.setAttribute("href", `tv-details.html?id=${show.id}`);
        const img = document.createElement("img");
        img.setAttribute(
            "src",
            show.poster_path
                ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                : "images/no-image.jpg"
        );
        img.classList.add("card-img-top");
        img.setAttribute("alt", show.original_name);
        a.appendChild(img);
        const newDiv = document.createElement("div");
        newDiv.classList.add("card-body");
        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        const h5Text = document.createTextNode(show.original_name);
        h5.appendChild(h5Text);
        newDiv.appendChild(h5);
        const p = document.createElement("p");
        p.classList.add("card-text");
        const small = document.createElement("small");
        small.classList.add("text-muted");
        const smallText = document.createTextNode(
            show.first_air_date ? show.first_air_date : "Not Available"
        );
        small.appendChild(smallText);
        p.appendChild(small);
        newDiv.appendChild(p);
        div.appendChild(a);
        div.appendChild(newDiv);
        list.appendChild(div);
    });
}

async function fetchMovieDetails(e) {
    const movieID = window.location.search.split("=")[1];
    console.log(movieID);
    const details = await fetchAPIData(`movie/${movieID}?language=en-US`);
    console.log(details);
    addBackDrop("movie", details.backdrop_path);
    const movieDetails = document.querySelector(".movieDetails");
    const div = document.createElement("div");
    div.innerHTML = ` <div class="details-top">
	<div>
	  <img
		src=${
            details.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : "images/no-image.jpg"
        }
		class="card-img-top"
		alt="${details.title}"
	  />
	</div>
	<div>
	  <h2>${details.title}</h2>
	  <p>
		<i class="fas fa-star text-primary"></i>
		${Math.ceil(details.vote_average)} / 10
	  </p>
	  <p class="text-muted">Release Date: ${details.release_date}</p>
	  <p>
		${details.overview}
	  </p>
	  <h5>Genres</h5>
	  <ul class="list-group">
	  	${details.genres.map((ele) => `<li>${ele.name}</li>`).join("")}
	  </ul>
	  <a href="${
          details.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
	</div>
  </div>
  <div class="details-bottom">
	<h2>Movie Info</h2>
	<ul>
	  <li><span class="text-secondary">Budget:</span> $${numberWithCommas(
          details.budget
      )}</li>
	  <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(
          details.revenue
      )}</li>
	  <li><span class="text-secondary">Runtime:</span> ${
          details.runtime
      } minutes</li>
	  <li><span class="text-secondary">Status: ${details.status}</span>
	</li>
	</ul>
	<h4>Production Companies</h4>
	<div class="list-group">
	${details.production_companies.map((company) => company.name).join(", ")}
	</div>
  </div>`;
    movieDetails.appendChild(div);
}

async function fetchTVDetails() {
    const showDetails = document.querySelector("#show-details");
    const showID = window.location.search.split("=")[1];
    const details = await fetchAPIData(`/tv/${showID}`);
    console.log(details);
    addBackDrop("tv", details.backdrop_path);
    const div = document.createElement("div");
    div.innerHTML = `<div class="details-top">
	<div>
  <img
    src="${
        details.poster_path
            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
            : "images/no-image.jpg"
    }"
    class="card-img-top"
    alt="${details.original_name}"
  />
</div>
	<div>
	  <h2>${details.original_name}</h2>
	  <p>
		<i class="fas fa-star text-primary"></i>
		${Math.ceil(details.vote_average)} / 10
	  </p>
	  <p class="text-muted">Release Date: ${details.first_air_date}</p>
	  <p>
		${details.overview}
	  </p>
	  <h5>Genres</h5>
	  <ul class="list-group">
		${details.genres
            .map((genre) => {
                return `<li>${genre.name}</li>`;
            })
            .join(" ")}
	  </ul>
	  <a href="${
          details.homepage
      }" target="_blank" class="btn">Visit Show Homepage</a>
	</div>
  </div>
  <div class="details-bottom">
	<h2>Show Info</h2>
	<ul>
	  <li><span class="text-secondary">Number Of Episodes:</span> ${
          details.number_of_episodes
      }</li>
	  <li>
		<span class="text-secondary">Last Episode To Air:</span> ${
            details.last_air_date
        }
	  </li>
	  <li><span class="text-secondary">Status:</span> ${details.status}</li>
	</ul>
	<h4>Production Companies</h4>
	<div class="list-group">${details.production_companies
        .map((company) => company.name)
        .join(", ")}
	</div>
  </div>`;
    showDetails.appendChild(div);
}

async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.type = urlParams.get("type");
    global.search.term = urlParams.get("search-term");

    if (global.search.term !== "" && global.search.term !== null) {
        const { results, total_pages, page, total_results } =
            await searchAPIData();
        console.log(page);
        console.log(results);
        global.search.page = page;
        global.search.totalPages = total_pages;
        global.search.totalResults = total_results;

        if (results.length === 0) {
            showAlert("No results found");
            return;
        }

        displaySearchResults(results);

        document.querySelector("#search-term").value = "";
    } else {
        showAlert("Please enter a search term");
    }
}

function displaySearchResults(results) {
    // Clear previous results
    document.querySelector("#search-results").innerHTML = "";
    document.querySelector("#search-results-heading").innerHTML = "";
    document.querySelector("#pagination").innerHTML = "";

    results.forEach((result) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
                result.poster_path
                    ? `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${
                  global.search.type === "movie" ? result.title : result.name
              }"
            />`
                    : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
             alt="${
                 global.search.type === "movie" ? result.title : result.name
             }"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
                global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                  global.search.type === "movie"
                      ? result.release_date
                      : result.first_air_date
              }</small>
            </p>
          </div>
        `;

        document.querySelector("#search-results-heading").innerHTML = `
              <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
    `;

        document.querySelector("#search-results").appendChild(div);
    });

    displayPagination();
}

// Create & Display Pagination For Search
function displayPagination() {
    const div = document.createElement("div");
    div.classList.add("pagination");
    div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

    document.querySelector("#pagination").appendChild(div);

    // Disable prev button if on first page
    if (global.search.page === 1) {
        document.querySelector("#prev").disabled = true;
    }

    // Disable next button if on last page
    if (global.search.page === global.search.totalPages) {
        document.querySelector("#next").disabled = true;
    }

    // Next page
    document.querySelector("#next").addEventListener("click", async () => {
        global.search.page++;
        const { results, total_pages } = await searchAPIData();
        displaySearchResults(results);
    });

    // Prev page
    document.querySelector("#prev").addEventListener("click", async () => {
        global.search.page--;
        const { results, total_pages } = await searchAPIData();
        displaySearchResults(results);
    });
}

async function searchAPIData() {
    const api_key = global.api.key;
    const api_url = "https://api.themoviedb.org/3/";
    const api_token = global.api.token;

    const resp = await fetch(
        `${api_url}search/${global.search.type}?language=en-US&query=${global.search.term}&page=${global.search.page}`,
        {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${api_token}`,
            },
        }
    );
    showSpinner();
    const data = await resp.json();
    hideSpinner();
    return data;
}

function addBackDrop(type, backDropPath) {
    const overlayDiv = document.createElement("div");
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backDropPath})`;
    overlayDiv.style.backgroundPosition = "center";
    overlayDiv.style.backgroundRepeat = "no-repeat";
    overlayDiv.style.height = "100vh";
    overlayDiv.style.width = "100vw";
    overlayDiv.style.position = "absolute";
    overlayDiv.style.top = "0";
    overlayDiv.style.left = "0";
    overlayDiv.style.zIndex = "-1";
    overlayDiv.style.opacity = "0.5";

    if (type === "movie") {
        document.querySelector("#movie-details").appendChild(overlayDiv);
    } else if (type === "tv") {
        document.querySelector("#show-details").appendChild(overlayDiv);
    }
}

async function displaySlider() {
    const { results } = await fetchAPIData("movie/now_playing");

    results.forEach((movie) => {
        const div = document.createElement("div");
        div.classList.add("swiper-slide");

        div.innerHTML = `
		<a href="movie-details.html?id=${movie.id}">
		  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
            movie.title
        }" />
		</a>
		 <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${
            Math.round(movie.vote_average * 10) / 10
        } / 10
      </h4>
	  `;

        document.querySelector(".swiper-wrapper").appendChild(div);

        initSwiper();
    });
}

function initSwiper() {
    const swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showAlert(message, className) {
    const div = document.createElement("div");
    div.classList.add(className, "alert");
    div.appendChild(document.createTextNode(message));
    const alert = document.querySelector("#alert");
    alert.appendChild(div);

    setTimeout(() => div.remove(), 3000);
}

async function fetchAPIData(endpoint) {
    const api_key = global.api.key;
    const api_url = "https://api.themoviedb.org/3/";
    const api_token = global.api.token;
    const resp = await fetch(`${api_url}${endpoint}?language=en-US`, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${api_token}`,
        },
    });
    showSpinner();
    const data = await resp.json();
    hideSpinner();
    return data;
}

function initialize() {
    router(global.path);
    highlightLink();
}

document.addEventListener("DOMContentLoaded", initialize);
