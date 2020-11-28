var question=document.getElementById("question"),choices=Array.from(document.getElementsByClassName("card__answer"));const scoreTracker=document.getElementById("score"),questionTracker=document.getElementById("questionTracker"),gameOverlay=document.getElementById("gameOverlay"),questionLoader=document.getElementById("loader"),mainPage=document.getElementById("mainPage"),gamePage=document.getElementById("gamePage"),launchGame=document.getElementById("startGame"),mainLoader=document.getElementById("loaderMain"),difficulty=document.getElementById("selectDiff"),selectErrorMessage=document.getElementById("selectErrorMessage");let gameUrl="https://opentdb.com/api.php?amount=10&type=multiple",score=0,questionCounter=0,currentQuestion={},availableQuestions=[],questions=[];launchGame.addEventListener("click",()=>{selectErrorMessage.innerText="",0!=difficulty.value.length?(gameUrl+=`&difficulty=${difficulty.value}`,fetch(gameUrl).then(e=>e.json()).then(e=>{var t=Array.from(e.results);questions=t.map(e=>{const t={question:e.question},s=[...e.incorrect_answers];return t.answer=Math.floor(3*Math.random())+1,s.splice(t.answer-1,0,e.correct_answer),s.forEach((e,s)=>{t[s+1]=e}),t}),mainPage.classList.add("hidden"),mainLoader.classList.remove("hidden"),setTimeout(()=>{gamePage.classList.remove("hidden"),mainLoader.classList.add("hidden"),startGame()},1e3)}).catch(e=>{console.error(e)}),startGame=(()=>{score=0,availableQuestions=[...questions],questionCounter=0,getQuestion()})):selectErrorMessage.innerText="Please select difficulty!"});const MAX_QUESTIONS=10,CORRECT_BONUS=10;getQuestion=(()=>{if(0===availableQuestions.length||questionCounter>=10){gamePage.classList.add("hidden"),mainLoader.classList.remove("hidden"),mostRecentScore=score;const e={difficulty:difficulty.value,score:score};return localStorage.setItem("highScoresScore",JSON.stringify(e)),localStorage.setItem("mostRecentScore",mostRecentScore),window.location.assign("/end.html")}questionCounter++,questionTracker.style.width=10*questionCounter+"%";const e=Math.floor(Math.random()*availableQuestions.length);currentQuestion=availableQuestions[e],question.innerText=currentQuestion.question||{},choices.forEach(e=>{const t=e.dataset.answer;e.innerText=currentQuestion[t]}),availableQuestions.splice(e,1)}),choices.forEach(e=>{e.addEventListener("click",e=>{const t=e.target.dataset.answer==currentQuestion.answer?"correct":"incorrect";if("correct"==t){const e=10*++score;scoreTracker.innerText=e}e.target.classList.add(t),setTimeout(()=>{gameOverlay.classList.add("hidden"),questionLoader.classList.remove("hidden")},350),setTimeout(()=>{e.target.classList.remove(t),gameOverlay.classList.remove("hidden"),questionLoader.classList.add("hidden"),getQuestion()},1500)})});