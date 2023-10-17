let showRuleButton=document.getElementById('show-rules-button');
let rule=document.getElementById('rules');
let crossButton=document.getElementById('cross-button');
let scissorButton=document.getElementById("scissor-sign");
let fistButton=document.getElementById("fist-sign");
let handButton=document.getElementById("hand-sign");
let gameplay=document.getElementById("gameplay");
let result=document.getElementById("result");
let resultPlayAgainButton=document.getElementById("result-play-again-button");
let circleAnimation=document.querySelectorAll(".circle-animation");
let pccircleAnimation=document.querySelectorAll(".pc-pick-animation");
let usercircleAnimation=document.querySelectorAll(".user-pick-animation");
let userScoreBoard=document.getElementById("user-score-value");
let pcScoreBoard=document.getElementById("pc-score-value");
let userScoreKey = "userScore";
let pcScoreKey = "pcScore";
let resultMessageTitle=document.getElementById("message-title");
let resultMessageOponent=document.getElementById("opponent");
let nextButton=document.getElementById("next-button");
nextButton.style.display="none";
let wholeUpperContainer=document.getElementById("sub-upper-middle-container");
let winnerScreen=document.getElementById("winner-screen");
let winnerScreenPlayButton=document.getElementById("winner-screen-play-button");
winnerScreen.style.display="none";

circleAnimation.forEach(function(element) {
  element.style.display = "none";
});
rule.style.display="none";

result.style.display="none";

function showRules(){
    rule.style.display="";
}
function hideRules(){
    rule.style.display="none";
}

function decideRandomSign(){
    let max=3;
    let min=0;
    let random=parseInt(Math.floor(Math.random() * (max - min) + min));
    return random;

}

function decideWinner(userPick,pcPick){
    //0->rock
    //1->paper
    //2->scissor

    //inner switch case
    //0->false
    //1->true
    //2->tie
    switch(userPick){
        case 0:
            switch(pcPick){
                case 0:
                    return 2;
                case 1:
                    return 0;
                case 2:
                    return 1;
            }
            break;
        case 1:
            switch(pcPick){
                case 0:
                    return 1;
                case 1:
                    return 2;
                case 2:
                    return 0;
            }
            break;
            
        case 2:
            switch(pcPick){
                case 0:
                    return 0;
                case 1:
                    return 1;
                case 2:
                    return 2;
            }
            break;

    }
}

function updateScore(){
    let userScore=0;
    let pcScore=0;

    if(localStorage.getItem(userScoreKey)===null || localStorage.getItem(userScoreKey)=='NaN'  ){
        
        localStorage.setItem(userScoreKey, userScore);
        }

    if(localStorage.getItem(pcScoreKey)===null || localStorage.getItem(pcScoreKey)=='NaN' ){
        localStorage.setItem(pcScoreKey, pcScore);
        
        }

    else{
        userScore = parseInt(localStorage.getItem(userScoreKey));
        pcScore = parseInt(localStorage.getItem(pcScoreKey));
        }
    userScoreBoard.innerHTML=userScore;
    pcScoreBoard.innerHTML=pcScore;

}

updateScore();


function updatePickImg(userPick,pcPick){
    let imageClassMap={
        0:{
            image:"./assets/icons8-fist-67 1.png",
            div:"fist-select"
        },
        1:{
            image:"./assets/icons8-hand-64 1.png",
            div:"hand-select"
        },
        2:{
            image:"./assets/17911 1.png",
            div:"scissor-select"
        }

    }
    let userPickImage=document.getElementById("user-pick-img");
    let userPickDiv=document.getElementById("user-pick-sign");
    let pcPickImage=document.getElementById("pc-pick-img");
    let pcPickDiv=document.getElementById("pc-pick-sign");
    userPickImage.src=imageClassMap[userPick].image;
    pcPickImage.src=imageClassMap[pcPick].image;
    userPickDiv.className=imageClassMap[userPick].div;
    pcPickDiv.className=imageClassMap[pcPick].div;
}

function userWins(){
    let userScore = parseInt(localStorage.getItem(userScoreKey));
    
    localStorage.setItem(userScoreKey, userScore+1);
    updateScore();

    usercircleAnimation.forEach(function(element) {
        element.style.display = "";
      });
      pccircleAnimation.forEach(function(element) {
        element.style.display = "none";
      });

      resultMessageTitle.innerHTML="YOU WON";
      resultMessageOponent.style.display="";
      nextButton.style.display="";
    
}
function pcWins(){
    let pcScore = parseInt(localStorage.getItem(pcScoreKey));  
    localStorage.setItem(pcScoreKey, pcScore+1);
    updateScore();

    pccircleAnimation.forEach(function(element) {
        element.style.display = "";
      });
      usercircleAnimation.forEach(function(element) {
        element.style.display = "none";
      });

      resultMessageTitle.innerHTML="YOU LOST";
      resultMessageOponent.style.display="";
      nextButton.style.display="none";
}
function tie(){
    pccircleAnimation.forEach(function(element) {
        element.style.display = "none";
      });
      usercircleAnimation.forEach(function(element) {
        element.style.display = "none";
      });
      resultMessageTitle.innerHTML="TIE UP";
      resultMessageOponent.style.display="none";
      nextButton.style.display="none";
}
function playGame(userPick){
    pcPick=decideRandomSign();
    let gameResult=decideWinner(userPick,pcPick);  
    setTimeout(function() {
        gameplay.style.display="none";
        result.style.display="";
        updatePickImg(userPick,pcPick);
    }, 200); 

    switch(gameResult){
        case 0:
            pcWins();
            break;
        case 1:
            userWins();
            break;
        case 2:
            tie();
            break;
    }
}

function resultPlayAgain(){
    gameplay.style.display="";
    result.style.display="none";
    nextButton.style.display="none";
}

function gotToWinnerScreen(){
    wholeUpperContainer.style.display="none";
    winnerScreen.style.display="";
    nextButton.style.display="none";
}

function gotToHomeScreen(){
    wholeUpperContainer.style.display="";

    winnerScreen.style.display="none";
    nextButton.style.display="none";
    gameplay.style.display="";
    result.style.display="none";
}

showRuleButton.addEventListener("click",showRules);
crossButton.addEventListener("click",hideRules);
resultPlayAgainButton.addEventListener("click",resultPlayAgain);
scissorButton.addEventListener("click",function(){playGame(2);});
fistButton.addEventListener("click",function(){playGame(0);});
handButton.addEventListener("click",function(){playGame(1);});
winnerScreenPlayButton.addEventListener("click",gotToHomeScreen);
nextButton.addEventListener("click",gotToWinnerScreen);

