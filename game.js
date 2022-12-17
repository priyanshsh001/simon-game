buttoncolors = ["red", "blue", "green", "yellow"];
userclickedpattern = [];
gamepattern =[];

var started=false;



var level=0;

function nextsequence(rand) {
    userclickedpattern = [];
    document.querySelector("h1").innerHTML="level "+level;
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttoncolors[randomNumber];
    gamepattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    
};



  for(var i=0;i<document.querySelectorAll(".btn").length;++i)
  {
        var userChosenColour=document.querySelectorAll(".btn")[i].addEventListener("click",function(){
            userclickedpattern.push(this.id);
  
            playsound(this.id);
            animatePress(this.id);
          
            //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
            checkAnswer(userclickedpattern.length-1);
        });
  }
document.addEventListener("keydown",function(){
    if(started==false)
    {
        
        nextsequence();
        started =true;
    }

});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamepattern[currentLevel] === userclickedpattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userclickedpattern.length === gamepattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextsequence();
        }, 1000);

      }

    } else {
        var audio = new Audio("./sounds/" + "wrong" + ".mp3");
        audio.play();
        document.querySelector("body").classList.add("game-over");
       setTimeout(function(){
        document.querySelector("body").classList.remove("game-over");
        // classList.add("game-over");
       },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
      
      console.log("wrong");

    }

}
function playsound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentcolor)
{
  document.querySelector("."+currentcolor).classList.add("pressed");
  setTimeout(function(){
     document.querySelector("."+currentcolor).classList.remove("pressed")},100)
}
function startover()
{
    gamepattern=[];
    started=false;
    level=0;
}