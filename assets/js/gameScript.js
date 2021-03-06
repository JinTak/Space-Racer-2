// AUTHOR: Jin Tak 
// TITLE: Space Racer 2: Into the Void
// WDI 6: Project 1 
// Game Page 


// This Object holds properties which describe the position of Player 1
let player1 = {
    left: 0,
    bottom: 0
}

// This Object holds properties which describe the position of Player 2
let player2 = {
    right: 0,
    bottom: 0
}

// This array will hold the projectiles for Player 1
let projectilesArrayPlayer1 = [];
// This array will hold the projectiles for Player 2
let projectilesArrayPlayer2 = [];

// These vairables will hold the scores of each respective player
let player1Score = 0;
let player2Score = 0;

// Constructor function for asteroids
function asteroid(){
    
}

// Getting elements on HTML page
let player_1_Score = document.getElementById('player1ScoreHere');
let player_2_Score = document.getElementById('player2ScoreHere');
let bitcoinP1 = document.getElementById('bitcoinP1');
let bitcoinP2 = document.getElementById('bitcoinP2');

// This function will listen for specific 'keyup' events which will move the game pieces.
document.addEventListener('keydown', function(e){
    // console.log((document.getElementById('player1').style.bottom));
   
    // let positionStr = document.getElementById('player1').style.bottom;
    // let bottom = parseInt(positionStr.slice(0,positionStr.length - 2));
    
    // console.log(positionStr);
    // // let bottom = parseInt(positionStr.slice(0,positionStr.length - 2));

    // if(!positionStr === "") {
    //     let bottom = parseInt(positionStr.slice(0,positionStr.length - 2));
    // } else {
    //     bottom = 0;
    // }

    // console.log(bottom);

    // trying to prevent div from going higher than 50vh
    // if(!bottom > 290) {
    //     if(e.keyCode === 65){
    //         // console.log('left');
    //         player1.left = player1.left - 10;
    //         movePlayer();
    //     } else if (e.keyCode === 68){
    //         // console.log('right');
    //         player1.left = player1.left + 10;
    //         movePlayer();
    //     } else if (e.keyCode === 87){
    //         // console.log('up');
    //         player1.bottom = player1.bottom + 10;
    //         movePlayer();
    //     }
    //     else if (e.keyCode === 83){
    //         // console.log('down');
    //         player1.bottom = player1.bottom - 10;
    //         movePlayer();
    //     }
    // }
    
    // MOVEMENT for Player 1
    if(e.keyCode === 65){
        // console.log('left');
        player1.left = player1.left - 10;
        movePlayer();
    } else if (e.keyCode === 68){
        // console.log('right');
        player1.left = player1.left + 10;
        movePlayer();
    } else if (e.keyCode === 87){
        // console.log('up');
        player1.bottom = player1.bottom + 10;
        movePlayer();
    }
    else if (e.keyCode === 83){
        // console.log('down');
        player1.bottom = player1.bottom - 10;
        movePlayer();
    } 

    // MOVEMENT for Player 2
    else if(e.keyCode === 37){
        // console.log('left');
        player2.right = player2.right + 10;
        movePlayer();
    } else if (e.keyCode === 39){
        // console.log('right');
        player2.right = player2.right - 10;
        movePlayer();
    } else if (e.keyCode === 38){
        // console.log('up');
        player2.bottom = player2.bottom + 10;
        movePlayer();
    }
    else if (e.keyCode === 40){
        // console.log('down');
        player2.bottom = player2.bottom - 10;
        movePlayer();
    }
    // Shooting for Player 1
    // I am pushing a new projectile object onto an array each time the player 'shoots'
    else if (e.keyCode === 71){
        // Play laser sound-1 when Player 1 shoots
        laserSound();
            
        projectilesArrayPlayer1.push({
            left: player1.left + 45,
            bottom: player1.bottom + 100
        });

        console.log("Player 1: pew pew!");
        console.log(projectilesArrayPlayer1);
        drawProjectiles();
    } 
    // Shooting for Player 2
    // I am pushing a new projectile object onto an array each time the player 'shoots'
    else if (e.keyCode === 76){
        // Play laser sound-2 when Player 2 shoots
        laserSound2();

        projectilesArrayPlayer2.push({
            right: player2.right + 45,
            bottom: player2.bottom + 100
        });

        console.log("Player 2: pew pew!");
        console.log(projectilesArrayPlayer2);
        drawProjectiles();
    }
});

// Running our game loop which will move our projectiles once they are fired
updateProjectiles();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// START OF FUNCTION DEFINITIONS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ===========================================================
// This function will be responsible running the game loop 
// ===========================================================
function updateProjectiles(){

    let stop = setTimeout(updateProjectiles, 30);
    drawProjectiles();
    moveProjectiles();
    // hitDetectionPeople();
    hitDetectionAsteroidsP1();
    hitDetectionAsteroidsP2();
    let stopGame = checkForWinnerAsteroids();
    // let stopGame = checkForWinnerPeople();
    
    if(stopGame === true){
        clearInterval(stop);
    }
}

