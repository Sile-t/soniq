const apiKey = "AIzaSyBUsymhwtl1RFiB2PkhJ3VfuvBf3JTTxb4"; // Replace with your API key
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        searchYouTube(query);
    }
});

function searchYouTube(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function displayResults(videos) {
    resultsDiv.innerHTML = ""; // Clear previous results

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.default.url;

        const videoElement = document.createElement("div");
        videoElement.classList.add("video-result");
        videoElement.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <p>${title}</p>
            <button onclick="playVideo('${videoId}')">Play</button>
        `;

        resultsDiv.appendChild(videoElement);
    });
}

function playVideo(videoId) {
    alert("Playing video: " + videoId);
}
