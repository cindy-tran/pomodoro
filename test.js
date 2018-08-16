var seconds = 0;
var minutes = 0;

function Pomodoro(funct, time) {
    var interval = setInterval(funct, time);

    this.pause = function() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        return this;
    }

    this.play = function() {
        if (!interval) {
            this.pause();
            interval = setInterval(funct, time);
        }
        return this;
    }

    this.reset = function(newTime) {
        time = newTime;
        seconds = 0;
        minutes = 0;
        return this.pause().play();
    }

    this.break = function() {
        var currentState = document.getElementById("state").textContent;
        if (currentState == "Session") {
            document.getElementById("state").textContent = "Break";
        }
        else {
            document.getElementById("state").textContent = "Session";
        }
    }
}

function timeDisplay(msg) {
    var div = document.getElementById("timeDisplayed");
    div.innerHTML = msg;
}

timeDisplay("00:00");
var startTime = Date.now();
var alarmOn = false;
var sessionMax = 0; 

var timer = new Pomodoro(function() {
    console.log(minutes);
    console.log(seconds);
    console.log(sessionMax);
    if(alarmOn == false) {
        var currentState = document.getElementById("state").textContent;
        if (currentState == "Break") {
            sessionMax = parseInt(document.getElementById("break-length").textContent);
        }
        else {
            sessionMax = parseInt(document.getElementById("session-length").textContent);
        }
        if (parseInt(minutes) == sessionMax && parseInt(seconds) == 0) {
            alert("Session is over!");
            alarmOn = true;
        }
        if(seconds == 59) {
            minutes++;
            seconds=0;
        }  


        if (minutes < 10) {
            minTime = "0" + minutes;
        }
        if(seconds < 10) {
            timeDisplay(minTime + ":0" + seconds++);
        }
        else {
            timeDisplay(minTime + ":" + seconds++);
        }

    }

}, 1000);

timer.pause();

document.getElementById("reset").addEventListener("click", function(e) {
    var newTime = 1000;
    if (newTime) {
        timer.reset(newTime);
    }
    document.getElementById("break-length").textContent = parseInt(5);
    document.getElementById("session-length").textContent = parseInt(25);

});

document.getElementById("play").addEventListener("click", function(e) {
	  timer.play();
});

document.getElementById("pause").addEventListener("click", function(e) {
    timer.pause();
});


document.getElementById("mug").addEventListener("click", function(e) {
    timer.break();
    var newTime = 1000;
    if (newTime) {
        timer.reset(newTime);
    }
});



document.getElementById("increaseBreak").addEventListener("click", function(e) {
    document.getElementById("break-length").textContent = parseInt(document.getElementById("break-length").textContent) + 1
});

document.getElementById("decreaseBreak").addEventListener("click", function(e) {
    var num = document.getElementById("break-length").textContent;
    if (num != 0) {
        document.getElementById("break-length").textContent--;
    }
});

document.getElementById("increaseSession").addEventListener("click", function(e) {
    document.getElementById("session-length").textContent = parseInt(document.getElementById("session-length").textContent) + 1;
});

document.getElementById("decreaseSession").addEventListener("click", function(e) {
    var num = document.getElementById("session-length").textContent;
    if (num != 0) {
        document.getElementById("session-length").textContent--;
    }
});