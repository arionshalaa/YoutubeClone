const videoCardContainer = document.querySelector(".video-container");

let api_key = "AIzaSyBajAW8lEjh9pnNOBGTfHsUB4Ir6CJr7EI";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += ` 
  <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
  <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
  <div class="content">
      <img src="${data.channelThumbnail}" class="channel-icon" alt="">
      <div class="info">
          <h4 class="title">${data.snippet.title}</h4>
          <p class="channel-name">${data.snippet.channelTitle}</p>
      </div>
  </div>
</div>
`;
};

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});

const toggleBtn = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#mysidebar");
sidebar.classList.add("open");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

const profilePic = document.querySelector(".user-dp img");
const dropdownMenu = document.querySelector(".dropdown");

profilePic.addEventListener("click", (event) => {
  dropdownMenu.classList.toggle("open");
});
