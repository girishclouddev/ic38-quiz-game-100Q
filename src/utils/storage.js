import { getCurrentUser } from './auth';

const getStorageKey = () => 'lic_exam_progress_' + getCurrentUser();

export const getProgress = () => {
  const key = getStorageKey();
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return {
    user: getCurrentUser(),
    completedRounds: [],
    scores: {},
    answers: {},
    streak: 0,
    lastPlayed: null,
  };
};

export const saveProgress = (progressData) => {
  const key = getStorageKey();
  localStorage.setItem(key, JSON.stringify(progressData));
};

export const updateRoundResult = (roundId, score, roundAnswers) => {
  const progress = getProgress();

  if (!progress.completedRounds.includes(roundId)) {
    progress.completedRounds.push(roundId);
    progress.completedRounds.sort((a, b) => a - b);
  }

  progress.scores[roundId] = score;
  progress.answers[roundId] = roundAnswers;

  // Update streak
  const today = new Date().toDateString();
  if (progress.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (progress.lastPlayed === yesterday.toDateString()) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }
    progress.lastPlayed = today;
  }

  saveProgress(progress);
};

export const resetProgress = () => {
  const key = getStorageKey();
  localStorage.removeItem(key);
};
