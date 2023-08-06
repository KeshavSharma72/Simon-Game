let gameStarted = false;
let level = 0;
let colors = ["red", "blue", "aqua", "yellow"];
let gameSeq = [];
let userSeq = [];
let maxScore = 0;
let gameOverStatus = false;

//Actions to start the game
document.addEventListener('keypress', function() {
    if (gameStarted == false) {
        initiateGame();
    }
    });
document.addEventListener('touchstart', function() {
    if (gameStarted == false) {
        gameOverStatus = false;
        initiateGame();
    }

    });

//Gives the intro glow up
function initiateGame() {
    gameInProgress = false;

    let boxes = document.querySelectorAll('.box');
    let index = 0;
    let interval = setInterval(function() {
        if (index < boxes.length-1) {
            if (index == 2) {
                index++;
            }
            glow(boxes[index]);
            index++;
        } else {
            glow(boxes[2]);
            clearInterval(interval);
            gameToggle();
        }
    }, 50);

}
   
//Actual games start from here
function gameToggle() {
    gameStarted = true;
    level++;
    let headingElement = document.querySelector('.heading');
    maxScore = Math.max(maxScore, level);
    let max = document.querySelector(".max-score");
    max.innerText = `Max Score: ${maxScore-1}`;
    setTimeout(function() {
        headingElement.innerText = `Level ${level}`;
    }, 800);

    setTimeout(randBtn, 500);
}

//Generates random button 
function randBtn() {
    let randNum = Math.floor(Math.random()*4);
    gameSeq.push(colors[randNum]);
    gameContinue();
}

//Glows the new sequence
function gameContinue() {
    userSeq = [];
    let index = 0;
    let interval = setInterval(function() {
        if (index < gameSeq.length) {
            glow(document.querySelector(`.${gameSeq[index]}`));
            index++;
        } else {
            clearInterval(interval);
        }
    }, 320);
    
}

//User sequence process starts from here
let boxes = document.querySelectorAll(".box")
for(box of boxes) {
    box.addEventListener('click', btnPress);
}

function btnPress() {
    userSeq.push(this.classList[1]);
    glow(this);
    checkSeq(userSeq.length-1);
}

function checkSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            levelUp();
        }
    } else {
        if (level >= 1) {
            gameOver();
        }
    }
}

//Level up fucntion
function levelUp() {
    let body = document.querySelector('div');
    body.classList.add("levelUpFlash");
    setTimeout(function() {
        body.classList.remove("levelUpFlash");
    }, 250);
    level++;
    headingElement.innerText = `Level ${level}`;
    setTimeout(randBtn, 500);
    maxScore = Math.max(maxScore, level);
    let max = document.querySelector(".max-score");
    max.innerText = `Max Score: ${maxScore-1}`;
}

//Level up fucntion
function gameOver() {
    gameOverStatus = true;
    gameStarted = false;
    changeHeadingText();
    userSeq = [];
    gameSeq = [];
    level = 0;
}



//function to give light glowing effect
function glow(element) { 
    if (element.classList.contains("red")) {
        element.classList.add("redFlash");

        setTimeout(function() {
            element.classList.remove("redFlash");
        }, 250);
    } else if(element.classList.contains("blue")) {
        element.classList.add("blueFlash");
        setTimeout(function() {
            element.classList.remove("blueFlash");
        }, 250);
    } else if(element.classList.contains("yellow")) {
        element.classList.add("yellowFlash");
        setTimeout(function() {
            element.classList.remove("yellowFlash");
        }, 250);
    } else if(element.classList.contains("aqua")) {
        element.classList.add("aquaFlash");
        setTimeout(function() {
            element.classList.remove("aquaFlash");
        }, 250);
    }
}

//Changing the heading when screen size <= 400px 
let headingElement = document.querySelector('.heading');
// Function to change the heading text
function changeHeadingText() {
  if (window.innerWidth <= 400 ) {
      if (gameOverStatus == true) {
        if (level == 1) {
            headingElement.innerHTML = `Game over! <br>Your score was 0. Touch the screen to play again`;    
        } else {
            headingElement.innerHTML = `Game over! <br>Your score was ${level-1}. Touch the screen to play again`;    
        }
      } else {
        headingElement.innerText = "Touch the screen to start the game";
      }
    } else {
        if (gameOverStatus == true) {
            if (level == 1) {
                headingElement.innerHTML = `Game over! <br>Your score was 0. Press any key to play again`;    
            } else {
                headingElement.innerHTML = `Game over! <br>Your score was ${level-1}. Press any key to play again`;    
            }
          } else {
            headingElement.innerText = "Press any key to start the game";
          }
    //   headingElement.innerText = "Press any key to start the game";  
  }
}

// Call the function on page load and whenever the window is resized
changeHeadingText();
window.addEventListener('resize', changeHeadingText);

