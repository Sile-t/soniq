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

// Event listener for search button
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    searchYouTube(query);
});

// Function to search YouTube
function searchYouTube(query) {
    const API_KEY = 'YOUR_YOUTUBE_API_KEY';  // Replace with your YouTube API Key
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.items);  // Pass search results to display function
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to display search results
function displaySearchResults(videos) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';  // Clear previous results

    videos.forEach(video => {
        const listItem = document.createElement('div');
        const playButton = document.createElement('button');
        playButton.textContent = 'Play';
        
        // Get video ID and create a play button with correct video ID
        const videoId = video.id.videoId;
        console.log(`Video ID: ${videoId}`);  // Debugging line to check video ID
        playButton.onclick = () => playVideo(videoId);
        
        listItem.appendChild(playButton);
        listItem.appendChild(document.createTextNode(video.snippet.title));  // Display video title
        resultsContainer.appendChild(listItem);
    });
}

// Function to play video
function playVideo(videoId) {
    console.log(`Attempting to play video with ID: ${videoId}`);  // Debugging line to check video ID passed to playVideo
    
    // Remove any existing iframe (to avoid multiple players)
    const existingIframe = document.querySelector("iframe");
    if (existingIframe) {
        existingIframe.remove();
    }

    // Create iframe to embed the video
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&mute=0&enablejsapi=1`;
    iframe.width = "0";
    iframe.height = "0";
    iframe.style.visibility = "hidden";  // Keep the video hidden but still play audio
    iframe.setAttribute('allow', 'autoplay');  // Explicitly allow autoplay
    
    console.log("Iframe created:", iframe);  // Debugging line to check iframe creation

    // Append the iframe to the body
    document.body.appendChild(iframe);
}
