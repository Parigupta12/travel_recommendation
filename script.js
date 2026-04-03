// 🔍 MAIN SEARCH FUNCTION
function searchPlace() {

    let input = document.getElementById("search").value.toLowerCase().trim();
    let result = document.getElementById("result");

    result.innerHTML = "";

    if (input === "") {
        result.innerHTML = "<h2>Please enter something 🔍</h2>";
        return;
    }

    // 🌊 BEACH
    if (input.includes("beach") || input.includes("beaches") || input.includes("goa") || input.includes("maldives")) {
        result.innerHTML = `
        <h2>🌊 Beach Results</h2>

        <div class="card">
            <h3>Maldives Beach</h3>
            <img src="images/maldives.jpg ">
        </div>

        <div class="card">
            <h3>Goa Beach</h3>
            <img src="images/goa.jpg">
        </div>
        `;
    }

    // 🛕 TEMPLE
    else if (
        input.includes("temple") || 
        input.includes("mandir") || 
        input.includes("kedarnath") ||
        input.includes("vaishno") ||
        input.includes("tirupati") ||
        input.includes("golden temple")
    ) {
        result.innerHTML = `
        <h2>🛕 Temple Results</h2>

        <div class="card">
            <h3>Golden Temple</h3>
            <img src="images/golden_temple.jpeg">
        </div>

        <div class="card">
            <h3>Badrinath</h3>
            <img src="images/badrinath.jpg">
        </div>
        `;
    }

    // 🌍 COUNTRY (API)
    else {
        getCountryData(input);
    }
}

// 🌍 COUNTRY FUNCTION
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
             <h3>SWITZERLAND</h3>

            <img src="images/switz.jpeg">
           

            <div class="rating">
                <span onclick="rate(1)">⭐</span>
                <span onclick="rate(2)">⭐</span>
                <span onclick="rate(3)">⭐</span>
                <span onclick="rate(4)">⭐</span>
                <span onclick="rate(5)">⭐</span>
            </div>
        </div>

        <div class="card">
            <h3>INDIA</h3>
            <img src="images/india.jpeg">
        </div>
        `;
    } catch (error) {
        result.innerHTML = "<h2>❌ No country found</h2>";
    }
}

// ⭐ RATING FUNCTION
function rate(star) {
    alert("You rated " + star + " ⭐");
}