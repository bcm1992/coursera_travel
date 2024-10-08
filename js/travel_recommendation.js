function search() {
    const searchInput = document.getElementById("searchText");
    const searchResult = document.getElementById("searchResult");
    searchResult.innerHTML = ""; // clear previous search results.
    let apiResponse;

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];
            console.log(apiResponse);
            switch (searchInput.value.toLowerCase()) {
                case "beach":
                case "beaches":
                    data.beaches.forEach(beach => {
                        results.push(beach);
                    });
                    break;
                case "temple":
                case "temples":
                    data.temples.forEach(temple => {
                        results.push(temple);
                    });
                    break;
                default:
                    apiResponse = data.countries;
                    break;
            }
            // country search
            data.countries.forEach(country => {
                if (country.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
                    country.cities.forEach(city => {
                        results.push(city);
                    });
                }
            });
            console.log(results);

            if (results.length === 0) {
                const parentDiv = document.createElement("div");
                const name = document.createElement("h3");
                parentDiv.classList.add("searchResultParent");
                name.textContent = "No results found";
                parentDiv.appendChild(name);
                searchResult.appendChild(parentDiv);
            }
            results.forEach(result => {
                const parentDiv = document.createElement("div");
                const image = document.createElement("img");
                const childDiv = document.createElement("div");
                const name = document.createElement("h3");
                const description = document.createElement("p");
                image.src = result.imageUrl;
                image.classList.add("searchResultImage");
                name.textContent = result.name;
                description.textContent = result.description;
                childDiv.appendChild(name);
                childDiv.appendChild(description);
                parentDiv.classList.add("searchResultParent");
                parentDiv.appendChild(image);
                parentDiv.appendChild(childDiv);
                parentDiv.appendChild(document.createElement("hr"));
                searchResult.appendChild(parentDiv);
            });
        });

}
function clearSearchInput() {
    const searchInput = document.getElementById("searchText");
    searchInput.value = "";
    searchResult.innerHTML = "";
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", search);

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearSearchInput);

const searchInput = document.getElementById("searchText");
searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        search();
    }
});