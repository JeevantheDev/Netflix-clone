class UI {
  landing_screen: HTMLSelectElement;
  video_container: HTMLSelectElement;
  all_movies: HTMLSelectElement;
  header_banner: HTMLSelectElement;
  netflix_originals: HTMLSelectElement;
  constructor() {
    this.landing_screen = document.querySelector(".app") as HTMLSelectElement;
    this.video_container = document.querySelector(
      ".video-container"
    ) as HTMLSelectElement;
    this.all_movies = document.querySelector("#movies") as HTMLSelectElement;
    this.header_banner = document.querySelector(
      ".header_banner"
    ) as HTMLSelectElement;
    this.netflix_originals = document.querySelector(
      "#netflix-originals"
    ) as HTMLSelectElement;
  }

  show_header_banner(movies: any) {
    let output = "";
    let header_movie =
      movies.results[Math.floor(Math.random() * movies.results.length - 1)];
    output = `
        <div class="header_banner_contents">
            <h1 class="header_banner_contents_title">${header_movie.name}</h1>
                <div class="header_banner_contents_buttons">
                    <button data-id=${header_movie.id} class="header_banner_button">Play</button>
                    <button class="header_banner_button">My List</button>
                </div>
            <h1 class="header_banner_contents_description">
                ${header_movie.overview}
            </h1>
        </div>
        <div class="header_banner_fadeBottom"></div>
    `;
    this.header_banner.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${header_movie.backdrop_path}")`;
    this.header_banner.innerHTML = output;
  }

  show_netflix_originals(movies: any) {
    let output = "";
    movies.results.forEach((movie: any) => {
      output += `
        <div class="row_posters_poster">
            <img
            src="https://image.tmdb.org/t/p/original/${movie.poster_path}"
            alt="Temp"
            class="row_posters_poster_img_large"
            />
            <div class="row_posters_poster_details_large">
            <button id="play-btn" data-id=${movie.id}>
                <i class="fas fa-play-circle fa-4x"></i>
            </button>
            <h4>${movie.name}</h4>
            </div>
        </div> 
        `;
    });
    this.netflix_originals.appendChild(this.create_row_poster_div(output));
  }

  show_row_movies(movies: any, title: string) {
    let output = "";
    movies.results.forEach((movie: any) => {
      output += `
        <div class="row_posters_poster">
            <img
            src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}"
            alt="Temp"
            class="row_posters_poster_img"
            />
            <div class="row_posters_poster_details">
            <button id="play-btn" data-id=${movie.id}>
                <i class="fas fa-play-circle fa-4x"></i>
            </button>
            <h4>${movie.title}</h4>
            </div>
        </div> 
        `;
    });
    let div = document.createElement("div");
    div.id = title;
    div.className = "row";
    div.innerHTML = `<h2>${title}</h2>`;
    div.appendChild(this.create_row_poster_div(output));
    this.all_movies.appendChild(div);
  }

  create_row_poster_div(innerHTMLString: string) {
    let row_posters_div = document.createElement("div");
    row_posters_div.className = "row_posters";
    row_posters_div.innerHTML = innerHTMLString;
    return row_posters_div;
  }

  createVideoPlayer(innerHTMLString: string) {
    this.landing_screen.style.display = "none";
    this.video_container.style.display = "block";
    return (this.video_container.innerHTML = innerHTMLString);
  }
}

export const ui = new UI();
