/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
3 more advance rules:

1. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 50.
2. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
3. A player looses his ENTIRE score when he rolls two 8 in a row. After that, it's the next player's turn.
*/

var scores, roundScore, activePlayer, gamePlaying;
var lastDice;
init();

/* get value from websitef
var x = document.querySelector('#score-0').textContent;
console.log(x); */

//event 
//use anonymous function

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        var sumDice = dice1 + dice2;
        // 2. display the result

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. update the roundScore if the rolled num is not '1'
        if(sumDice === 8 && lastDice === 8){
            //player lose all his score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if(dice1 !== 1 && dice2 !== 1){
            // add score
            roundScore += sumDice;
            // DOM manipulation
            // document object, select element elements on the webpage, only select the first element it find.
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
            // document.querySelector('#current' + activePlayer).innerHTML = dice;
        } else{
            //next player
            nextPlayer();
        }
        lastDice = sumDice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        
        if(input){
            var winningScore = input;
        } else{
            winningScore = 50;
        }
        
        //check if player win the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            //nextPlayer
            nextPlayer();
        }
    }
});

function nextPlayer(){
    //next player
    activePlayer = 1 - activePlayer;
    roundScore = 0;
    lastDice = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    //document.querySelector('player-0-panel').classList.remove('active');
    //document.querySelector('player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active'); // change the active player
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    //document.getElementById('dice-1').style.display = 'none';
    //document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-rules').addEventListener('click', function(){
    var x = document.getElementById('rules').style.display;
    if(x !== 'none') {document.getElementById('rules').style.display = 'none';}
    else{document.getElementById('rules').style.display = 'block';}
});

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    lastDice = 0;
    gamePlaying = true;
    
    document.getElementById('rules').style.display = 'none';
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none'; // hide the dice at the beginning

    document.getElementById('score-0').textContent = '0'; // another way to select elements: a bit Faster
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}












