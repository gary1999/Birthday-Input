document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById("before-button").addEventListener('click', beforeGuess);
    // document.getElementById("after-button").addEventListener('click', afterGuess);
    document.getElementById("reset-button").addEventListener('click', initialise);
    // document.getElementById("undo-button").addEventListener('click', undo);
    document.getElementById("submit-button").addEventListener('click', submit);
});

document.addEventListener('DOMContentLoaded', () => {
    elements = document.getElementsByClassName("guess-button");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', buttonClick);
    }
});

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const days31 = [0, 2, 4, 6, 7, 9, 11];
const days30 = [3, 5, 8, 10];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let totalGuesses;
let today = new Date();

let currentGuess;
let currentMonth;
let currentDate;
let currentYear;

let previousMonthGuessList;
let previousDateGuessList;
let previousYearGuessList;


const buttonClick = (e) => {
    switch (e.target.id) {
        case 'month-before-button':
            //Add month to the previous guess list before changing it
            previousMonthGuessList.push(monthNames[currentMonth]);
            displayPrevious(previousMonthGuessList, 'month');
            newMonthGuess = getRandomInt(0, currentMonth);
            currentGuess.setMonth(newMonthGuess);
            if (newMonthGuess == 0) {
                document.getElementById(e.target.id).disabled = true;
            }
            else {
                document.getElementById('month-after-button').disabled = false;
            }
            display(currentGuess);
            break;
        case 'day-before-button':
            //Add date to the previous guess list before changing it
            previousDateGuessList.push(currentDate);
            displayPrevious(previousDateGuessList, 'date');
            newDayGuess = getRandomInt(1, currentDate);
            currentGuess.setDate(newDayGuess);

            if (newDayGuess == 1) {
                document.getElementById(e.target.id).disabled = true;
            }
            else {
                document.getElementById('day-after-button').disabled = false;
            }

            display(currentGuess);
            break;
        case 'year-before-button':
            //Add year to the previous guess list before changing it
            previousYearGuessList.push(currentYear);
            displayPrevious(previousYearGuessList, 'year');
            newYearGuess = getRandomInt(1920, currentYear);
            currentGuess.setYear(newYearGuess);
            display(currentGuess);
            if (newYearGuess == 1920) {
                document.getElementById(e.target.id).disabled = true;
            }
            else {
                document.getElementById('year-after-button').disabled = false;
            }
            break;
        case 'month-after-button':
            //Add month to the previous guess list before changing it
            previousMonthGuessList.push(monthNames[currentMonth]);
            displayPrevious(previousMonthGuessList, 'month');
            //Add one to current value because it can roll the same number if not
            newMonthGuess = getRandomInt(currentMonth + 1, 11);
            currentGuess.setMonth(newMonthGuess);

            if (newMonthGuess == 11) {
                document.getElementById(e.target.id).disabled = true;
            }
            else {
                document.getElementById('month-before-button').disabled = false;
            }

            display(currentGuess);
            break;
        case 'day-after-button':
            //Add date to the previous guess list before changing it
            previousDateGuessList.push(currentDate);
            displayPrevious(previousDateGuessList, 'date');
            if (days31.includes(currentMonth)) {
                //Add one to current value because it can roll the same number if not
                //Account for all months that have 31 days
                newDayGuess = getRandomInt(currentDate + 1, 31);
                if (newDayGuess == 31) {
                    document.getElementById(e.target.id).disabled = true;
                }
                else {
                    document.getElementById('day-before-button').disabled = false;
                }
            }
            else if (days30.includes(currentMonth)) {
                //Add one to current value because it can roll the same number if not
                //Account for all months that have 30 days
                newDayGuess = getRandomInt(currentDate + 1, 30);
                if (newDayGuess == 30) {
                    document.getElementById(e.target.id).disabled = true;
                }
                else {
                    document.getElementById('day-before-button').disabled = false;
                }
            }
            else {
                if (currentYear % 4 == 0) {
                    //Add one to current value because it can roll the same number if not
                    //Account for leap year February
                    newDayGuess = getRandomInt(currentDate + 1, 29);
                    if (newDayGuess == 29) {
                        document.getElementById(e.target.id).disabled = true;
                    }
                    else {
                        document.getElementById('day-before-button').disabled = false;
                    }
                }
                else {
                    //Non-leap year February
                    //Add one to current value because it can roll the same number if not
                    newDayGuess = getRandomInt(currentDate + 1, 28);
                    if (newDayGuess == 28) {
                        document.getElementById(e.target.id).disabled = true;
                    }
                    else {
                        document.getElementById('day-before-button').disabled = false;
                    }
                }
            }
            currentGuess.setDate(newDayGuess);
            display(currentGuess);
            break;
        case 'year-after-button':
            //Add year to the previous guess list before changing it
            previousYearGuessList.push(currentYear);
            displayPrevious(previousYearGuessList, 'year');
            //Add one to current value because it can roll the same number if not
            newYearGuess = getRandomInt(currentYear + 1, today.getFullYear());
            if (newYearGuess == today.getFullYear()) {
                document.getElementById(e.target.id).disabled = true;
            }
            else {
                document.getElementById('year-before-button').disabled = false;
            }
            currentGuess.setYear(newYearGuess);
            display(currentGuess);
            break;
        default:
            console.log('default');
    }

}

