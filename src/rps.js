
var prevPlayerHand = 'null';
var games = 0;
var draw = 0;
var loseCounter = 0;
var playerWins = 0;
var computerWins = 0;

var handsPlayed = [0,0,0];
const hands = ["rock", "paper", "scissors"];
window.onload = function() {
    startGame();
}

function startGame() {
    for (let i = 0; i < 2; i++) {
        let scoredisplay = document.createElement('div');
        scoredisplay.id = i;
        if (i == 0) {
            scoredisplay.classList.add('pscore');
            scoredisplay.innerText = "Player: 0";
        } else {
            scoredisplay.classList.add('cscore');
            scoredisplay.innerText = "Computer: 0";
        }
        document.getElementById("score").append(scoredisplay);
    }
    //document.getElementById("result").innerText = "hi";
    //document.getElementById("modal").style.display = "block";

    window.addEventListener("click", clearModal);
}
function clearModal(e) {
    if (e.target == document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
}

function restart() {
    games = 0;
    draw = 0;
    loseCounter = 0;
    playerWins = 0;
    computerWins = 0;
    handsPlayed = [0,0,0];
    document.getElementById("0").innerText= `Player: ${playerWins}`;
    document.getElementById("1").innerText = `Computer: ${computerWins}`;
}

function playrock() {
    const computerChoice = getComputerChoice("rock");
    const winner = round('rock', computerChoice);
    showWinner(winner, computerChoice);
    prevPlayerHand = 'rock';
}

function playpaper() {
    const computerChoice = getComputerChoice("paper");
    const winner = round('paper', computerChoice);
    showWinner(winner, computerChoice);
    prevPlayerHand = 'paper';
}

function playscissor() {
    const computerChoice = getComputerChoice("scissors");
    const winner = round('scissors', computerChoice);
    showWinner(winner, computerChoice);
    prevPlayerHand = 'scissors';
}

function simulateRandomGame(playerMove, computerMove) {
    if (playerMove === computerMove) {
      return 'draw';
    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      return 'player';
    } else {
      return 'computer';
    }
  }
  
function simulateMCTSGames(playerMove, iterations = 10) {
    const moveCounts = [0, 0, 0];
  
    for (let i = 0; i < iterations; i++) {
      const computerHand = getRandomMove();
      const result = simulateRandomGame(playerMove, computerHand);
      moveCounts[hands.indexOf(computerHand)] += result === 'computer' ? 1 : 0.5;
    }
  
    // Choose the best move based on win rates
    const bestMoveIndex = moveCounts.indexOf(Math.max(...moveCounts));
    return hands[bestMoveIndex];
}

function getRandomMove() {
    return hands[Math.floor(Math.random() * hands.length)];
}
function getComputerChoice(playerHand) {
    // Update computer's move using MCTS
    const computerHand = simulateMCTSGames(playerHand, 10);
    
    prevComputerHand = computerHand;
  
    // Update the handsPlayed array
    handsPlayed[hands.indexOf(playerHand)]++;
  
    // Update game statistics
    if (playerHand === computerHand) {
      draw++;
      loseCounter = 0;
      //return 'draw';
    } else if (
      (playerHand === 'rock' && computerHand === 'scissors') ||
      (playerHand === 'paper' && computerHand === 'rock') ||
      (playerHand === 'scissors' && computerHand === 'paper')
    ) {
      playerWins++;
      loseCounter++;
      //return 'player';
    } else {
      computerWins++;
      //return 'computer';
    }
    return computerHand;
}

/*function winGame(prevPlayerHand) {
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
} */

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
            return 'computer';
        }
        if (computerHand == 'scissors') { 
            draw = 0;
            loseCounter +=1;
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
            return 'computer';
        }
        if (computerHand == 'rock') {
            draw = 0;
            loseCounter +=1;
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
            return 'computer';
        }
        if (computerHand == 'paper') {
            draw = 0;
            loseCounter +=1;
            return 'player';
        }
    }

}
/*
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

} */

function showWinner(winner, computerChoice) {
    if(winner == 'player') {
        document.getElementById("result").innerHTML = `
        <h1 class="text-win">You Won!</h1>
        
    <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
    `;
    } else if(winner == 'computer') {
        document.getElementById("result").innerHTML = `
        <h1 class="text-lose">You Lost.</h1>
       
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else {
        document.getElementById("result").innerHTML = `
        <h1>It's a Draw.</h1>
        
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    }
    document.getElementById("0").innerText= `Player: ${playerWins}`;
    document.getElementById("1").innerText = `Computer: ${computerWins}`;
    modal.style.display = 'block';
}