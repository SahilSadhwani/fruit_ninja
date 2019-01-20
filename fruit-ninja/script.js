//script.js    ------------------fruit ninja-----------------------
    
    
    var score;
    var playing=false;
    var fruits=['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
    
    var trialsLeft;
    var action;
    var step;
    $(function(){
        $("#startreset").click(function(){
            if(playing==true){
                //i wanna reset
                location.reload();
            }
            else{
                //i wanna play
                playing=true;
                score=0;
                $("#scorevalue").text(score);
                trialsLeft=3;
                $("#trialsLeft").show();
                addHearts();
                $("#gameOver").hide();
                $("#startreset").text("Reset Game");
                //start sending fruits
                startAction();
            }
        });
        function addHearts(){
            $("#trialsLeft").empty();
            for(i=0;i<trialsLeft;i++){
                $("#trialsLeft").append("<img src='images/heart.png' class='life'>");
            }
        }
        $("#fruit1").mouseover(function(){
            score++;
            $("#scorevalue").text(score);
            $("#slicesound")[0].play();
            stopAction();
            $("#fruit1").hide("explode",500);
            //again start snding other fruits
            setTimeout(startAction,600);
            
        });
        function startAction(){
            $("#fruit1").show();
            chooseFruit();
            $("#fruit1").css({
                'left':Math.round(Math.random()*550),
                'top':-60,
            });
            
            step=1+Math.round(Math.random()*5);
            action=setInterval(function(){
                $("#fruit1").css("top",$("#fruit1").position().top+step);
                if($("#fruit1").position().top>$("#fruitsContainer").height()){
                    //check if we have trialsleft or not
                    if(trialsLeft>1){
                        //generate a fruit again and reduce the life
                        chooseFruit();
                        $("#fruit1").css({
                             'left':Math.round(Math.random()*550),
                             'top':-60,
                        });
                        step=1+Math.round(Math.random()*5);
                        trialsLeft--;
                        addHearts();
                    }
                    else{
                        //gameover
                        playing=false;
                        $("#startreset").text("Start Game");
                        $("#gameOver").show();
                        $("#gameOver").html("<p>Game Over!</p><p>Your score is "+score+" </p>");
                        $("#trialsLeft").hide();
                        $("#scorevalue").text("");
                        stopAction();
                    }
                }
            },10);
        }
        function chooseFruit(){
            $("#fruit1").attr("src",'images/'+fruits[Math.round(Math.random()*(fruits.length-1))]+'.png');
        }
        function stopAction(){
            clearInterval(action);
        }
    });
    