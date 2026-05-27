const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questionsPath = path.join(__dirname, 'questions.json');
const quizData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

let currentQuestion = 0;
let score = 0;

console.log("=========================================");
console.log("🚀 Welcome to the Gmonetization Exam 🚀");
console.log("=========================================\n");

function askQuestion() {
  if (currentQuestion < quizData.questions.length) {
    const q = quizData.questions[currentQuestion];
    console.log(`[${q.module}]`);
    console.log(`${currentQuestion + 1}. ${q.question}`);
    q.options.forEach(opt => console.log(opt));
    
    rl.question('\nYour answer (A, B, C, or D): ', (answer) => {
      if (answer.trim().toUpperCase() === q.answer) {
        console.log("✅ Correct!\n");
        score++;
      } else {
        console.log(`❌ Incorrect. The correct answer was ${q.answer}.\n`);
      }
      currentQuestion++;
      askQuestion();
    });
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const finalPercentage = Math.round((score / quizData.questions.length) * 100);
  console.log("=========================================");
  console.log(`🎯 Final Score: ${finalPercentage}%`);
  
  if (finalPercentage >= quizData.passThreshold) {
    console.log("🎓 Congratulations! You passed the Gmonetization course.");
    console.log("Next Step: Commit these logs and open a PR to trigger your GitHub Actions Certificate!");
    // In a full build, this could automatically write a pass.log file for GitHub Actions to read
  } else {
    console.log(`⚠️ You need ${quizData.passThreshold}% to pass. Review the course and try again.`);
  }
  
  console.log("=========================================");
  rl.close();
}

// Start the quiz
askQuestion();
