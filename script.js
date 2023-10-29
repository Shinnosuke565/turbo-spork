let score = 0;
let currentQuestion = 0;

document.getElementById('welcome').style.display = 'block';

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(response => response.json())
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        startQuiz(data.results);
    });
});

function startQuiz(questions) {
    displayQuestion(questions[currentQuestion], currentQuestion + 1);
    
    document.body.addEventListener('click', (event) => {
        if(event.target.classList.contains('choice')) {
            if(event.target.dataset.answer === 'true') {
                score++;
            }
            if(currentQuestion < questions.length - 1) {
                currentQuestion++;
                displayQuestion(questions[currentQuestion], currentQuestion + 1);
            } else {
                document.getElementById('quiz-container').style.display = 'none';
                document.getElementById('result').style.display = 'block';
                document.getElementById('score').innerText = score;
            }
        }
        
        if(event.target.id === 'retry') {
            score = 0;
            currentQuestion = 0;
            document.getElementById('result').style.display = 'none';
            document.getElementById('welcome').style.display = 'block';
        }
    });
}

function displayQuestion(question, questionNumber) {
  document.getElementById('question-number').innerText = "問題" + questionNumber;
    
  let detailsContainer = document.getElementById('details');
    
  detailsContainer.innerHTML = '';
    
  let categoryElement = document.createElement('p');
  categoryElement.innerText = "[ジャンル]：" + question.category;
    
  let difficultyElement = document.createElement('p');
  difficultyElement.innerText = "[難易度]：" + question.difficulty;
    
  detailsContainer.appendChild(categoryElement);
  detailsContainer.appendChild(difficultyElement);
    
  document.getElementById('question').innerText = question.question;
    
  let choicesContainer = document.getElementById('choices');
    
  choicesContainer.innerHTML = '';
    
  let choices = [...question.incorrect_answers, question.correct_answer];
    
  choices.forEach(choice => {
    let button = document.createElement('button');
        
    button.innerText = choice;
        
    button.classList.add('choice');
        
    if (choice === question.correct_answer) {
      button.dataset.answer = 'true';
    }
        
    choicesContainer.appendChild(button);
        
    choicesContainer.appendChild(document.createElement('br'));
        
    choicesContainer.appendChild(document.createElement('br'));
  });
};