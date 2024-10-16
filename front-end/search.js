window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const titlePart = urlParams.get('titlePart');

    if (!titlePart) {
        document.getElementById("results").innerHTML = "<p>No title provided.</p>";
        return;
    }

    try {
        const response = await fetch('https://localhost:9876/ntuaflix_api/searchtitleweb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titlePart }),
        });
        const namePart = titlePart;

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const titles = await response.json();
        displayResults(titles);

        const nameSearchResponse = await fetchNameSearchResults(namePart);
        displayNameSearchResults(nameSearchResponse);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById("results").innerHTML = "<p>Error loading results.</p>";
    }
};

async function fetchNameSearchResults(namePart) {
    const response = await fetch('https://localhost:9876/ntuaflix_api/searchnameweb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ namePart })
    });
    return response.json();
}


function displayNameSearchResults(nameResults) {
    const container = document.getElementById('nameResults');
    container.innerHTML = "";
    // Logic to create HTML elements for each name result and append to container
    // Example:
    nameResults.forEach(name => {
        const div = document.createElement('div');
        div.classList.add("name-item");
        let imageUrl = name.namePoster || 'https://via.placeholder.com/200x300?text=No+Image';
        if (name.namePoster && name.namePoster.includes('{width_variable}')) {
            const imageWidth = 'w200';
            imageUrl = name.namePoster.replace('{width_variable}', imageWidth);
        }
        div.innerHTML = `
        <a href="celebsview.html?nameID=${name.nameID}" style="text-decoration: none; color: gold;">
        <h3>${name.name}</h3> <!-- Updated primaryName to name -->
        <img src="${imageUrl}" class="fixed-height-image">
        <p>Born: ${name.birthYr || 'N/A'}</p> <!-- Updated birthYear to birthYr -->
        <p>Died: ${name.deathYr || 'N/A'}</p> <!-- Updated deathYear to deathYr -->
        </a>
        `;
        container.appendChild(div);
    });
}



function displayResults(titles) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    titles.forEach(title => {
        const titleElement = document.createElement("div");
        titleElement.classList.add("movie-item");
        let imageUrl = title.titlePoster || 'https://via.placeholder.com/200x300?text=No+Image';
        if (title.titlePoster && title.titlePoster.includes('{width_variable}')) {
            const imageWidth = 'w200';
            imageUrl = title.titlePoster.replace('{width_variable}', imageWidth);
        }
        titleElement.innerHTML = `
        <a href="movieview.html?movieId=${title.titleID}" style="text-decoration: none; color: gold;">
            <h3>${title.originalTitle} (${title.startYear})</h3>
            <img src="${imageUrl}" class="fixed-height-image">
            <p>Type: ${title.type}</p>
            <p>Genres: ${title.genres.map(g => g.genreTitle).join(", ")}</p>
        </a>
            <!-- Add more details as needed -->
        `;
        resultsDiv.appendChild(titleElement);
    });
}