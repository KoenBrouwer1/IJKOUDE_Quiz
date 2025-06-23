const quiz = {
    questions: [
        {
            "id": 0,
            "question": "What is the dark web?",
            "options": [
                "A part of the internet that is public to everyone", 
                "A hidden part of the internet that is only accessible with special software", // Right answer
                "A network that is only used by the government",
                "A search engine for illegal activities"
            ],
            "answer": 1
        },
        {
            "id": 1,
            "question": "Why is the dark web often associated with cybercrime?",
            "options": [
                "Because it is only used for legal activities",
                "Because it is only accessible to hackers",
                "Because it offers anonymity to users, attracting criminals", // Right answer
                "Because it does not use encryption"
            ],
            "answer": 2
        },
        {
            "id": 2,
            "question": "Which technology is often mentioned as a tool in fighting cybercrime to do certain tasks faster?",
            "options": [
                "Virtual Reality (VR)",
                "Virtual Machine (VM)",
                "Quantum Computing",
                "Artificial Intelligence (AI)" // Right answer
            ],
            "answer": 3
        },
        {
            "id": 3,
            "question": "Which browser is commonly used to access the dark web?",
            "options": [
                "Google Chrome",
                "Mozilla Firefox",
                "Tor Browser",
                "Microsoft Edge"
            ],
            "answer": 2
        },
        {
            "id": 4,
            "question": "What is a common type of cybercrime that takes place on the dark web?",
            "options": [
                "Online gaming",
                "Sale of stolen identities and data",
                "Sharing public information",
                "Streaming movies"
            ],
            "answer": 1
        },
        {
            "id": 5,
            "question": "Why is it almost inevitable for people to become victims of cyberattacks?",
            "options": [
                "Because everyone has a bad internet connection",
                "Because almost everyone with internet access is a potential target",
                "Because only companies are targeted",
                "Because cyberattacks are rare"
            ],
            "answer": 1
        },
        {
            "id": 6,
            "question": "What is an example of a cyber threat?",
            "options": [
                "Phishing attacks",
                "Online advertisements",
                "Social media posts",
                "Public Wi-Fi networks"
            ],
            "answer": 0
        },
        {
            "id": 7,
            "question": "How is AI used to combat cybercrime according to the video?",
            "options": [
                "By designing websites",
                "By creating new viruses",
                "By speeding up internet connections",
                "By detecting suspicious patterns and preventing attacks"
            ],
            "answer": 3
        },
        {
            "id": 8,
            "question": "What was WannaCry?",
            "options": [
                "A randsomware attack that forced the victem to pay a certain price to regain access to their files", // Right answer
                "Have a very annoying colleague and wannyCry",
                "It is a game on the dark web that if you lose you WannaCry",
                "It is nothing and it is just made up"
            ],
            "answer": 0
        },
        {
            "id": 9,
            "question": "What was the Morris Worm?",
            "options": [
                "A virus developed in 2005 to target smartphones across Europe.",
                "A cybersecurity tool used by the U.S. government to track hackers.",
                "A worm created in 1988 that accidentally infected 10% procent of the internetconnected computers, causing damage at 98 million dollar",
                "An email scam that stole bank credentials from millions of users."
            ],
            "answer": 2
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
const _right_questions = document.querySelector(".right_questions");
const _next_button = document.querySelector("#next-question-btn");

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
    if (_next_button.disabled == true)
        _next_button.disabled = false;
    else
        _next_button.disabled = true;
}

function ResetScore() {
    questionsRight = 0;
    localStorage.setItem("questionsRight", questionsRight);
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
        if (answer != null) {
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
}

function ResetAnswers() {
    _answersArray.forEach(answer => {
        if (answer != null) {
            answer.disabled = false;
            answer.classList.remove(_wrongAnwserClass);
            answer.classList.remove(_rightAnwserClass);
            answer.classList.remove(_selectedWrongClass);
        }
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
    SetNextButton();
}

function GetPercentage() {
    console.log(questionsRight);
    return Math.round((questionsRight/questionsCount) * 100);
}

function SetQuestionInfo() {
    let showCount = document.querySelectorAll(".question_count");
    let showPercentage = document.querySelector("#percentage");

    showCount.forEach(tag => {
        tag.innerText = "HELLO";
    });

    questionsHad++;

    if (_right_questions != null) {
        _right_questions.innerText = `${localStorage.getItem("questionsRight")}/${questionsCount}`
    }

    if(window.location.href === "http://127.0.0.1:8080/result.html") {
        showPercentage.innerText = GetPercentage() + "%";
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
    SetNextButton();
    ResetAnswers();
}


function StartQuiz() {
    SetQuestion(currentQuestion);
    SetAnswers(currentQuestion);
    SetQuestionInfo();
}

function QuizAgain() {
    ResetAnswers();
    ResetScore();
    window.location.href = "quiz.html";
}

