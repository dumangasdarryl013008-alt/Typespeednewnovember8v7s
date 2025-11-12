import { useState, useEffect, useCallback } from "react";
import { getAllBadges } from "../constants/BadgeConfig";

const useBadgeTracking = () => {
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    const saved = window.localStorage.getItem("unlockedBadges");
    return saved ? JSON.parse(saved) : [];
  });

  const [badgeStats, setBadgeStats] = useState(() => {
    const saved = window.localStorage.getItem("badgeStats");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        uniqueLetters: new Set(parsed.uniqueLetters || []),
      };
    }
    return {
      consecutiveImprovements: 0,
      lastWpm: 0,
      consecutiveAccuracySessions: 0,
      perfectWords: 0,
      maxCombo: 0,
      comboCount: 0,
      perfectWordStreak: 0,
      comboDuration: 0,
      maxMultiplier: 0,
      survivalTime: 0,
      bonusSeconds: 0,
      closeCallRecoveries: 0,
      correctLetters: 0,
      correctWords: 0,
      uniqueLetters: new Set(),
    };
  });

  const [recentlyUnlocked, setRecentlyUnlocked] = useState(null);

  useEffect(() => {
    window.localStorage.setItem("unlockedBadges", JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  useEffect(() => {
    const statsToSave = {
      ...badgeStats,
      uniqueLetters: Array.from(badgeStats.uniqueLetters || []),
    };
    window.localStorage.setItem("badgeStats", JSON.stringify(statsToSave));
  }, [badgeStats]);

  const checkAndUnlockBadges = useCallback((gameMode, currentStats) => {
    const allBadges = getAllBadges();
    const modeBadges = allBadges.filter((badge) => badge.category === gameMode);
    const newlyUnlocked = [];

    modeBadges.forEach((badge) => {
      if (unlockedBadges.includes(badge.id)) {
        return;
      }

      if (badge.requirement.minTimer && currentStats.timerDuration < badge.requirement.minTimer) {
        return;
      }

      if (badge.requirement.maxTimer && currentStats.timerDuration > badge.requirement.maxTimer) {
        return;
      }

      const progress = badge.getProgress(currentStats);
      let shouldUnlock = false;

      switch (badge.requirement.type) {
        case "wpm_single_round":
          shouldUnlock = currentStats.wpm >= badge.requirement.target;
          break;
        case "wpm_and_accuracy":
          shouldUnlock = currentStats.wpm >= badge.requirement.wpmTarget &&
                         currentStats.accuracy >= badge.requirement.accuracyTarget;
          break;
        case "accuracy_single_round":
          shouldUnlock = currentStats.accuracy >= badge.requirement.target;
          break;
        case "consecutive_improvements":
          shouldUnlock = currentStats.consecutiveImprovements >= badge.requirement.target;
          break;
        case "no_pause":
          shouldUnlock = currentStats.noPause === true;
          break;
        case "points_single_session":
          shouldUnlock = currentStats.points >= badge.requirement.target;
          break;
        case "consecutive_accuracy":
          shouldUnlock = currentStats.consecutiveAccuracySessions >= badge.requirement.target;
          break;
        case "points_with_low_errors":
          shouldUnlock = currentStats.points >= badge.requirement.points && 
                         currentStats.errors < badge.requirement.maxErrors;
          break;
        case "time_remaining":
          shouldUnlock = currentStats.completed && currentStats.timeRemaining < badge.requirement.maxTime;
          break;
        case "no_errors":
          shouldUnlock = currentStats.errors === 0 && currentStats.completed;
          break;
        case "perfect_words":
          shouldUnlock = currentStats.perfectWords >= badge.requirement.target;
          break;
        case "combo_streak":
          shouldUnlock = currentStats.maxCombo >= badge.requirement.target;
          break;
        case "combo_count":
          shouldUnlock = currentStats.comboCount >= badge.requirement.target;
          break;
        case "perfect_word_streak":
          shouldUnlock = currentStats.perfectWordStreak >= badge.requirement.target;
          break;
        case "combo_duration":
          shouldUnlock = currentStats.comboDuration >= badge.requirement.target;
          break;
        case "max_multiplier":
          shouldUnlock = currentStats.maxMultiplier >= badge.requirement.target;
          break;
        case "survival_time":
          shouldUnlock = currentStats.survivalTime >= badge.requirement.target;
          break;
        case "bonus_seconds":
          shouldUnlock = currentStats.bonusSeconds >= badge.requirement.target;
          break;
        case "close_call_recovery":
          shouldUnlock = currentStats.closeCallRecoveries >= badge.requirement.target;
          break;
        case "survival_time_and_accuracy":
          shouldUnlock = currentStats.survivalTime >= badge.requirement.survivalTarget &&
                         currentStats.accuracy >= badge.requirement.accuracyTarget;
          break;
        case "correct_letters":
          shouldUnlock = currentStats.correctLetters >= badge.requirement.target;
          break;
        case "correct_words":
          shouldUnlock = currentStats.correctWords >= badge.requirement.target;
          break;
        case "alphabet_coverage":
          shouldUnlock = (currentStats.uniqueLetters?.size || 0) >= badge.requirement.target;
          break;
        default:
          shouldUnlock = false;
      }

      if (shouldUnlock) {
        newlyUnlocked.push(badge);
      }
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedBadges((prev) => [...prev, ...newlyUnlocked.map((b) => b.id)]);
      newlyUnlocked.forEach((badge) => {
        setRecentlyUnlocked(badge);
        setTimeout(() => setRecentlyUnlocked(null), 5000);
      });
    }

    return newlyUnlocked;
  }, [unlockedBadges]);

  const updateBadgeStats = useCallback((updates) => {
    setBadgeStats((prev) => {
      const newStats = { ...prev, ...updates };
      if (updates.uniqueLetters) {
        newStats.uniqueLetters = new Set([...prev.uniqueLetters, ...updates.uniqueLetters]);
      }
      return newStats;
    });
  }, []);

  const resetBadgeProgress = useCallback((statKey) => {
    setBadgeStats((prev) => ({
      ...prev,
      [statKey]: 0,
    }));
  }, []);

  const isBadgeUnlocked = useCallback((badgeId) => {
    return unlockedBadges.includes(badgeId);
  }, [unlockedBadges]);

  const getUnlockedCount = useCallback((category) => {
    const allBadges = getAllBadges();
    const categoryBadges = allBadges.filter((badge) => badge.category === category);
    const unlocked = categoryBadges.filter((badge) => unlockedBadges.includes(badge.id));
    return { unlocked: unlocked.length, total: categoryBadges.length };
  }, [unlockedBadges]);

  return {
    unlockedBadges,
    badgeStats,
    recentlyUnlocked,
    checkAndUnlockBadges,
    updateBadgeStats,
    resetBadgeProgress,
    isBadgeUnlocked,
    getUnlockedCount,
  };
};

export default useBadgeTracking;
