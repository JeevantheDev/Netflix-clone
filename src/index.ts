import { xhr } from "./xhr";
import { ui } from "./ui";
import { createVideoUI } from "./videoUI";
import { VideoButton } from "./videoButton";

document.addEventListener("DOMContentLoaded", async () => {
  await getNetflixOriginalMovies();
  await getTrendingNowMovies();
  await getTopRatedMovies();
  await getActionMovies();
  await getComedyMovies();
  await getHorrorMovies();
  await getRomanceMovies();
  await getDocumentariesMovies();
});

// click to play a current movie
const header_banner = document.querySelector(
  ".header_banner"
) as HTMLSelectElement;
const netflix_originals = document.querySelector(
  "#netflix-originals"
) as HTMLSelectElement;
const all_movies = document.querySelector("#movies") as HTMLSelectElement;

header_banner.addEventListener("click", playBannerMovie);
netflix_originals.addEventListener("click", playNetflixOriginals);
all_movies.addEventListener("click", playMovie);

// video player enable play
const video_container = document.querySelector(
  ".video-container"
) as HTMLSelectElement;
video_container.addEventListener("click", enablePlayPause);

// get netflix original movies
async function getNetflixOriginalMovies() {
  const response = await xhr.getRequest(
    `${process.env.BASE_URL}/discover/tv?api_key=${process.env.API_KEY}&with_networks=213`
  );
  ui.show_netflix_originals(response);
  ui.show_header_banner(response);
}

// get trending now movies
async function getTrendingNowMovies() {
  const response = await xhr.getRequest(
    `${process.env.BASE_URL}/trending/movie/week?api_key=${process.env.API_KEY}&language=en-US`
  );
  ui.show_row_movies(response, "Trending Now");
}
// get top rated movies
async function getTopRatedMovies() {
  const response = await xhr.getRequest(
    `${process.env.BASE_URL}/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US`
  );
  ui.show_row_movies(response, "Top Rated");
}
// get action movies
async function getActionMovies() {
  const response = await xhr.getRequest(
    `${process.env.BASE_URL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=28`
  );
  ui.show_row_movies(response, "Action Movies");
}
// get comedy movies
async function getComedyMovies() {
  const response = await xhr.getRequest(
    `${process.env.BASE_URL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=35`
  );
  ui.show_row_movies(response, "Comedy Movies");
}
// get horror movies
async function getHorrorMovies() {
  const response = await xhr.getRequest(
    `${process.env.BASE_URL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=27`
  );
  ui.show_row_movies(response, "Horror Movies");
}
// get romance movies
async function getRomanceMovies() {
  const response = await xhr.getRequest(
    `${process.env.BASE_URL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=10749`
  );
  ui.show_row_movies(response, "Romance Movies");
}
// get documantries movies
async function getDocumentariesMovies() {
  const response = await xhr.getRequest(
    `${process.env.BASE_URL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=99`
  );
  ui.show_row_movies(response, "Documentaries Movies");
}

// play banner movie
async function playBannerMovie(e: any) {
  if (e.target.classList.contains("header_banner_button")) {
    let id: string = e.target.dataset.id;
    const { results }: any = await xhr.getRequest(
      `${process.env.BASE_URL}/tv/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`
    );
    const { video_url, video_title }: any = await xhr.getRequestForVideo(
      results[0].key
    );
    const videoUIinnerHTML: string = createVideoUI(video_url, video_title);
    ui.createVideoPlayer(videoUIinnerHTML);
  }
}

// play netflix originals
async function playNetflixOriginals(e: any) {
  if (e.target.parentElement.id === "play-btn") {
    let id: string = e.target.parentElement.dataset.id;
    const { results }: any = await xhr.getRequest(
      `${process.env.BASE_URL}/tv/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`
    );
    const { video_url, video_title }: any = await xhr.getRequestForVideo(
      results[0].key
    );
    const videoUIinnerHTML: string = createVideoUI(video_url, video_title);
    ui.createVideoPlayer(videoUIinnerHTML);
  }
}

// play movie
async function playMovie(e: any) {
  if (e.target.parentElement.id === "play-btn") {
    console.log(e.target.parentElement.parentElement.parentElement.classList);
    e.target.parentElement.parentElement.parentElement.classList.add(
      "row_posters_poster_zoomup"
    );
    let id: string = e.target.parentElement.dataset.id;
    const { results }: any = await xhr.getRequest(
      `${process.env.BASE_URL}/movie/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`
    );
    const { video_url, video_title }: any = await xhr.getRequestForVideo(
      results[0].key
    );
    const videoUIinnerHTML: string = createVideoUI(video_url, video_title);
    ui.createVideoPlayer(videoUIinnerHTML);
  }
}

// enable play
function enablePlayPause(e: any) {
  if (e.target.parentElement.classList.contains("playing")) {
    return new VideoButton("play").playPause();
  } else if (
    e.target.parentElement.classList.contains("volume") ||
    e.target.parentElement.classList.contains("full-volume") ||
    e.target.parentElement.classList.contains("muted")
  ) {
    return new VideoButton("play").toggleMute();
  } else if (e.target.parentElement.classList.contains("full-screen")) {
    return new VideoButton().toggleFullScreen();
  } else if (e.target.parentElement.classList.contains("fast-forward")) {
    return new VideoButton().fastForwardButton();
  } else if (e.target.parentElement.classList.contains("rewind")) {
    return new VideoButton().rewindButton();
  } else if (e.target.parentElement.parentElement.classList.contains("back")) {
    return new VideoButton().toggleBack();
  } else {
    return new VideoButton("pause").playPause();
  }
}