// =======================================================
// Function to move the player left, right, up, and down.
// =======================================================
function movePlayer(){
    let playerOne = document.getElementById('player1');
    let playerTwo = document.getElementById('player2');
    playerOne.style.left = player1.left + "px";
    playerOne.style.bottom = player1.bottom + "px";

    playerTwo.style.right = player2.right + "px";
    playerTwo.style.bottom = player2.bottom + "px";

}

// =============================================================================================================================
// This function is responsible for dynamically adding a projectile to the DOM with the correct absolute positioning values.
// =============================================================================================================================
function drawProjectiles(){
    document.getElementById('projectilesPlayer1').innerHTML = "";
    
    var id = 0; // This variable is used to give each projectile for Player 1 its own id
    var pd = 0; // This variable is used to give each projectile for Player 2 its own id
    for(var i = 0; i < projectilesArrayPlayer1.length; i++){
        document.getElementById('projectilesPlayer1').innerHTML += "<div id='" + id + "' class='projectileStyleForPlayer1' style='left:" + projectilesArrayPlayer1[i].left + "px;" + "bottom:" + projectilesArrayPlayer1[i].bottom + "px;" + "'></div>";   
        id++;     
    }

    document.getElementById('projectilesPlayer2').innerHTML = "";
    for(var i = 0; i < projectilesArrayPlayer2.length; i++){
        document.getElementById('projectilesPlayer2').innerHTML += "<div id='" + pd + "' class='projectileStyleForPlayer2' style='right:" + projectilesArrayPlayer2[i].right + "px;" + "bottom:" + projectilesArrayPlayer2[i].bottom + "px;" + "'></div>";        
        pd++
    }
    
}

// ========================================================================================
// This function will be responsible for updating the coordinates of the projectiles  
// ========================================================================================
function moveProjectiles(){
    // console.log('game loop running....')
    
    for(let i = 0; i < projectilesArrayPlayer1.length; i++){
        
        projectilesArrayPlayer1[i].bottom += 10;
        // drawProjectiles();
        // console.log(typeof(projectilesArrayPlayer1[i].bottom));
    }
    
    for(let i = 0; i < projectilesArrayPlayer2.length; i++){
        projectilesArrayPlayer2[i].bottom += 10;
        // drawProjectiles();
        // console.log(projectilesArrayPlayer2[i].bottom);
    }
    
    // This 'for' loop will remove player 1's projectiles from its array once it has moved off the screen
    for(let i = 0; i < projectilesArrayPlayer1.length; i++){
        if(projectilesArrayPlayer1[i].bottom > 800){
            let index  = projectilesArrayPlayer1.indexOf(projectilesArrayPlayer1[i]);
            if(index != -1){
                projectilesArrayPlayer1.splice(index, 1);
            }
        } 
    }
    // This 'for' loop will remove player 2's projectiles from its array once it has moved off the screen
    for(let i = 0; i < projectilesArrayPlayer2.length; i++){
        if(projectilesArrayPlayer2[i].bottom > 800){
            let index  = projectilesArrayPlayer2.indexOf(projectilesArrayPlayer2[i]);
            if(index != -1){
                projectilesArrayPlayer2.splice(index, 1);
            }
        }
    } 
}

// ========================================================================================
// This function will detect collisions between Player 1's projectiles and asteroids
// ========================================================================================
function hitDetectionAsteroidsP1() {
    let asteroids = document.getElementsByClassName('asteroid');

    // console.log(asteroids);
    for(var i = 0; i < asteroids.length; i++){
        // if asteroid exists...
        if(asteroids[i]){
            let asteroidDOM = asteroids[i].getBoundingClientRect();
            // console.log(asteroidDOM);
            for(let x = 0; x < projectilesArrayPlayer1.length; x++){
                let missile = document.getElementById(x);
                let missileDOM = missile.getBoundingClientRect();
                
                // I added +10 and -10 to the asteroid's right and left properties to account for the offset from the missile.
                if(missileDOM.bottom <= asteroidDOM.bottom + 25 && missileDOM.right < asteroidDOM.right + 10 && missileDOM.left > asteroidDOM.left - 10){
                    console.log('PLayer 1 HIT!');
                    player1Score++;

                    // Player score animation on successful hit
                    player_1_Score.classList.add('scoreAnimation');
                    setTimeout(function(){player_1_Score.classList.remove('scoreAnimation');}, 500);
                    player_1_Score.innerHTML = player1Score;
                    
                    // animation to spin bitcoin image on successful hit
                    bitcoinP1.classList.add('bitcoinSpin');
                    setTimeout(function(){bitcoinP1.classList.remove('bitcoinSpin');}, 500);

                    // asteroids[i].classList.add('blowUp');

                    // Removing asteroids once they are hit
                    asteroids[i].remove();
                    projectilesArrayPlayer1.splice(projectilesArrayPlayer1[x], 1);
                }        
            }
        }
    }
}