const displayPrevious = (previousGuessList, placement) => {
    console.log(previousGuessList[0]);
    if (previousGuessList.length > 10) {
        previousGuessList.shift();
    }
    previousGuessList.reverse();
    document.getElementById(`previous-${placement}-guess-list`).innerHTML = "";
    for (let i = 0; i < previousGuessList.length; i++) {
        let listElement = previousGuessList[i];
        // console.log(`${i} is ${listElement}`);
        const previousGuessSpan = document.createElement('span');
        previousGuessSpan.id = `previous${placement}${i}`;
        previousGuessSpan.innerHTML = listElement;
        previousGuessSpan.style.opacity = `0.${10 - i - 1}`;
        document.getElementById(`previous-${placement}-guess-list`).appendChild(previousGuessSpan);
    }
    previousGuessList.reverse();
}

const dateToString = (guess) => {
    let month = (monthNames[guess.getMonth()]);
    let date = (guess.getDate());
    let year = (guess.getFullYear());
    // let day = (dayNames[guess.getDay()]);
    return (`${month} ${date} ${year}`);
    // return (`${month} ${date} ${year} (${day})`);
}

const display = (guess) => {
    currentMonth = guess.getMonth();
    currentDate = guess.getDate();
    currentYear = guess.getFullYear();

    document.getElementById("month-guess").innerHTML = monthNames[currentMonth];
    document.getElementById("date-guess").innerHTML = currentDate;
    document.getElementById("year-guess").innerHTML = currentYear;

}

const submit = () => {
    elements = document.getElementsByClassName("guess-button");
    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = true;
    }

    console.log(currentGuess);

    const finalGuess = document.createElement('h3');
    finalGuess.id = `finalGuess`;
    finalGuess.innerHTML = `The bot has determined that your birthday is on ${dateToString(currentGuess)}`;
    document.getElementById('title').appendChild(finalGuess);

}


const initialise = () => {

    previousMonthGuessList = [];
    previousDateGuessList = [];
    previousYearGuessList = [];

    elements = document.getElementsByClassName('previous-guess');
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = "";
    }

    let finalGuess = document.getElementById('finalGuess');
    if (finalGuess) {
        finalGuess.remove();
    }

    elements = document.getElementsByClassName("guess-button");
    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = false;
    }

    startDate = new Date(1920, 0, 1);
    endDate = new Date();
    currentGuess = (
        new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
    );
    display(currentGuess);
}

initialise();