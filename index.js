import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/generate-question-paper', (req, res) => {
    // Read questions from a JSON file or database
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));

// Extract totalMarks and distribution from the request body
const { totalMarks, distribution } = req.body;

// Calculate the weightage of each difficulty level based on marks
const weightage = {
  easy: 5,
  medium: 10,
  hard: 15,
};

const totalEasyMarks = (distribution.easy/100)*totalMarks;
const totalMediumMarks = (distribution.medium/100)*totalMarks;
const totalHardMarks = (distribution.hard/100)*totalMarks;


const numEasy = Math.round(totalEasyMarks/weightage.easy);
const numMedium = Math.round(totalMediumMarks/weightage.medium);
const numHard = Math.round(totalHardMarks/weightage.hard);


const easyQuestions = questions.filter(question => question.difficulty === 'Easy');
const mediumQuestions = questions.filter(question => question.difficulty === 'Medium');
const hardQuestions = questions.filter(question => question.difficulty === 'Hard');

const getRandomQuestions = (questionPool,count) =>{
    const shuffled = questionPool.sort(()=> 0.5 - Math.round());
    return shuffled.slice(0,count); 
} 

const selectedEasy = getRandomQuestions(easyQuestions, numEasy);
const selectedMedium = getRandomQuestions(mediumQuestions, numMedium);
const selectedHard = getRandomQuestions(hardQuestions, numHard);

// Combine selected questions into the question paper
const questionPaper = [...selectedEasy, ...selectedMedium, ...selectedHard];

// Send the generated question paper as a response
res.json({ questionPaper });

  });
  
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
