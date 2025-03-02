const main = document.querySelector('#main');

const shows = [
    { title: "When The Phone Rings", episodes: 12},
    { title: "I Am Not a Robot", episodes: 32}
];

shows.forEach(({ title, episodes }) => {
    const showDiv = document.createElement("div");
    showDiv.id = title.replace(/\s+/g, "-");

    const episodeLinks = [...Array(episodes)].map((_, i) => 
        `<p><a href="https://cdn.moviesapi.club/embed/tv/253905/1/${i + 1}" target="_blank" id="${episodes}">Episode ${i + 1}</a></p>`
    ).join("");

    showDiv.innerHTML = `
        <h2>${title}</h2>
        <details>
            <summary>Expand</summary>
            ${episodeLinks}
        </details>
    `;

    main.appendChild(showDiv);

    document.getElementById('12').addEventListener('click', function(event) {
        event.preventDefault(); // Prevents default navigation

        let url = this.href; // Get the link URL

        fetch(url)
            .then(response => response.text()) // Get the response as text (HTML)
            .then(data => {
                console.log(data);
                //document.getElementById('output').innerText = data.substring(0, 500); // Show a snippet

                // Create a new DOM parser
                let parser = new DOMParser();
                let doc = parser.parseFromString(data, 'text/html');
                
                // Get src attribute
                let url = doc.querySelector('iframe').getAttribute('src');
                console.log(url);

                if (url) {
                    window.open('https:' + url, '_blank'); // Opens in a new tab
                } else {
                    console.log('No iframe src found!');
                }
            })
            .catch(error => console.log('Error:', error));
    });

});