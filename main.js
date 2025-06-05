const quiz = {
    questions: [
        {
            id: 0,
            question: "Wat is het antwoord van deze vraag?",
            options: ["Antwoord 1", "Antwoord 2", "Antwoord 3"],
            answer: "Antwoord 2",
        },
        {
            id: 1,
            question: "Wat is het antwoord van de volgende vraag?",
            options: ["Antwoord 1", "Antwoord a;sdjf;aslkdfj2", "Antwoord 3"],
            answer: "Antwoord 1",
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
let questionsHad = 0;
let questionsRight = parseInt(localStorage.getItem("questionsRight")) || 0;


let questionIndex = 0;
let currentQuestion = quiz.questions[questionIndex];

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

function DisableQuestions(questionId) {
    let answerId = "answer_" + questionId;
    _answersArray.forEach(answer => {
        if (answer.id != answerId) {
            answer.disabled = true;
        }
    });

}

function ResetQuestions() {
    _answersArray.forEach(answer => {
        answer.disabled = false;
    });
}

function CheckQuestion(questionId) {
    if (questionId == questionIndex) {
        _showOutcome.innerText = "Goed";
        questionsRight++;
        localStorage.setItem("questionsRight", questionsRight);
    } else {
        _showOutcome.innerText = "Niet goed";
    }
    DisableQuestions(questionId);
    console.log(questionsRight);
}

function SetQuestionInfo() {
    let show = document.querySelectorAll(".question_count");
    show.forEach(tag => {
        tag.innerText = `${questionsHad}/${questionsCount}`
    });
    questionsHad++;

    if (_right_question != null) {
        _right_question.innerText = `${questionsCount}/${localStorage.getItem("questionsRight")}`
        console.log(questionsRight);
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

    currentQuestion = quiz.questions[questionIndex]

    SetQuestion(currentQuestion);
    SetAnswers(currentQuestion);
    SetQuestionInfo();
    ResetQuestions();
}


function StartQuiz() {
    SetQuestion(currentQuestion);
    SetAnswers(currentQuestion);
    SetQuestionInfo();
}

