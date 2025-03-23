buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
gamestart = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    playSound(randomChosenColour);

    $("#" + randomChosenColour)
        .animate({ opacity: 0 }, 100)
        .animate({ opacity: 1 }, 100);
    checkAnswer();
}
$(".btn").on("click", function handlerFunction(event) {
    
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(soundname) {
    switch (soundname) {
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();

            break;
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();

            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();

            break;
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();

            break;

        default:
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            break;
    }
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).on("keypress", function (event) {
    if (!gamestart) {
        gamestart = true;
        level = 0;
        $("h1").text("level " + level);

        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        $("h1").text("Game over click any key to restart");
        $("body").addClass("game-over")
        playSound("wrong");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);



        setTimeout(function () {
            startgame();
        }, 1000);
    }
}
function startgame() {
    level = 0;
    gamePattern = [];
    gamestart = false;
    userClickedPattern = [];

}
