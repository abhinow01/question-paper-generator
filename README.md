# Question Paper Generator

## Overview
This repository contains a question paper generation server built with Express.js. It allows users to create custom question papers based on specified criteria such as total marks and the distribution of difficulty levels.

## Features
- **Customizable Question Paper Generation**: Generate question papers based on the total marks and the distribution of easy, medium, and hard questions.
- **Server API Endpoint**: Utilize the `/generate-question-paper` endpoint to request a custom question paper.

## Getting Started
1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Dependencies**: Run `npm install` to install the necessary dependencies.
3. **Start the Server**: Execute `node index.js` to start the server.

## Usage
### Server Configuration
- The server runs on `http://localhost:<PORT>` (Replace `<PORT>` with the desired port number).

### API Endpoint
- Send a POST request to `/generate-question-paper` to create a question paper.
- Include a request body in the following format:
### example : 
{
  "totalMarks": 100,
  "distribution": {
    "easy": 20,
    "medium": 50,
    "hard": 30
  }
}

## Explanation of logic: 
The process behind generating a custom question paper involves several steps:
Request Handling: Upon receiving a request, the server reads the available question database (questions.json in this case ).
Distribution Calculation: It calculates the number of easy, medium, and hard questions based on the specified distribution percentages and total questions available.
Question Filtering: Questions are filtered based on their difficulty level (easy, medium, hard).
Random Selection: Random questions are selected from each difficulty level based on the calculated counts.
Validation of Total Marks: The system ensures that the total marks of the generated question paper match the specified totalMarks in the request body.

