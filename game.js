const buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStart = false;
let level = 0;

function playSound(name){
  $("#" + name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
  $("#" + currentColor).removeClass("pressed");
  },100);
}

function nextSequence(){
  //Clear User answers
  userClickedPattern = [];

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  //this one plays the end only
  // playSound(gamePattern[gamePattern.length - 1]);

  //plays the entire sequence again
  let delay = 0;
  gamePattern.forEach(function(color) {
    setTimeout(function() {
      playSound(color);
    }, delay);
    delay += 500;  // Increase delay by 500ms (0.5 second) for each sound
  });

  level++; 
  $("h1").text("Level " + level);
};

function startOver(){
  level = 0
  gamePattern = [];
  userClickedPattern = [];
  gameStart = false;
}

function checkAnswer(currentlevel){
  if(userClickedPattern[currentlevel] === gamePattern[currentlevel]){
    console.log("Success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    //if user got the answer wrong

    playSound("wrong");

    //flash
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    //Change the Title
    $("h1").text("Game Over, Press A to restart!");

    //Call the function if the player wants to reset
    startOver();
  }
}

$(".btn").on("click",function(){
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keyup", function(event){
  if (event.key === "a"){
    nextSequence();
    gameStart = true;
  }
})
