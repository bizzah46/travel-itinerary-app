const { ipcRenderer } = require('electron');

const searchBtn =
    document.getElementById('searchBtn');

const resultDiv =
    document.getElementById('result');

const itineraryBtn =
    document.getElementById('itineraryBtn');

let currentCity = "";

searchBtn.addEventListener('click', () => {

    const city =
        document.getElementById("country").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2&units=metric`)
        .then(response => response.json())
        .then(data => {

        currentCity = data.name;

        const weather =
            data.weather[0].main.toLowerCase();

        const cityName =
            data.name.toLowerCase();

        let activities = "";

        // LOCATION
        if (cityName.includes("kota bharu")) {

            activities = `
                <label>
                    <input type="checkbox">
                    Visit Pasar Siti Khadijah
                </label><br>

                <label>
                    <input type="checkbox">
                    Visit Kelantan Museum
                </label><br>

                <label>
                    <input type="checkbox">
                    Visit Pantai Cahaya Bulan
                </label><br>
            `;

        }

        else if (
            cityName.includes("langkawi")
        ) {

            activities = `
                <label>
                    <input type="checkbox">
                    Island Hopping
                </label><br>

                <label>
                    <input type="checkbox">
                    Cable Car Ride
                </label><br>

                <label>
                    <input type="checkbox">
                    Beach Activities
                </label><br>
            `;

        }

        // WEATHER

        else if (weather.includes("rain")) {

            activities = `
                <label>
                    <input type="checkbox">
                    Shopping Mall
                </label><br>

                <label>
                    <input type="checkbox">
                    Museum Tour
                </label><br>

                <label>
                    <input type="checkbox">
                    Indoor Entertainment
                </label><br>
            `;
        }

        else if (
            weather.includes("cloud")
        ) {

            activities = `
                <label>
                    <input type="checkbox">
                    Food Hunting
                </label><br>

                <label>
                    <input type="checkbox">
                    Sightseeing
                </label><br>

                <label>
                    <input type="checkbox">
                    Photography
                </label><br>
            `;
        }

        else if (
            weather.includes("clear")
        ) {

            activities = `
                <label>
                    <input type="checkbox">
                    Hiking
                </label><br>

                <label>
                    <input type="checkbox">
                    Sightseeing
                </label><br>

                <label>
                    <input type="checkbox">
                    Photography
                </label><br>
            `;
        }

        else {

            activities = `
                <label>
                    <input type="checkbox">
                    Food Hunting
                </label><br>

                <label>
                    <input type="checkbox">
                    Local Attractions
                </label><br>

                <label>
                    <input type="checkbox">
                    City Tour
                </label><br>
            `;
        }
        resultDiv.innerHTML = `
            <h2>${data.name}</h2>

            <p>
                <strong>Temperature:</strong>
                ${data.main.temp}°C
            </p>

            <p>
                <strong>Weather:</strong>
                ${data.weather[0].description}
            </p>

            <h3>
                Recommended Activities
            </h3>

            ${activities}
        `;

        itineraryBtn.style.display =
            "inline-block";

    })

    .catch(error => {

        console.log(error);

        resultDiv.innerHTML =
            "Unable to get weather.";

    });

});



itineraryBtn.addEventListener("click", () => {
    // Ambil hanya checkbox yang ditandakan
    const selectedActivities = Array.from(
        document.querySelectorAll(
            'input[type="checkbox"]:checked'
        )
    ).map(checkbox =>
        checkbox.parentElement.textContent.trim()
    );

    ipcRenderer.send("open-itinerary-window", {
        country: currentCity,
        activities: selectedActivities
    });
});



