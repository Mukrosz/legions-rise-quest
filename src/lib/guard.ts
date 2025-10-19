/**
 * Route guard utilities
 * Prevents unauthorized access to locked stages
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isStageUnlocked } from './progress';

/**
 * Hook to guard a stage page
 * Redirects to landing page if not unlocked
 */
export function useStageGuard(requiredStage: number) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      const unlocked = isStageUnlocked(requiredStage);
      
      if (!unlocked) {
        router.push('/');
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }
      
      setIsChecking(false);
    };

    checkAccess();
  }, [requiredStage, router]);

  return { isChecking, isAllowed };
}

/**
 * Check if user can access a specific stage
 */
export function canAccessStage(stage: number): boolean {
  return isStageUnlocked(stage);
}

