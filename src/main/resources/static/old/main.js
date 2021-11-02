$( document ).ready(function() {
    let day = $('#day');
    let hour = $('#hour');
    let minute = $('#minute');
    let second = $('#second');

    let countDownDate = new Date("2021-10-26T12:00:00Z").getTime();


    let count = function() {
        let now = new Date().getTime();
        let timeleft = countDownDate - now;

        let days = Math.max(Math.floor(timeleft / (1000 * 60 * 60 * 24)), 0);
        let hours = Math.max(Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0);
        let minutes = Math.max(Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)), 0);
        let seconds = Math.max(Math.floor((timeleft % (1000 * 60)) / 1000), 0);

        day.html(days);
        hour.html(hours);
        minute.html(minutes);
        second.html(seconds);
    }

    count();

    setInterval(function() {
        count();
    }, 1000)
});
