var prevPlayerHand = 'null';
var games = 0;
var draw = 0;
var loseCounter = 0;
var playerWins = 0;
var computerWins = 0;
var drawGames = 0;
var prevComputerHand = 'null';

var handsPlayed = [0,0,0];
const hands = ["rock", "paper", "scissors"];


//plays the game
/* function round(playerHand, computerHand) {
    if (playerHand == 'rock') {
        if (computerHand == 'rock') {
            draw +=1;
            loseCounter = 0
            drawGames++;
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
            loseCounter = 0;
            drawGames++;
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
            loseCounter = 0;
            drawGames++;
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
} */
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
/*
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
*/

// Funtctions for Test 1, basic strategy
class Node {
    constructor(move, parent = null) {
      this.move = move;
      this.parent = parent;
      this.children = [];
      this.wins = 0;
      this.visits = 0;
    }
  
    isFullyExpanded() {
      return this.children.length === hands.length;
    }
  
    bestChild(explorationConstant = 1.41) {
      return this.children.reduce((bestChild, child) => {
        const childScore =
          child.wins / child.visits +
          explorationConstant * Math.sqrt(Math.log(this.visits) / child.visits);
        return childScore > bestChild.score ? { score: childScore, node: child } : bestChild;
      }, { score: -Infinity }).node;
    }
  }
  
  function getRandomMove() {
    return hands[Math.floor(Math.random() * hands.length)];
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
  
  function simulateMCTSGames(playerMove, computerMove, iterations = 10000) {
    const rootNode = new Node(null);
  
    for (let i = 0; i < iterations; i++) {
      let node = rootNode;
      let playerHand = playerMove;
  
      // Selection phase
      while (!node.isFullyExpanded() && node.children.length > 0) {
        node = node.bestChild();
        playerHand = simulateRandomGame(playerHand, node.move);
      }
  
      // Expansion phase
      if (!node.isFullyExpanded()) {
        const unexploredHands = hands.filter((hand) => !node.children.some((child) => child.move === hand));
        const randomUnexploredHand = unexploredHands[Math.floor(Math.random() * unexploredHands.length)];
        node.children.push(new Node(randomUnexploredHand, node));
        playerHand = simulateRandomGame(playerHand, randomUnexploredHand);
      }
  
      // Simulation phase
      while (playerHand !== null) {
        const computerHand = getRandomMove();
        playerHand = simulateRandomGame(playerHand, computerHand);
      }
  
      // Backpropagation phase
      let winner = playerHand;
      while (node !== null) {
        if (winner === 'draw') {
          node.wins += 0.5;
        } else if (node.move === playerMove) {
          node.wins += winner === 'player' ? 1 : 0;
        } else {
          node.wins += winner === 'computer' ? 1 : 0;
        }
        node.visits++;
        node = node.parent;
      }
    }
  
    // Choose the best move based on visit counts
    const bestMoveNode = rootNode.children.reduce((bestChild, child) => {
      return child.visits > bestChild.visits ? child : bestChild;
    });
    return bestMoveNode.move;
  }
  
  // Plays the game
  function round(playerHand) {
    // Update computer's move using MCTS
    const computerHand = simulateMCTSGames(playerHand, prevComputerHand, 50000);
    prevComputerHand = computerHand;
  
    // Update the handsPlayed array
    handsPlayed[hands.indexOf(playerHand)]++;
  
    // Update game statistics
    if (playerHand === computerHand) {
      draw++;
      loseCounter = 0;
      drawGames++;
      return 'draw';
    } else if (
      (playerHand === 'rock' && computerHand === 'scissors') ||
      (playerHand === 'paper' && computerHand === 'rock') ||
      (playerHand === 'scissors' && computerHand === 'paper')
    ) {
      playerWins++;
      loseCounter = 0;
      return 'player';
    } else {
      computerWins++;
      loseCounter++;
      return 'computer';
    }
  }


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
            return 'paper';
        }
        if (prevComputerHand == 'paper') {
            return 'scissors';
        }
        if (prevComputerHand == 'scissors') {
            return 'rock';
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
    round(Test1(prevComputerHand));
}

/*function testGameHelper() {
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

}*/

