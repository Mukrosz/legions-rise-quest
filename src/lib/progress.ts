/**
 * Progress tracking via localStorage
 * State lives in browser cache only
 */

const PROGRESS_KEY = 'roman.ascent.progress';
const INPUT_KEY_PREFIX = 'roman.ascent.s';

export interface Progress {
  stage: number; // 0 = landing, 1-5 = stages completed
  timestamp: number;
}

/**
 * Get current progress from localStorage
 */
export function getProgress(): Progress {
  if (typeof window === 'undefined') {
    return { stage: 0, timestamp: 0 };
  }

  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (!stored) {
      return { stage: 0, timestamp: 0 };
    }
    
    const parsed = JSON.parse(stored) as Progress;
    return parsed;
  } catch (e) {
    console.error('Failed to parse progress:', e);
    return { stage: 0, timestamp: 0 };
  }
}

/**
 * Set progress for a completed stage
 */
export function setProgress(stage: number): void {
  if (typeof window === 'undefined') return;

  try {
    const progress: Progress = {
      stage,
      timestamp: Date.now(),
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

/**
 * Check if a stage is unlocked
 */
export function isStageUnlocked(requiredStage: number): boolean {
  const progress = getProgress();
  return progress.stage >= requiredStage - 1; // Stage N unlocks if N-1 is complete
}

/**
 * Save user input for a stage (persist field content)
 */
export function saveStageInput(stage: number, input: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(`${INPUT_KEY_PREFIX}${stage}.input`, input);
  } catch (e) {
    console.error('Failed to save stage input:', e);
  }
}

/**
 * Load user input for a stage
 */
export function loadStageInput(stage: number): string {
  if (typeof window === 'undefined') return '';

  try {
    return localStorage.getItem(`${INPUT_KEY_PREFIX}${stage}.input`) || '';
  } catch (e) {
    console.error('Failed to load stage input:', e);
    return '';
  }
}

/**
 * Hard reset - clear all progress and cached inputs
 */
export function resetProgress(): void {
  if (typeof window === 'undefined') return;

  try {
    // Clear main progress
    localStorage.removeItem(PROGRESS_KEY);
    
    // Clear all stage inputs
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem(`${INPUT_KEY_PREFIX}${i}.input`);
    }
  } catch (e) {
    console.error('Failed to reset progress:', e);
  }
}

/**
 * Get completion percentage
 */
export function getCompletionPercentage(): number {
  const progress = getProgress();
  return Math.round((progress.stage / 5) * 100);
}

/**
 * Get stage display name
 */
export function getStageName(stage: number): string {
  const names = [
    'Landing',
    'Chains of the Captive',
    'Blood of the Arena',
    "Citizen's Trial",
    'Web of Influence',
    'Vox Senatus',
  ];
  
  return names[stage] || 'Unknown';
}

