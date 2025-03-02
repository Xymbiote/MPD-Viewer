const main = document.querySelector('#main');

const shows = [
    { title: "When The Phone Rings", episodes: 12, url: "https://cdn.moviesapi.club/embed/tv/253905/1/${episodes}", site: "moviesapi", imgsrc: "./253905.jpg"}, // https://cdn.moviesapi.club/embed/tv/253905/1/${episodes}
    // { title: "I Am Not a Robot", episodes: 32, url: "https://fmovies-hd.to/getPlayTV.php?id=74682&s=1&e=${episodes}&sv=vidsrc&playtv=true", site: "fmovies"} // https://fmovies-hd.to/getPlayTV.php?id=74682&s=1&e=${episodes}&sv=vidsrc&playtv=true
];

// Upcloud/VIPstream
// https://streamingnow.mov/vipstream_f0.php?token=TFdXVlR5S0dqclo1NU1HQ0RTMStFbFhxVS92Q3JBdkVQNnFrNFVFb2s4S0tsemxLeTJKbW1FeTM=
// https://streamingnow.mov/?play=S0dpVlNEdUcxTUlVNExyTVRGb0tTaXFUVStiRHNRbkRNcXFpOWtFdWljR0pnQ1JMeUd0aWdVeTN6ejI4QW1Na2FhNFc0ZitYUElKV09SUnlSS1hmdlpCVGc0aXZvTGhDUDhRV1IyMGR3Qnl4d0YyNERsQWRhTjVxLzBXd3NvODB0TVBjVmVhRTl2UUJDVjJURjFqNjNER20=

shows.forEach(({ title, episodes, url, imgsrc }) => {
    const showDiv = document.createElement("div");
    showDiv.id = title.replace(/\s+/g, "-");    

    /*const episodeLinks = [...Array(episodes)].map((_, i) => 
        `<p><a href="https://cdn.moviesapi.club/embed/tv/253905/1/${i + 1}" id="${episodes}">Episode ${i + 1}</a></p>`
    ).join("");*/
    const episodeLinks = [...Array(episodes)].map((_, i) => {
        const episodeUrl = url.replace('${episodes}', i + 1); 
        return `<p class=fetch-link data-url="${episodeUrl}">Episode ${i + 1}</p>`
    }).join("");

    showDiv.innerHTML = `
        <h2>${title}</h2>
        <img src="${imgsrc}" height="400">
        <details>
            <summary>Expand</summary>
            ${episodeLinks}
        </details>
    `;

    main.appendChild(showDiv);

    /*document.getElementById('12').addEventListener('click', function(event) {
        event.preventDefault(); // Prevents default navigation

        let url = this.data-url; // Get the link URL

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
    });*/

});

document.body.addEventListener('click', function(event) {
    // Check if the clicked element has the class 'fetch-link'
    if (event.target && event.target.classList.contains('fetch-link')) {
        event.preventDefault(); // Prevents default behavior (if needed)

        // Get the URL from the data-url attribute
        let url = event.target.getAttribute('data-url');
        console.log("Fetching URL:", url);

        fetch(url)
            .then(response => response.text()) // Get the response as text (HTML)
            .then(data => {
                console.log(data);

                // Create a new DOM parser
                let parser = new DOMParser();
                let doc = parser.parseFromString(data, 'text/html');
                
                // Get the src attribute from the iframe
                let iframeSrc = doc.querySelector('iframe').getAttribute('src');
                console.log("Original iframe src:", iframeSrc);

                // Check if the src URL is relative and prepend 'https://'
                if (iframeSrc && iframeSrc.startsWith('//')) {
                    iframeSrc = 'https:' + iframeSrc; // Prepend https://
                    console.log("Updated iframe src:", iframeSrc);
                }

                // Open the src URL in a new tab
                if (iframeSrc) {
                    window.open(iframeSrc, '_blank'); // Opens in a new tab
                } else {
                    console.log('No iframe src found!');
                }
            })
            .catch(error => console.log('Error:', error));
    }
});
