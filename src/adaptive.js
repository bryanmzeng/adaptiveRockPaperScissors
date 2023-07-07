var games = 0;
var draw = 0;
var loseCounter = 0;
var prevPlayerHand = 'null';
var playerHand;


const choices = document.querySelectorAll('.choice');
const score = document.getElementById('.score');
const result = document.getElementById('.result');
const restart = document.getElementById('.restart');
const modal = document.querySelector('.modal');
const scoreboard = {
    player: 0,
    computer: 0
}

// Play Game

function play(e) {
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice(prevPlayerHand);
    games += 1;
    prevPlayerHand = playerChoice;
    const winner = round(playerChoice, computerChoice); 
    showWinner(winner, computerChoice);
      
}



// Event Listeners

choices.forEach(choice => choice.addEventListener('click', play)); 
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);


// Restart Game
function restartGame() {
    games = 0;
    draw = 0;
    loseCounter = 0;
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
        <p>Player: 0</p>
        <p>Computer: 0</p>
    `;
}


// Clear Modal

function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}




// ADAPTIVE CODE
//1. 1st game - rng 
//2. after the previous game - if computer wins, play the player's hand. if computer loses, play counter to player's hand, if draw. play random hand 
// 3. edgcase: if lose 2 times in a row (no draws in between), play a random  hand, then go back to step 2



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
            return 'computer;'
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

function getComputerChoice(prevPlayerHand) {

    if (games == 0 || loseCounter >= 2 || draw > 0) {
        return randomGame();
    }
    if (loseCounter == 1) {
        return loseGame(prevPlayerHand);
    }
    return winGame(prevPlayerHand);
   

}

function showWinner(winner, computerChoice) {
    if(winner == 'player') {
        scoreboard.player++;
        result.innerHTML = `
        <h1 class="text-win">You Won!</h1>
        <i class="fas fa-hand-${computerChoice}fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else if(winner == 'computer') {
        scoreboard.computer++;
        result.innerHTML = `
        <h1 class="text-lose">You Lost.</h1>
        <i class="fas fa-hand-${computerChoice}fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else {
        result.innerHTML = `
        <h1>It's a Draw.</h1>
        <i class="fas fa-hand-${computerChoice}fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    }
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Computer: ${scoreboard.computer}</p>
        `;
    modal.style.display = 'block';
}
