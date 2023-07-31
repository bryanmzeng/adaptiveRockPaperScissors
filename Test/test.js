var prevPlayerHand = 'null';
var games = 0;
var draw = 0;
var loseCounter = 0;
var playerWins = 0;
var computerWins = 0;
var prevComputerHand = 'null';

var handsPlayed = [0,0,0];
const hands = ["rock", "paper", "scissors"];

//plays the game
function round(playerHand, computerHand) {
    if (playerHand == 'rock') {
        if (computerHand == 'rock') {
            draw +=1;
            loseCounter = 0
            return 'draw';
        }
        if (computerHand == 'paper') {
            draw = 0;
            loseCounter = 0;
            computerWins++;
            return 'computer';
        }
        if (computerHand == 'scissors') { 
            draw = 0;
            loseCounter +=1;
            playerWins++;
            return 'player';
        }
    }
    if (playerHand == 'paper') {
        if (computerHand == 'paper') {
            draw +=1;
            loseCounter = 0
            return 'draw';
        }
        if (computerHand == 'scissors') {
            draw = 0;
            loseCounter = 0;
            computerWins++;
            return 'computer';
        }
        if (computerHand == 'rock') {
            draw = 0;
            loseCounter +=1;
            playerWins++;
            return 'player';
        }
    }
    if (playerHand == 'scissors') {
        if (computerHand == 'scissors') {
            draw +=1;
            loseCounter = 0
            return 'draw';
        }
        if (computerHand == 'rock') {
            draw = 0;
            loseCounter = 0;
            computerWins++;
            return 'computer';
        }
        if (computerHand == 'paper') {
            draw = 0;
            loseCounter +=1;
            playerWins++;
            return 'player';
        }
    }

}

//main function for getting computer choice
function getComputerChoice(prevPlayerHand) {
    var sum = 0;
       for (let i = 0; i < 3; i++) {
           sum += handsPlayed[i];
       }
   const max = handsPlayed.reduce((a, b) => Math.max(a, b), -Infinity);
   const r = Math.floor(Math.random() * (sum));
   if (r < max) {
       var temp = "";
   
       for (let i = 0; i < 3; i++) {
           if (handsPlayed[i] > sum / 3) {
               temp = hands[i];
           }
       }
       if (temp != "") {
           return majorityGame(temp);
       } else {
           return randomGame();
       }
   } else {
       if (games == 0 || loseCounter >= 2 || draw > 0) {
           return randomGame();
       }
       if (loseCounter == 1) {
           return loseGame(prevPlayerHand);
       }
       return winGame(prevPlayerHand);
   }
   //add wingame2 and losegame2 with weighted rng so that if the computer collects data that the player is trying to big brain it can counter it
   //can make this play case 3

}

function majorityGame(hand) {
    if (hand == "rock") {
        return "paper";
    } else if (hand == "paper") {
        return "scissors";
    } else {
        return "rock";
    }
}
function randomGame() {
    const r = Math.floor(Math.random() * 3);
    if (r == 0) {
        return 'rock';
    }
    if (r == 1) {
        return 'paper';
    }
    if (r == 2) {
        return 'scissors';
    }
}
function winGame(prevPlayerHand) {
    return prevPlayerHand;
}

function loseGame(prevPlayerHand) {
    if (prevPlayerHand == 'rock') {
        return 'paper';
    }
    if (prevPlayerHand == 'paper') {
        return 'scissors';
    }
    if (prevPlayerHand == 'scissors') {
        return 'rock';
    }
}


// Funtctions for Test 1, basic strategy

function Test1(prevComputerHand) {
    if (prevComputerHand == 'null' || draw > 0) {
        return randomGame();
    }
    if (loseCounter == 0) {
        if (prevComputerHand == 'rock') {
            return 'paper';
        }
        if (prevComputerHand == 'paper') {
            return 'scissors';
        }
        if (prevComputerHand == 'scissors') {
            return 'rock';
        }
    }
    if (loseCounter > 0) {
        if (prevComputerHand == 'rock') {
            return 'rock';
        }
        if (prevComputerHand == 'paper') {
            return 'paper';
        }
        if (prevComputerHand == 'scissors') {
            return 'scissors';
        }
    }
}

// Runs the Test

function testGame() {
    var i = 100;
    while (i > 0) {
        testGameHelper();
        i--;
    }
    const myParagraph = document.getElementById("result");
    myParagraph.innerHTML = `Computer: ${computerWins}  Player: ${playerWins} Draws: ${drawGames}`;
}

function testGameHelper() {
    const computerChoice = getComputerChoice(prevPlayerHand);
    const playerChoice = Test1(prevComputerHand);
    if (playerChoice == 'rock') {
        handsPlayed[0]++;
    } else if (playerChoice == 'paper') {
        handsPlayed[1]++;
    } else {
        handsPlayed[2]++;
    }

    prevComputerHand = computerChoice;
    prevPlayerHand = playerChoice;
    round(playerChoice, computerChoice);

}

