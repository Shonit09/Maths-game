var playing=false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if click start/reset
document.getElementById("startreset").onclick=function(){
    //if we are playing
    if(playing==true){
        location.reload();//reload page
    }
    else{//if we are not playing

        //change mode to playing
        playing=true;

        //set score to 0
        score=0;
        document.getElementById("scorevalue").innerHTML=score;

        //show countdown box
        show("timeremaining");
        timeremaining=60;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;

        //hide the game over box
        hide("gameover");

        //change button to reset
        document.getElementById("startreset").innerHTML="Reset Game";

        //start countdown
        startCountdown();

        //generate a new Q&A
        generateQA();
    }
}

//clicking on the answer box

for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick=function(){
        //check if we are playing
        if(playing==true){
            if(this.innerHTML==correctAnswer){
                //correct answer
    
                //increase score by 1
                score++;
                document.getElementById("scorevalue").innerHTML=score;
    
                //hide the wrong box and show the correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct")
                },1000);
    
                //Generate new Q&A
                generateQA();
            }
            else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong")
                },1000);
            }
        }
    }
}

//functions

//start counter
function startCountdown(){
    action=setInterval(function(){
        timeremaining-=1;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        if(timeremaining==0){//game over
            stopCountdown();
            show("gameover");       
            document.getElementById("gameover").innerHTML="<p>game over!</p><p>your score is "+score+".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML="Start Game";
        }
    },1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide an element
function hide(Id){
    document.getElementById(Id).style.display="none";
}

//show an element
function show(Id){
    document.getElementById(Id).style.display="block";
}

//generate question and multiple answers
function generateQA(){
    var x= 1+Math.round(19*Math.random());
    var y= 1+Math.round(19*Math.random());
    correctAnswer=x*y;
    document.getElementById("question").innerHTML=x+"x"+y;
    var correctPosition=1+Math.round(3*Math.random());
    
    //fill one box with the correct answer
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer;

    //fill the other boxes with wrong answers
    var answers=[correctAnswer];
    for(i=1;i<5;i++){
        if(i!=correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer=(1+Math.round(19*Math.random()))*(1+Math.round(19*Math.random()));//wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)

            document.getElementById("box"+i).innerHTML=wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}