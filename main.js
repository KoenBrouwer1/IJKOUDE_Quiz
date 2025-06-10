const quiz = {
    questions: [
        {
            "id": 0,
            "question": "What is the dark web, as explained in documentaries about cybercrime?",
            "options": [
                "A part of the internet that is public to everyone",
                "A hidden part of the internet that is only accessible with special software",
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
                "Because it offers anonymity to users, attracting criminals",
                "Because it is only accessible to hackers",
                "Because it does not use encryption"
            ],
            "answer": 1
        },
        {
            "id": 2,
            "question": "Which technology is often mentioned as a tool in fighting cybercrime in such documentaries?",
            "options": [
                "Virtual Reality (VR)",
                "Artificial Intelligence (AI)",
                "Blockchain",
                "Quantum Computing"
            ],
            "answer": 1
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
            "question": "What was the Silk Road, as mentioned in documentaries about the dark web?",
            "options": [
                "A legal online marketplace",
                "A dark web website for selling drugs, later shut down by the FBI",
                "A social network on the dark web",
                "A secure communication tool"
            ],
            "answer": 1
        },
        {
            "id": 6,
            "question": "Why does the documentary state that it is almost inevitable for people to become victims of cyberattacks?",
            "options": [
                "Because everyone has a bad internet connection",
                "Because almost everyone with internet access is a potential target",
                "Because only companies are targeted",
                "Because cyberattacks are rare"
            ],
            "answer": 1
        },
        {
            "id": 7,
            "question": "What role does encryption play in the dark web?",
            "options": [
                "It makes websites faster",
                "It provides anonymity and secures communication",
                "It prevents websites from being found",
                "It is not used on the dark web"
            ],
            "answer": 1
        },
        {
            "id": 8,
            "question": "What is an example of a cyber threat mentioned in documentaries about the dark web?",
            "options": [
                "Phishing attacks",
                "Online advertisements",
                "Social media posts",
                "Public Wi-Fi networks"
            ],
            "answer": 0
        },
        {
            "id": 9,
            "question": "How is AI used to combat cybercrime according to the documentary?",
            "options": [
                "By designing websites",
                "By detecting suspicious patterns and preventing attacks",
                "By creating new viruses",
                "By speeding up internet connections"
            ],
            "answer": 1
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
    SetNextButton();
}

function SetQuestionInfo() {
    let show = document.querySelectorAll(".question_count");
    show.forEach(tag => {
        tag.innerText = `${questionsHad}/${questionsCount}`;
    });
    questionsHad++;

    if (_right_questions != null) {
        _right_questions.innerText = `You had ${localStorage.getItem("questionsRight")} of the ${questionsCount} right.`;
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

