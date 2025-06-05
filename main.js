const quiz = {
    questions: [
        {
            id: 0,
            question: "Wat is het antwoord van deze vraag?",
            options: ["Antwoord 1", "Antwoord 2", "Antwoord 3", "Antwoord 4"],
            answer: 0,
        },
        {
            id: 1,
            question: "Wat is het antwoord van de volgende vraag?",
            options: ["Antwoord 1", "Antwoord a;sdjf;aslkdfj2", "Antwoord 3", "Antwoord 4"],
            answer: 3,
        }
    ]
};

const _answer_0 = document.querySelector("#answer_0");
const _answer_1 = document.querySelector("#answer_1");
const _answer_2 = document.querySelector("#answer_2");
const _answer_3 = document.querySelector("#answer_3");
const _showOutcome = document.querySelector("#show_outcome");

const _answersArray = [_answer_0, _answer_1, _answer_2, _answer_3];

const _question = document.querySelector("#question");
const _right_question = document.querySelector(".right_questions");

const questionsCount = quiz.questions.length;
const _rightAnwserClass = "right-btn";
const _wrongAnwserClass = "wrong-btn";
const _selectedWrongClass = "selected-wrong";

let questionsHad = 0;
let questionsRight = parseInt(localStorage.getItem("questionsRight")) || 0;

let questionIndex = 0;
let currentQuestion = quiz.questions[questionIndex];
let rightAnswer = quiz.questions[questionIndex].answer;

function SetNextButton() {
    document.querySelector("#next-question-btn").style.display = "block";
}

function SetQuestion(currentQuestion) {
    if (_question != null) {
        _question.innerText = currentQuestion.question;
    } else {
        console.log("HE may not do that");
    }
}

function SetAnswers(currentQuestion) {
    let answerIndex = 0;

    _answersArray.forEach(answer => {
        if(answer != null) {
            answer.innerText = currentQuestion.options[answerIndex];
            answerIndex++;
        }
    });

}

StartQuiz();

function SetAnswerColors(answerId, wasRight) {
    let answerIndex = 0;
    let answerBtn = document.querySelector("#answer_" + answerIndex);

    _answersArray.forEach(answer => {
        answer.classList.add(_wrongAnwserClass);
        answer.disabled = true;

        if (answerIndex == rightAnswer) {
            answer.classList.remove(_wrongAnwserClass);
            answerBtn.classList.add(_rightAnwserClass);
        }
        answerIndex++;
        answerBtn = document.querySelector("#answer_" + answerIndex);
    });

    if (wasRight) {
        _answersArray[answerId].classList.remove(_wrongAnwserClass);
        _answersArray[answerId].classList.add(_rightAnwserClass);
    } else {
        _answersArray[answerId].classList.remove(_wrongAnwserClass);
        _answersArray[answerId].classList.add(_selectedWrongClass);
    }

    SetNextButton();
}

function ResetAnswers() {
    _answersArray.forEach(answer => {
        answer.disabled = false;
        answer.classList.remove(_wrongAnwserClass);
        answer.classList.remove(_rightAnwserClass);
        answer.classList.remove(_selectedWrongClass);
    });
}

function CheckQuestion(answerId) {
    let wasRight = false;

    if (answerId == rightAnswer) {
        questionsRight++;
        wasRight = true;
        localStorage.setItem("questionsRight", questionsRight);
    }

    console.log(wasRight);
    SetAnswerColors(answerId, wasRight);
}

function SetQuestionInfo() {
    let show = document.querySelectorAll(".question_count");
    show.forEach(tag => {
        tag.innerText = `${questionsHad}/${questionsCount}`
    });
    questionsHad++;

    if (_right_question != null) {
        _right_question.innerText = `${questionsCount}/${localStorage.getItem("questionsRight")}`
    }
}

function StopQuiz() {
    window.location.href = "result.html";
}


function NextQuestion() {
    questionIndex++;
    if (questionIndex >= quiz.questions.length) {
        questionIndex = quiz.questions.length - 1;
        StopQuiz();
        SetQuestionInfo();
        return;
    }

    currentQuestion = quiz.questions[questionIndex];
    rightAnswer = quiz.questions[questionIndex].answer;

    SetQuestion(currentQuestion);
    SetAnswers(currentQuestion);
    SetQuestionInfo();
    ResetAnswers();
}


function StartQuiz() {
    SetQuestion(currentQuestion);
    SetAnswers(currentQuestion);
    SetQuestionInfo();
}

