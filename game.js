var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isKeyPressed = false;
var isGameOver = false;

//1-4 numbers were randomly generated(randomNumber). There is a corresponding color for each number(randomChosenColour).Each random color is recorded in a array(gamePattern).
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //change title with dynamic level.
  $("#level-title").html("Level " + gamePattern.length);

  //added sounds corresponding to each color
  var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");

  //Added animation and sounds to each randomly selected buttons
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  audio.play();
}

//when you press the keyboard, the title changes and the first random color appears, animation is added, sound plays with nextSequence()
$("body").keypress(function () {
  if (isKeyPressed === false) {
    nextSequence();
    isKeyPressed = true;
  } else if (isGameOver === true) {
    startOver();
    isGameOver = false;
  }
});

//Added sound to clicked button
$(".btn").click(function () {
  if (isKeyPressed === false) return;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  var audio = new Audio("./sounds/" + userChosenColour + ".mp3");
  audio.play();
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Add Animations to User Clicks.
function animatePress(currentColour) {
  if (isKeyPressed === false) return;
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  setTimeout(function () {
    nextSequence();
    $("#level-title").html("Level " + gamePattern.length);
  }, 500);
}
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
      return;
    } else {
      return;
    }
  } else {
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);

    $("#level-title").html("Game Over, Press Any Key to Restart");
    isGameOver = true;
  }
}
