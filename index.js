import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());

app.post('/generate-question-paper', (req,res)=>{
    const questions = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));
    const {totalMarks , distribution } = req.body;
    const totalQuestions = questions.length;
    const numEasy = Math.round(totalQuestions*(distribution.easy/100));
    const numMedium = Math.round(totalQuestions*(distribution.medium/100));
    const numHard = Math.round(totalQuestions*(distribution.hard/100));

    const easyQuestions = questions.filter(question => question.difficulty === "easy");
    const mediumQuestions = questions.filter(question => question.difficulty === "medium");
    const hardQuestions = questions.filter(question => question.difficulty === "hard");

    const getRandomQuestions = (arr,count)=>{
        const shuffled = arr.sort(()=> 0.5-Math.random());
        return shuffled.slice(0,count);
    } 

    let questionPaper = [];

    const getTotalMarks = (arr) => arr.reduce((acc, curr) => acc + curr.marks, 0);

    while (true) {
        const selectedEasy = getRandomQuestions(easyQuestions, numEasy);
        const selectedMedium = getRandomQuestions(mediumQuestions, numMedium);
        const selectedHard = getRandomQuestions(hardQuestions, numHard);

        questionPaper = [...selectedEasy, ...selectedMedium, ...selectedHard];

        const totalMarksSelected = getTotalMarks(questionPaper);

        if (totalMarksSelected === totalMarks) {
            break;
        }
    }

   res.json({questionPaper});
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});