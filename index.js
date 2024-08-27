//getting required elements
const start_btn = document.querySelector(".start_btn button");
const info_Box = document.querySelector(".info_Box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const option_list = document.querySelector(".option_list");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeoff = quiz_box.querySelector("header .time_text");

let username = window.prompt("what's your name?");

//if start quiz button ic clicked
start_btn.onclick = ()=>{
    info_Box.classList.add("activeinfo");//shows info box
}

//if exit button is clicked
exit_btn.onclick = ()=>{
    info_Box.classList.remove("activeinfo");//hides info box
}

//if exit button is clicked
continue_btn.onclick = ()=>{
    info_Box.classList.remove("activeinfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    starttimer(10);
}

let que_count = 0;
let que_numb = 1;
let counter;
let timevalue = 10;
let userscore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    result_box.classList.remove("activeresult");
    quiz_box.classList.add("activeQuiz");
    let que_count = 0;
    let que_numb = 1;
    let timevalue = 10;
    let userscore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    starttimer(timevalue)
    next_btn.style.display = "none";
    timeoff.textContent = "Time Left";
}

quit_quiz.onclick = ()=>{
    window.location.reload();
}

//if next button is clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    starttimer(timevalue)
    next_btn.style.display = "none";
    timeoff.textContent = "Time Left";

    }else{
        clearInterval(counter);
        console.log("Question Completed");
        showResultBox();
    }
}

//getting questions and options from Array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = "<span>"+ questions[index].numb + ". " + questions[index].question +"</span>";
   let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                   + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                  + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionselected(this)");
        
    }
}

let tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossicon = '<div class="icon cross"><i class="fas fa-times"></i></div>'


function optionselected(answer){
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if(userAns == correctAns){
        userscore += 1;
        console.log(userscore);
        answer.classList.add("correct");
      console.log("Answer is Correct");
      answer.insertAdjacentHTML("beforeend", tickicon);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossicon);

        //if answer is in correct then automatically get the right answer
        for (let i = 0; i < alloptions; i++) {
           if(option_list.children[i].textContent ==correctAns){
             option_list.children[i].setAttribute("class", "option correct");
             option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
           }
    }
    }
    //once user select disable all options
    for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled");
        
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_Box.classList.remove("activeinfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeresult");
    const scoretext = result_box.querySelector(".score_text");
    if(userscore > 5){
        let scoretag =  '<span>congrats. You got <p>'+ userscore +'</p> out of <p>'+ questions.length +'</p> </span>';
        scoretext.innerHTML = scoretag ;
    }
    else if(userscore > 5){
        let scoretag =  '<span>Nice. You got only <p>'+ userscore +'</p> out of <p>'+ questions.length +'</p> </span>';
        scoretext.innerHTML = scoretag ;
    }
    else{
        let scoretag =  '<span>and sorry. You got only <p>'+ userscore +'</p> out of <p>'+ questions.length +'</p> </span>';
        scoretext.innerHTML = scoretag ;
    }
}

function starttimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addzero = timeCount.textContent;
            timeCount.textContent = "0" + addzero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeoff.textContent = "Times up";

            let correctAns = questions[que_count].answer;
            let alloptions = option_list.children.length;

            for (let i = 0; i < alloptions; i++) {
                if(option_list.children[i].textContent ==correctAns){
                  option_list.children[i].setAttribute("class", "option correct");
                  option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
                }
         }
         for (let i = 0; i < alloptions; i++) {
            option_list.children[i].classList.add("disabled");
            
        }
        next_btn.style.display = "block";
        }
    }
}







function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag =  '<span><p>'+ index +'</p>of <p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
                                        }
