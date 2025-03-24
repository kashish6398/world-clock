document.getElementById("locationSelect").addEventListener("change", function() {
    let selectedTimezone = this.value;

    if (selectedTimezone === "current") {
        getCurrentLocationTime();
    } else {
        updateTime(selectedTimezone);
        setInterval(() => updateTime(selectedTimezone), 1000);
    }
});

function updateTime(timezone) {
    let now = new Date();

    let timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezone };
    let dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

    document.getElementById("currentTime").textContent = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
    document.getElementById("currentDate").textContent = new Intl.DateTimeFormat('en-US', dateOptions).format(now);

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
                    updateTime(timezone);
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
