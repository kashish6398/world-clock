document.addEventListener("DOMContentLoaded", function () {
    updateAllClocks();

    setInterval(updateAllClocks, 1000); // Update every second

    document.getElementById("locationSelect").addEventListener("change", function () {
        let selectedTimezone = this.value;

        if (selectedTimezone === "current") {
            getCurrentLocationTime();
        } else {
            updateExtraClock(selectedTimezone);
            setInterval(() => updateExtraClock(selectedTimezone), 1000);
        }

        document.getElementById("homeLink").style.display = "block"; // Show 'Back to Home' link
    });
});

function updateAllClocks() {
    updateClock("America/New_York", "time-ny", "date-ny");
    updateClock("Europe/London", "time-london", "date-london");
    updateClock("Asia/Tokyo", "time-tokyo", "date-tokyo");
}

function updateClock(timezone, timeId, dateId) {
    let now = new Date();
    let optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezone };
    let optionsDate = { year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

    document.getElementById(timeId).textContent = new Intl.DateTimeFormat('en-US', optionsTime).format(now);
    document.getElementById(dateId).textContent = new Intl.DateTimeFormat('en-US', optionsDate).format(now);
}

function updateExtraClock(timezone) {
    let now = new Date();
    let optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezone };
    let optionsDate = { year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

    document.getElementById("extraTime").textContent = new Intl.DateTimeFormat('en-US', optionsTime).format(now);
    document.getElementById("extraDate").textContent = new Intl.DateTimeFormat('en-US', optionsDate).format(now);

    let locationText = document.getElementById("locationSelect").selectedOptions[0].text;
    document.getElementById("selectedLocation").innerText = locationText;
}

function getCurrentLocationTime() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=YOUR_API_KEY&format=json&by=position&lat=${lat}&lng=${lon}`)
                .then(response => response.json())
                .then(data => {
                    let timezone = data.zoneName;
                    updateExtraClock(timezone);
                })
                .catch(error => {
                    console.error("Error fetching time zone:", error);
                    document.getElementById("selectedLocation").innerText = "Error getting location";
                });
        }, () => {
            document.getElementById("selectedLocation").innerText = "Location access denied";
        });
    } else {
        document.getElementById("selectedLocation").innerText = "Geolocation not supported";
    }
}
