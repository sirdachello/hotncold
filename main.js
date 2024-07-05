"use strict";

let input = document.getElementById(`main-player-guess`);
let textOutput = document.querySelector(`.game-result`);
let startGame = document.querySelector(`.main-computer-guess`);
let button = document.getElementById(`main-playground-button-start`);
let cheatButton = document.getElementById(`cheat-button`);

let isGameOn = false;
let tries = 0;
let goalNumber;
startGame.addEventListener(`click`, gameOn);

function gameOn() {
    isGameOn = true;
    goalNumberRange = 100000;
    goalNumber = Math.floor(Math.random() * goalNumberRange + 1);
  
    startGame.removeEventListener(`click`, gameOn);
  
    textOutput.innerHTML = `The game has started. <br> The number is between 1 and ${goalNumberRange}. <br> Good luck :)`;
}

let guesses = [];
button.addEventListener(`click`, () => {
  if (!isGameOn) {
    textOutput.innerHTML = `Please, click "Start!"`;
  } else {
    tries++;
    let guess = +input.value;

    guesses.push(+input.value);
    if (guess < goalNumber) {
      textOutput.innerHTML = `My number is <i>bigger</i> than your guess. <br> Please, try again! <br> It was your ${tries} try! <br> You tried: ${guesses}`;
    } else if (guess > goalNumber) {
      textOutput.innerHTML = `My number is <i>lower</i> than your guess. <br> Please, try again! <br> It was your ${tries} try! <br> You tried: ${guesses}`;
    } else if (guess === goalNumber) {
      textOutput.innerHTML = `You won! <br> The number was ${goalNumber}! <br> It was your ${tries} try! <br> You tried: ${guesses}`;
      isGameOn = false;
      startGame.addEventListener(`click`, gameOn);
      tries === 0;
      guesses = []
    }
  }
});

cheatButton.addEventListener(`click`, getGoalNumber);


let cheatGuess = 50000;
let goalNumberRange;
async function getGoalNumber() {


  if (!isGameOn) {
    return;
  } 
  
  else {
    goalNumberRange = (+goalNumberRange/2).toFixed();

    while (goalNumberRange > 0) {
      goalNumberRange = (+goalNumberRange/2).toFixed();

      await new Promise((resolve) => {
        setTimeout(() => {
          input.value = cheatGuess;
          resolve();
        }, 250);
      });

      
      button.click();

      if (cheatGuess == goalNumber) {
        cheatGuess = 50000;
        input.value = ``;
        tries = 0;
        guesses = []
        return
      }

      if (cheatGuess > goalNumber) {
        cheatGuess =  (+cheatGuess - +goalNumberRange).toFixed();
      } 

      else if (cheatGuess < goalNumber) {
        cheatGuess =  (+cheatGuess + +goalNumberRange).toFixed();
      }
    }
  }
}

