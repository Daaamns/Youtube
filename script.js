document.addEventListener("DOMContentLoaded", async function () {
  const videoContainer = document.querySelector(".video-card-container");
  const buttons = document.querySelectorAll(".b");
  const inputSearch = document.querySelector(".input-search");
  const searchBtn = document.querySelector(".search-btn");
  const response = await fetch("./data.json");
  const data = await response.json();

  data.forEach((ele) => {
    videoContainer.appendChild(createdCard(ele));
  });

  function performSearch() {
    const searchText = inputSearch.value.trim().toLowerCase();
    const searchWords = searchText.split(" ");

    const filteredVideos = data.filter((video) => {
      const titleWords = video.title.toLowerCase().split(" ");
      const uploaderWords = video.uploader.toLowerCase().split(" ");

      const result = searchWords.some(
        (searchWord) =>
          titleWords.some((titleWord) => titleWord.startsWith(searchWord)) ||
          uploaderWords.some((uploaderWord) =>
            uploaderWord.startsWith(searchWord)
          )
      );

      return result;
    });

    videoContainer.innerHTML = "";

    filteredVideos.forEach((video) => {
      videoContainer.appendChild(createdCard(video));
    });
  }

  searchBtn.addEventListener("click", performSearch);

  inputSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("name");
      let filteredVideos;

      if (category === "Tous") {
        filteredVideos = data;
      } else {
        filteredVideos = data.filter((video) => video.category === category);
      }
      videoContainer.innerHTML = "";

      filteredVideos.forEach((video) => {
        videoContainer.appendChild(createdCard(video));
      });
    });
  });

  const logoForSearch = document.querySelector(".logo-for-search");

  inputSearch.addEventListener("focus", function () {
    logoForSearch.style.display = "flex";
  });

  inputSearch.addEventListener("blur", function () {
    logoForSearch.style.display = "none";
  });
});

function createdCard(video) {
  const element = document.createElement("div");

  element.innerHTML = `<div class="video-card">
  <img
    class="img-video"
    alt=${video.title}
    style="background-color: transparent"
    class="yt-core-image yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image--content-mode-scale-aspect-fill yt-core-image--loaded"
    src=${video.img}
  />
  <div class="info-video">
    <img
      class="img-logo"
      src=${video.logo}
      alt=${video.title}
    />
    <div class="desc">
      <h3 class="title">
      ${video.title}
      </h3>
      <p>${video.uploader}</p>
      <p>${video.views} vues <span>.</span> ${video.posted}</p>
    </div>
  </div>
</div>`;

  const imgVideo = element.querySelector(".img-video");

  imgVideo.addEventListener("mouseover", function () {
    imgVideo.src = video.gif ?? video.img;
  });

  imgVideo.addEventListener("mouseout", function () {
    imgVideo.src = video.img;
  });
  return element;
}
