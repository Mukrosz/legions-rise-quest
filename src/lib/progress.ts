/**
 * Progress tracking via localStorage
 * State lives in browser cache only
 */

const PROGRESS_KEY = 'roman.ascent.progress';
const INPUT_KEY_PREFIX = 'roman.ascent.s';
const ENEMY_DEFEATS_KEY = 'roman.ascent.s2.enemies';

export interface Progress {
  stage: number; // 0 = landing, 1-5 = stages, 6 = victory
  timestamp: number;
}

export interface EnemyDefeats {
  beastmaster: boolean;
  tigress: boolean;
  archer: boolean;
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
    
    // Clear enemy defeats
    localStorage.removeItem(ENEMY_DEFEATS_KEY);
  } catch (e) {
    console.error('Failed to reset progress:', e);
  }
}

/**
 * Get completion percentage
 */
export function getCompletionPercentage(): number {
  const progress = getProgress();
  return Math.round((progress.stage / 6) * 100);
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
    'Laurels of Triumph',
  ];
  
  return names[stage] || 'Unknown';
}

/**
 * Get enemy defeats for Stage 2
 */
export function getEnemyDefeats(): EnemyDefeats {
  if (typeof window === 'undefined') {
    return { beastmaster: false, tigress: false, archer: false };
  }

  try {
    const stored = localStorage.getItem(ENEMY_DEFEATS_KEY);
    if (!stored) {
      return { beastmaster: false, tigress: false, archer: false };
    }
    
    return JSON.parse(stored) as EnemyDefeats;
  } catch (e) {
    return { beastmaster: false, tigress: false, archer: false };
  }
}

/**
 * Mark an enemy as defeated
 */
export function defeatEnemy(enemyId: 'beastmaster' | 'tigress' | 'archer'): void {
  if (typeof window === 'undefined') return;

  try {
    const defeats = getEnemyDefeats();
    defeats[enemyId] = true;
    localStorage.setItem(ENEMY_DEFEATS_KEY, JSON.stringify(defeats));
  } catch (e) {
    console.error('Failed to save enemy defeat:', e);
  }
}

/**
 * Check if all enemies are defeated
 */
export function areAllEnemiesDefeated(): boolean {
  const defeats = getEnemyDefeats();
  return defeats.beastmaster && defeats.tigress && defeats.archer;
}

/**
 * Get the collected word fragments
 */
export function getCollectedFragments(): string[] {
  const defeats = getEnemyDefeats();
  const fragments: string[] = [];
  
  if (defeats.beastmaster) fragments.push('vi');
  if (defeats.tigress) fragments.push('rt');
  if (defeats.archer) fragments.push('us');
  
  return fragments;
}

/**
 * Reset enemy defeats (for testing or replay)
 */
export function resetEnemyDefeats(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(ENEMY_DEFEATS_KEY);
  } catch (e) {
    console.error('Failed to reset enemy defeats:', e);
  }
}

