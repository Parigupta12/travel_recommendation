// 🔍 Suggestions Data
let places = ["goa", "maldives", "kedarnath", "golden temple", "india", "france"];

// 🔍 AUTO SUGGESTIONS
function showSuggestions() {
    let input = document.getElementById("search").value.toLowerCase();
    let box = document.getElementById("suggestions");

    box.innerHTML = "";

    places.forEach(place => {
        if (place.includes(input) && input !== "") {
            box.innerHTML += `<div onclick="selectSuggestion('${place}')">${place}</div>`;
        }
    });
}

function selectSuggestion(value) {
    document.getElementById("search").value = value;
    document.getElementById("suggestions").innerHTML = "";
}

// 🎤 VOICE SEARCH
function startVoice() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice not supported");
        return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = function(event) {
        let speech = event.results[0][0].transcript.toLowerCase();
        document.getElementById("search").value = speech;
        searchPlace();
    };
}

// ⭐ RATING
function rate(star) {
    alert("You rated " + star + " ⭐");
}

// 🔍 MAIN SEARCH FUNCTION
function searchPlace() {

    let input = document.getElementById("search").value.toLowerCase().trim();
    let result = document.getElementById("result");

    result.innerHTML = "";

    if (input === "") {
        result.innerHTML = "<h2>Please enter something 🔍</h2>";
        return;
    }

    // 🌊 BEACH (ANY beach search)
    if (input.includes("beach") || input.includes("goa") || input.includes("maldives")) {
        result.innerHTML = `
        <h2>🌊 Beach Results</h2>

        <div class="card">
            <h3>${input.toUpperCase()} Beach</h3>
            <img src="https://picsum.photos/300/200?random=1">
        </div>

        <div class="card">
            <img src="https://picsum.photos/300/200?random=2">
        </div>
        `;
    }

    // 🛕 TEMPLE (ANY temple search)
     {
        result.innerHTML = `
        <h2>🛕 Temple Results</h2>

        <div class="card">
            <h3>${input.toUpperCase()}</h3>
            <img src="https://picsum.photos/300/200?random=3">
        </div>

        <div class="card">
            <img src="https://picsum.photos/300/200?random=4">
        </div>
        `;
    }

    // 🌍 COUNTRY (ANY country → REAL API)
    else {
        getCountryData(input);
    }
}

// 🌍 COUNTRY API FUNCTION (WORKING FOR ANY COUNTRY)
async function getCountryData(name) {
    let result = document.getElementById("result");

    result.innerHTML = "<h2>Loading... ⏳</h2>";

    try {
        let res = await fetch(`https://restcountries.com/v3.1/name/${name}`);

        if (!res.ok) throw new Error("Not found");

        let data = await res.json();
        let country = data[0];

        result.innerHTML = `
        <h2>🌍 ${country.name.common}</h2>

        <div class="card">
            <img src="${country.flags.png}">
            <p><b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><b>Region:</b> ${country.region}</p>

            <div class="rating">
                <span onclick="rate(1)">⭐</span>
                <span onclick="rate(2)">⭐</span>
                <span onclick="rate(3)">⭐</span>
                <span onclick="rate(4)">⭐</span>
                <span onclick="rate(5)">⭐</span>
            </div>
        </div>

        <div class="card">
            <h3>Famous Place</h3>
            <img src="https://picsum.photos/300/200?random=5">
        </div>
        `;
    } catch (error) {
        result.innerHTML = "<h2>❌ No country found</h2>";
    }
}