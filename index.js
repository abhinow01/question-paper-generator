import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/generate-question-paper', (req, res) => {
  const questions = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));

  const { totalMarks, distribution } = req.body;
  const easyQuestions = questions.filter(question => question.difficulty === 'Easy');
  const mediumQuestions = questions.filter(question => question.difficulty === 'Medium');
  const hardQuestions = questions.filter(question => question.difficulty === 'Hard');

  console.log('Received request:', req.body); // Log the request body to understand its structure

  const totalQuestions = questions.length;
  if (distribution && typeof distribution === 'object') {
    const numEasy = Math.round(totalQuestions * (distribution.easy / 100));
    const numMedium = Math.round(totalQuestions * (distribution.medium / 100));
    const numHard = Math.round(totalQuestions * (distribution.hard / 100));

    const getRandomQuestions = (arr, count) => {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const questionPaper = [
      ...getRandomQuestions(easyQuestions, numEasy),
      ...getRandomQuestions(mediumQuestions, numMedium),
      ...getRandomQuestions(hardQuestions, numHard)
    ];

    res.json({ questionPaper });
  } else {
    res.status(400).json({ error: 'Invalid payload format' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
