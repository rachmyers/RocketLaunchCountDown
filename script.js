//Name: Rachel Myers
//Class: CIS 131
//Section: W01
//Date: 10/18/2020

//Variables that hold divs for content
var nextLaunch = document.getElementById("nextLaunch");
var launchTable = document.getElementById("launchTable");
var countdownInfo = document.getElementById("countdownInfo");

//Variable for the XMLHttpRequest
var httpRequest = new XMLHttpRequest();

//Variables for the timers -- followed example from book on page 485 for countdown
var countdownTimer = setInterval(countdownFunction, 1000);
var launchObj;




//When window first loads, display next five launches
window.addEventListener("load", function() {
    //Clear the div holding the launch information
    launchTable.innerHTML = "";

    //Send a get request to get the next overall five launches
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?next=5");

    //Send the request
    httpRequest.send();

    //When the request status changes, call the showState method
    httpRequest.onreadystatechange = showState;
});

//Event listeners for buttons
document.getElementById("btNextFive").addEventListener("click", function() {
    //Clear the div holding the launch information
    launchTable.innerHTML = "";

    //Send a get request to get the overall next five launches
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?next=5");

    //Send the request
    httpRequest.send();

    //When the request status changes, call the showState method
    httpRequest.onreadystatechange = showState;
});

document.getElementById("btFalcon").addEventListener("click", function() {
    //Clear the div holding the launch information
    launchTable.innerHTML = "";

    //Send a get request to get the next five launches for Falcon
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=falcon&next=5");

    //Send the request
    httpRequest.send();

    //When the request status changes, call the showState method
    httpRequest.onreadystatechange = showState;
});



document.getElementById("btAriane").addEventListener("click", function() {
    //Clear the div holding the launch information
    launchTable.innerHTML = "";

    //Send a get request to get the next five launches for Ariane
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=ariane&next=5");

    //Send the request
    httpRequest.send();

    //When the request status changes, call the showState method
    httpRequest.onreadystatechange = showState;
});


document.getElementById("btLauncherOne").addEventListener("click", function() {
    //Clear the div holding the launch information
    launchTable.innerHTML = "";

    //Send a get request to get the next five launches for Launcher One
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=launcherone&next=5");

    //Send the request
    httpRequest.send();

    //When the request status changes, call the showState method
    httpRequest.onreadystatechange = showState;
});

//This method is called when the request status has changed
function showState() {
    //If the request was sent and has a successful status, execute the following code
    if(httpRequest.readyState == 4 && httpRequest.status == 200) {
        //Store the JSON response text in a variable
        var nextDate = httpRequest.responseText;

        //Parse the JSON response string into an object in order to read its properties
        launchObj = JSON.parse(nextDate);

        //Display the date of the next launch from the first object in the launches array
        nextLaunch.innerHTML = launchObj.launches[0].net;

        //Going through the Launches array and display each launch name and date
        for(var i = 0; i < launchObj.launches.length; i++) {
            launchTable.innerHTML += "<b>" + launchObj.launches[i].net + "</b> " + launchObj.launches[i].name + "<br>";
            console.log(launchObj.launches[i].name);
        }      
        
    } else {
        console.log("nope");
    }
}

//This function is called by the interval timer--followed countdown example from the book
function countdownFunction() {
        //Create new Date instance
        var currentDay = new Date();
        //Get current year, month, date, hour, minute, and second and store in variable
        var dateFrom = Date.UTC(currentDay.getFullYear(), currentDay.getMonth(),
            currentDay.getDate(), currentDay.getHours(), currentDay.getMinutes(), currentDay.getSeconds());
        //Get the first object's date and store it in a variable
        var dateTo = new Date(launchObj.launches[0].net);
        //Find the difference between the first launch's date and the current date
        var countDown = dateTo - dateFrom;
        //Use formula to find what the difference is in days
        var daysLeft = Math.floor(countDown / 86400000);
        var fractionalDays = countDown % 86400000;
        //Use formula to find out what the difference is in hours, minutes, and seconds
        var hoursLeft = Math.floor(fractionalDays/3600000);
        var fractionalHour = fractionalDays % 3600000;
        var minutesLeft = Math.floor(fractionalHour / 60000);
        var fractionalMinute = fractionalHour % 60000;
        var secondsLeft = Math.floor(fractionalMinute / 1000);

    //Update the div holding the countdown info
    countdownInfo.innerHTML = "<br> <b>Countdown to Next Launch: </b>" + daysLeft + " Days " +
            hoursLeft + " Hours " + minutesLeft + " Minutes " + secondsLeft + " Seconds";
}

