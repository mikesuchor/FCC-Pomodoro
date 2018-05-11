/* Build a Pomodoro Clock

User Story: I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.

User Story: I can reset the clock for my next pomodoro.

User Story: I can customize the length of each pomodoro.

*/

/* Things to Do:

*/

/* Bugs
1. When the break timer is an even minute number (1:00, 2:00, 5:00, 10:00, etc.), adds an extra 0 to the seconds when the timer resets.
*/

var timer = 1500;
var breaktimer = 300;
var countDownSpeedInMS = 50;
var minutes;
var seconds;
var timerCountDown;
var breakminutes;
var breakseconds;
var breakCountDown;

/* Initialize the timers */
getMinutesSeconds(timer);
getBreakMinutesSeconds(breaktimer);

/* Starts the timer on start button push, if it's 0, start the break timer, else disable the start button and start counting down until it hits 0 */
function startTimer() {
  if ((minutes <= 0 && seconds <= 0) || timer <= 0) {
    startBreakTimer();
  } else {
    disableStart();
    timerCountDown = setInterval(function() {
      seconds--;
      if (minutes === 0 && seconds === 0) {
        playSound();
        stopTimer();
        startBreakTimer();
      }
      if (seconds < 10 && seconds >= 0) {
        seconds = `0${seconds}`;
      } else if (seconds < 0) {
        minutes--;
        seconds = 59;
      }
      document.getElementById("timer").innerHTML = `${minutes}:${seconds}`;
    }, countDownSpeedInMS);
  }
}

/* Disable the start button */
function disableStart() {
  return (document.getElementById("start").disabled = true);
}

/* Enable the start button */
function enableStart() {
  return (document.getElementById("start").disabled = false);
}

/* Stops the timers, keeping the current time and wait for start or reset to be pushed */
function stopTimer() {
  clearInterval(timerCountDown);
  clearInterval(breakCountDown);
  enableStart();
}

/* Stops and resets the timer and break timer to their initial values */
function resetTimer() {
  stopTimer();
  getMinutesSeconds(timer);
  getBreakMinutesSeconds(breaktimer);
}

/* Increments the timer by 1 minute if it's less than the max of 50 minutes */
function incrementTimer() {
  if (timer < 3000) {
      stopTimer();
      timer += 60;
      return getMinutesSeconds(timer);
  }
}

/* Decrements the timer by 1 minute if it's greater than 0 */
function decrementTimer() {
  if (timer > 0) {
    stopTimer();
    timer -= 60;
    return getMinutesSeconds(timer);
  }
}

/* Takes a time parameter, and returns it in minutes and seconds then returns it to the timer */
function getMinutesSeconds(time) {
  minutes = Math.floor(time / 60);
  seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return (document.getElementById("timer").innerHTML = `${minutes}:${seconds}`);
}

/*-------------------BREAK TIMER-------------------*/

/* Takes a time parameter, and returns it in minutes and seconds then returns it to the break timer */
function startBreakTimer() {
  if (breaktimer === 0) {
    return;
  } else {
    disableStart();
    breakCountDown = setInterval(function() {
      breakseconds--;
      if (breakminutes === 0 && breakseconds === 0) {
        playSound();
        resetTimer();
      }
      if (breakseconds < 10 && breakseconds >= 0) {
        breakseconds = `0${breakseconds}`;
      } else if (breakseconds < 0) {
        breakminutes--;
        breakseconds = 59;
      }
      document.getElementById("break").innerHTML = `${breakminutes}:${breakseconds}`;
    }, countDownSpeedInMS);
  }
}

/* Takes a break time parameter, and returns it in minutes and seconds then returns it to the break timer */
function getBreakMinutesSeconds(time) {
  breakminutes = Math.floor(time / 60);
  breakseconds = time % 60;
  if (breakseconds < 10) {
    breakseconds = `0${breakseconds}`;
  }
  // alert (breakminutes + ":" + breakseconds); ALERTS THE CORRECT NUMBER
  return (document.getElementById("break").innerHTML = `${breakminutes}:${breakseconds}`);
}

/* Increments the break timer by 5 minutes if it's less than the max of 10 minutes */
function incrementBreakTimer() {
  if (breaktimer < 600) {
    stopTimer();
    breaktimer += 300;
    return getBreakMinutesSeconds(breaktimer);
  }
}

/* Decrements the breaktimer by 5 minute if it's greater than 0 */
function decrementBreakTimer() {
  if (breaktimer > 0) {
    stopTimer();
    breaktimer -= 300;
    return getBreakMinutesSeconds(breaktimer);
  }
}

/* Plays a sound when a timer hits 0 */
function playSound() {
  var alarm = new Audio("http://soundbible.com/mp3/Bell Sound Ring-SoundBible.com-181681426.mp3");
  alarm.play();
}