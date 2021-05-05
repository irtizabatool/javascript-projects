const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const deadlineTimer = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();


//let futureDate = new Date(2021, 5, 6, 8, 30, 0);

let futureDate = new Date(tempYear, tempMonth, tempDay + 10, 23, 30, 0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate(); 

const weekday = weekdays[futureDate.getDate()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const timeDiff = futureTime - today;
  
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;

  let days = Math.floor(timeDiff/oneDay);
  let hours = Math.floor((timeDiff % oneDay) / oneHour);
  let minutes = Math.floor((timeDiff % oneHour) / oneMinute);
  const seconds = Math.floor((timeDiff % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  function format(item) {
    if(item < 10) 
      return item = `0${item}`;
    return item;
  }

  deadlineTimer.forEach((timer, index) => {
    timer.innerHTML = format(values[index]);
  });

  if(timeDiff < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class = "expired">Sorry, this giveaway has expired </h4>`
  }
}

let countdown = setInterval(getRemainingTime, 1000)
getRemainingTime();