document.getElementById("locationSelect").addEventListener("change", function() {
    let selectedTimezone = this.value;

    if (selectedTimezone) {
        updateTime(selectedTimezone);
        setInterval(() => updateTime(selectedTimezone), 1000);
    } else {
        document.getElementById("selectedLocation").innerText = "Select a location";
        document.getElementById("currentTime").innerText = "--:--:--";
        document.getElementById("currentDate").innerText = "";
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
