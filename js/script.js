// imports 
import { createGoogleCalendarURL } from "./utils/addToCalendar.js";
import { formatDateToFrench } from "./utils/formatDateToFrench.js";
import { formatGoogleMapsSearchURL } from "./utils/formatGoogleMapsSearchURL.js";
import { removeDuplicateConcerts, removeOldConcerts, sortConcertsByDate, parseMarkdownToConcerts } from "./utils/formatDatas.js";


const dataURL = "https://raw.githubusercontent.com/valentindebrabandere/coralien.be/main/data/concerts.md";
const concertsList = document.querySelector(".c-concerts__list");

// Fetch the data
fetch(dataURL)
    .then(response => response.text()) // Get the response text
    .then(markdownText => {
        let concerts = parseMarkdownToConcerts(markdownText);
        concerts = removeDuplicateConcerts(concerts);
        concerts = sortConcertsByDate(concerts);
        concerts = removeOldConcerts(concerts); // It's now filtering the array, not removing DOM elements
        createConcertsList(concerts);
    })
    .catch(error => console.error(error));


// Create the concerts list
function createConcertsList(concerts) {

    concerts.forEach(concert => {
        const concertItem = document.createElement("li");
        concertItem.classList.add("c-concerts__list-item");

        const googleCalendarURL = createGoogleCalendarURL(concert);

        const concertItemContent = `
        
            <div class="c-concert-item" onClick="checkIfOpenUrl(event)" data-link="${concert.link}"">
                <a herf="${googleCalendarURL}" class="c-concert-item__header">
                    <p class="c-concert-item__date">${formatDateToFrench(concert.date)}</p>
                    <p class="c-concert-item__hour">${concert.time}</p>
                </a>
                <h3 class="c-concert-item__title">${concert.name}</h3>
                <div class="c-concert-item__footer">
                    <a href="${formatGoogleMapsSearchURL(concert.address)}" target="_blank" class="c-concert-item__location">
                    <img class="c-concert-item__location-icon" src="./img/svg/map-icon.svg" alt="Icône de plan">
                    <p class="c-concert-item__location-text">${concert.address}</p>
                    </a>
                    <a href="${concert.link}" class="c-concert-item__site">
                        <img class="c-concert-item__site-icon" src="./img/svg/arrow.svg" alt="Flèche poitnant vers la droite">
                    </a>
                </div>
            </div>

        `;
        concertItem.innerHTML = concertItemContent;
        concertsList.insertBefore(concertItem, concertsList.firstChild);
    }
    );
}

const scrollIcon = document.querySelector(".c-scoll-svg");
// if the scroll is bigger than 100, we remove the scroll icon
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (window.innerWidth < 750) {
        return
    }
    if (document.documentElement.scrollTop > 100) {
        if (!scrollIcon.classList.contains("c-scoll-svg--hidden"))
            scrollIcon.classList.add("c-scoll-svg--hidden");
    } else {
        if (scrollIcon.classList.contains("c-scoll-svg--hidden")){
            scrollIcon.classList.remove("c-scoll-svg--hidden");
        }
    }
}