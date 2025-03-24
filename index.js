function updateTime() {
    const timeZones = {
        "time-la": "America/Los_Angeles",
        "time-paris": "Europe/Paris",
        "time-tokyo": "Asia/Tokyo",
        "time-sydney": "Australia/Sydney"
    };

    Object.keys(timeZones).forEach(id => {
        let timezone = timeZones[id];
        let now = new Date();
        let options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezone };
        let dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

        document.getElementById(id).textContent = new Intl.DateTimeFormat('en-US', options).format(now);
        document.getElementById(id.replace('time', 'date')).textContent = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
    });
}

updateTime();
setInterval(updateTime, 1000);