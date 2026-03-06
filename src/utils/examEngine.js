import questionsData from '../data/questions.json';

// Return questions for a specific round (1-10)
export const getQuestionsForRound = (roundId) => {
    const roundIdx = parseInt(roundId, 10) - 1;
    const startIndex = roundIdx * 20;
    const endIndex = startIndex + 20;
    const qs = Array.isArray(questionsData) ? questionsData : questionsData.questions;
    // Fallback if there are fewer questions, though mock implies 500+
    return qs.slice(startIndex, endIndex);
};

// Return 50 random questions for mock test
export const getQuestionsForMockTest = () => {
    const qs = Array.isArray(questionsData) ? questionsData : questionsData.questions;
    const allQs = [...qs];
    // Fisher-Yates shuffle
    for (let i = allQs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQs[i], allQs[j]] = [allQs[j], allQs[i]];
    }
    return allQs.slice(0, 50);
};

export const getTotalRounds = () => {
    return 25; // Fixed as requested: 25 rounds, 500 questions
};

export const evaluateRound = (questions, userAnswers) => {
    let score = 0;
    const wrongAnswers = [];

    questions.forEach(q => {
        const answerIndex = userAnswers[q.id];
        if (answerIndex === q.correctAnswerIndex) {
            score += 1;
        } else {
            wrongAnswers.push({
                question: q,
                userAnswer: answerIndex !== undefined ? q.options[answerIndex] : null,
                correctAnswer: q.options[q.correctAnswerIndex],
            });
        }
    });

    return {
        score,
        total: questions.length,
        wrongAnswers,
        accuracy: Math.round((score / questions.length) * 100),
    };
};

export const isPass = (score) => {
    return score >= 35; // out of 50
};