// ========================================================================================
// This function will detect collisions between Player 2's projectiles and asteroids
// ========================================================================================
function hitDetectionAsteroidsP2() {
    let asteroids = document.getElementsByClassName('asteroid');

    // console.log(asteroids);
    for(var i = 0; i < asteroids.length; i++){
        // if asteroid exists...
        if(asteroids[i]){
            let asteroidDOM = asteroids[i].getBoundingClientRect();
            // console.log(asteroidDOM);
            
            for(let y = 0; y < projectilesArrayPlayer2.length; y++){
                let missile = document.getElementById(y);
                let missileDOM = missile.getBoundingClientRect();
        
                if(missileDOM.bottom <= asteroidDOM.bottom + 25 && missileDOM.right < asteroidDOM.right + 10  && missileDOM.left > asteroidDOM.left - 10){
                    console.log('PLayer 2 HIT!');
                    player2Score++;

                    // Player score animation on successful hit
                    player_2_Score.classList.add('scoreAnimation');
                    setTimeout(function(){player_2_Score.classList.remove('scoreAnimation');}, 1000);
                    player_2_Score.innerHTML = player2Score;
                   
                    // animation to spin bitcoin image on successful hit
                    bitcoinP2.classList.add('bitcoinSpin');
                    setTimeout(function(){bitcoinP2.classList.remove('bitcoinSpin');}, 1000);

                    // asteroids[i].classList.add('blowUp');

                    // Removing asteroids once they are hit
                    asteroids[i].remove();
                    projectilesArrayPlayer2.splice(projectilesArrayPlayer2[y], 1);
                }
            }
        }
    }
}

// ========================================================================================
// This function will check for the winner of the game once all asteroids are destroyed
// ========================================================================================
function checkForWinnerAsteroids() {
    let winningModal = document.getElementById('winningModal');
    let winningModalContent = document.getElementById('winningModalContent');

    let gameOver = false;
    let totalScore = player1Score + player2Score;

    if(totalScore === 32){
        if( player1Score === player2Score){
            gameOver = true;
            winningModalContent.innerHTML = "TIE!";
            winningModal.style.display = "block";
            return gameOver;
        } else if (player1Score > player2Score){
            gameOver = true;
            winningModalContent.innerHTML = "SPACESHIP WINS!";
            winningModal.style.display = "block";
            return gameOver;
        } else {
            winningModalContent.innerHTML = "UFO WINS!";
            winningModal.style.display = "block";
            gameOver = true;
            return gameOver;
        }
    }

    return gameOver;
}

// ========================================================================================
// This function will check for the winner of the game once all people are destroyed
// ========================================================================================
function checkForWinnerPeople() {
    let winningModal = document.getElementById('winningModal');
    let winningModalContent = document.getElementById('winningModalContent');

    let gameOver = false;
    let totalScore = player1Score + player2Score;

    if(totalScore === 14){
        if( player1Score === player2Score){
            gameOver = true;
            winningModalContent.innerHTML = "TIE!";
            winningModal.style.display = "block";
            return gameOver;
        } else if (player1Score > player2Score){
            gameOver = true;
            winningModalContent.innerHTML = "SPACESHIP WINS!";
            winningModal.style.display = "block";
            return gameOver;
        } else {
            winningModalContent.innerHTML = "UFO WINS!";
            winningModal.style.display = "block";
            gameOver = true;
            return gameOver;
        }
    }

    return gameOver;
}

// ===================================
// These functions control audio 
// ===================================
function laserSound(){
    document.getElementById("laserSound").play();
}
function laserSound2(){
    document.getElementById("laserSound2").play();
}
function setHalfVolume() {
    var myAudio = document.getElementById("background-music");  
    myAudio.volume = 0.3; 
}


// ========================================
// This section controls modal behaviour 
// ========================================
// Get Modal Element
let modal = document.getElementById('instructionsModal');

// Get Modal Button
let modalButton = document.getElementById('modalBtn');

// Get Modal Close Button
let modalCloseButton = document.getElementById('closeBtn');

// Show modal when 'Instructions' button is clicked
modalButton.addEventListener('click', function() {
    modal.style.display = "block";
})

// Close modal when 'x' is clicked
modalCloseButton.addEventListener('click', function() {
    modal.style.display = "none";
})

// Close modal if user clicks outside of modal
window.addEventListener('click', function(e) {
    if(e.target == modal){
        modal.style.display = "none";
    }
    
})

