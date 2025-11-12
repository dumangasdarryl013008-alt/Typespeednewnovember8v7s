import {
  GAME_MODE_NORMAL,
  GAME_MODE_HARD,
  GAME_MODE_SURVIVAL,
  GAME_MODE_COMBO,
} from "./Constants";

export const BADGE_TIERS = {
  BRONZE: "🥉",
  SILVER: "🥈",
  GOLD: "🥇",
  STAR: "🌟",
};

export const BADGE_CATEGORIES = {
  NORMAL: {
    id: GAME_MODE_NORMAL,
    label: "🟢 Normal Mode",
    description: "Practice Mode",
  },
  HARD: {
    id: GAME_MODE_HARD,
    label: "🔴 Hard Mode",
    description: "Precision Challenge",
  },
  COMBO: {
    id: GAME_MODE_COMBO,
    label: "🟡 Combo Mode",
    description: "Streak Challenge",
  },
  SURVIVAL: {
    id: GAME_MODE_SURVIVAL,
    label: "🔵 Survival Mode",
    description: "Endurance Challenge",
  },
  TRAINER: {
    id: "TRAINER",
    label: "⌨️ QWERTY Keyboard Practice Mode",
    description: "Typing Practice",
  },
};

export const BADGES = {
  NORMAL: [
    {
      id: "speed_starter",
      name: "Speed Starter",
      tier: BADGE_TIERS.BRONZE,
      description: "Reach 50+ WPM in a 60-second round",
      requirement: {
        type: "wpm_single_round",
        target: 50,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.wpm || 0,
        target: 50,
        percentage: Math.min(100, ((stats.wpm || 0) / 50) * 100),
      }),
    },
    {
      id: "quick_learner",
      name: "Quick Learner",
      tier: BADGE_TIERS.BRONZE,
      description: "Improve your score three rounds in a row (60s minimum)",
      requirement: {
        type: "consecutive_improvements",
        target: 3,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.consecutiveImprovements || 0,
        target: 3,
        percentage: Math.min(100, ((stats.consecutiveImprovements || 0) / 3) * 100),
      }),
    },
    {
      id: "accuracy_ace",
      name: "Accuracy Ace",
      tier: BADGE_TIERS.SILVER,
      description: "Finish with 95% or higher accuracy (60s minimum)",
      requirement: {
        type: "accuracy_single_round",
        target: 95,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.accuracy || 0,
        target: 95,
        percentage: Math.min(100, ((stats.accuracy || 0) / 95) * 100),
      }),
    },
    {
      id: "focus_finder",
      name: "Focus Finder",
      tier: BADGE_TIERS.SILVER,
      description: "Complete a full session without pausing",
      requirement: {
        type: "no_pause",
        target: 1,
      },
      getProgress: (stats) => ({
        current: stats.noPause ? 1 : 0,
        target: 1,
        percentage: stats.noPause ? 100 : 0,
      }),
    },
    {
      id: "score_builder",
      name: "Score Builder",
      tier: BADGE_TIERS.GOLD,
      description: "Reach 70+ WPM in a 60-second round",
      requirement: {
        type: "wpm_single_round",
        target: 70,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.wpm || 0,
        target: 70,
        percentage: Math.min(100, ((stats.wpm || 0) / 70) * 100),
      }),
    },
    {
      id: "consistency_king",
      name: "Consistency King/Queen",
      tier: BADGE_TIERS.STAR,
      description: "Reach 90+ WPM in a 90-second round with 95%+ accuracy",
      requirement: {
        type: "wpm_and_accuracy",
        wpmTarget: 90,
        accuracyTarget: 95,
        minTimer: 90,
      },
      getProgress: (stats) => ({
        current: stats.wpm || 0,
        target: 90,
        percentage: Math.min(100, ((stats.wpm || 0) / 90) * 100),
      }),
    },
  ],

  HARD: [
    {
      id: "steady_hands",
      name: "Steady Hands",
      tier: BADGE_TIERS.BRONZE,
      description: "Get 92%+ accuracy in a 60-second hard round",
      requirement: {
        type: "accuracy_single_round",
        target: 92,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.accuracy || 0,
        target: 92,
        percentage: Math.min(100, ((stats.accuracy || 0) / 92) * 100),
      }),
    },
    {
      id: "sharp_shooter",
      name: "Sharp Shooter",
      tier: BADGE_TIERS.SILVER,
      description: "Reach 60+ WPM with 95%+ accuracy (60s minimum)",
      requirement: {
        type: "wpm_and_accuracy",
        wpmTarget: 60,
        accuracyTarget: 95,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.wpm || 0,
        target: 60,
        percentage: Math.min(100, ((stats.wpm || 0) / 60) * 100),
      }),
    },
    {
      id: "risk_taker",
      name: "Risk Taker",
      tier: BADGE_TIERS.SILVER,
      description: "Finish with less than 5 seconds left (60s minimum)",
      requirement: {
        type: "time_remaining",
        maxTime: 5,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.timeRemaining || 0,
        target: 5,
        percentage: stats.completed && stats.timeRemaining < 5 ? 100 : 0,
      }),
    },
    {
      id: "flawless_fighter",
      name: "Flawless Fighter",
      tier: BADGE_TIERS.GOLD,
      description: "Complete a 60-second round with zero mistakes",
      requirement: {
        type: "no_errors",
        target: 0,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.errors || 0,
        target: 0,
        percentage: stats.errors === 0 && stats.completed ? 100 : 0,
      }),
    },
    {
      id: "perfect_precisionist",
      name: "Perfect Precisionist",
      tier: BADGE_TIERS.GOLD,
      description: "Achieve 100% accuracy (90s minimum)",
      requirement: {
        type: "accuracy_single_round",
        target: 100,
        minTimer: 90,
      },
      getProgress: (stats) => ({
        current: stats.accuracy || 0,
        target: 100,
        percentage: Math.min(100, (stats.accuracy || 0)),
      }),
    },
    {
      id: "no_miss_master",
      name: "No-Miss Master",
      tier: BADGE_TIERS.STAR,
      description: "Reach 80+ WPM with 100% accuracy (90s minimum)",
      requirement: {
        type: "wpm_and_accuracy",
        wpmTarget: 80,
        accuracyTarget: 100,
        minTimer: 90,
      },
      getProgress: (stats) => ({
        current: stats.wpm || 0,
        target: 80,
        percentage: Math.min(100, ((stats.wpm || 0) / 80) * 100),
      }),
    },
  ],

  COMBO: [
    {
      id: "combo_champ",
      name: "Combo Champ",
      tier: BADGE_TIERS.BRONZE,
      description: "Reach a 25-word combo streak (60s minimum)",
      requirement: {
        type: "combo_streak",
        target: 25,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.maxCombo || 0,
        target: 25,
        percentage: Math.min(100, ((stats.maxCombo || 0) / 25) * 100),
      }),
    },
    {
      id: "momentum_master",
      name: "Momentum Master",
      tier: BADGE_TIERS.SILVER,
      description: "Earn 8 separate combos in one session (60s minimum)",
      requirement: {
        type: "combo_count",
        target: 8,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.comboCount || 0,
        target: 8,
        percentage: Math.min(100, ((stats.comboCount || 0) / 8) * 100),
      }),
    },
    {
      id: "precision_streaker",
      name: "Precision Streaker",
      tier: BADGE_TIERS.SILVER,
      description: "Type 60 words correctly in a row (60s minimum)",
      requirement: {
        type: "perfect_word_streak",
        target: 60,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.perfectWordStreak || 0,
        target: 60,
        percentage: Math.min(100, ((stats.perfectWordStreak || 0) / 60) * 100),
      }),
    },
    {
      id: "streak_master",
      name: "Streak Master",
      tier: BADGE_TIERS.GOLD,
      description: "Keep your combo going for 75 seconds (90s minimum)",
      requirement: {
        type: "combo_duration",
        target: 75,
        minTimer: 90,
      },
      getProgress: (stats) => ({
        current: stats.comboDuration || 0,
        target: 75,
        percentage: Math.min(100, ((stats.comboDuration || 0) / 75) * 100),
      }),
    },
    {
      id: "chain_crusher",
      name: "Chain Crusher",
      tier: BADGE_TIERS.GOLD,
      description: "Complete 12 combos without breaking (90s minimum)",
      requirement: {
        type: "combo_count",
        target: 12,
        minTimer: 90,
      },
      getProgress: (stats) => ({
        current: stats.comboCount || 0,
        target: 12,
        percentage: Math.min(100, ((stats.comboCount || 0) / 12) * 100),
      }),
    },
    {
      id: "hot_streak_hero",
      name: "Hot Streak Hero",
      tier: BADGE_TIERS.STAR,
      description: "Reach the highest combo multiplier (90s minimum)",
      requirement: {
        type: "max_multiplier",
        target: 10,
        minTimer: 90,
      },
      getProgress: (stats) => ({
        current: stats.maxMultiplier || 0,
        target: 10,
        percentage: Math.min(100, ((stats.maxMultiplier || 0) / 10) * 100),
      }),
    },
  ],

  SURVIVAL: [
    {
      id: "time_keeper",
      name: "Time Keeper",
      tier: BADGE_TIERS.BRONZE,
      description: "Survive for 3 minutes",
      requirement: {
        type: "survival_time",
        target: 180,
      },
      getProgress: (stats) => ({
        current: stats.survivalTime || 0,
        target: 180,
        percentage: Math.min(100, ((stats.survivalTime || 0) / 180) * 100),
      }),
    },
    {
      id: "time_warrior",
      name: "Time Warrior",
      tier: BADGE_TIERS.SILVER,
      description: "Gain 45+ bonus seconds in one session",
      requirement: {
        type: "bonus_seconds",
        target: 45,
      },
      getProgress: (stats) => ({
        current: stats.bonusSeconds || 0,
        target: 45,
        percentage: Math.min(100, ((stats.bonusSeconds || 0) / 45) * 100),
      }),
    },
    {
      id: "iron_typer",
      name: "Iron Typer",
      tier: BADGE_TIERS.SILVER,
      description: "Maintain 92%+ accuracy during survival",
      requirement: {
        type: "accuracy_single_round",
        target: 92,
      },
      getProgress: (stats) => ({
        current: stats.accuracy || 0,
        target: 92,
        percentage: Math.min(100, ((stats.accuracy || 0) / 92) * 100),
      }),
    },
    {
      id: "endurance_expert",
      name: "Endurance Expert",
      tier: BADGE_TIERS.GOLD,
      description: "Last 8 minutes or more",
      requirement: {
        type: "survival_time",
        target: 480,
      },
      getProgress: (stats) => ({
        current: stats.survivalTime || 0,
        target: 480,
        percentage: Math.min(100, ((stats.survivalTime || 0) / 480) * 100),
      }),
    },
    {
      id: "last_second_saver",
      name: "Last-Second Saver",
      tier: BADGE_TIERS.GOLD,
      description: "Recover from 5 seconds or less and keep going",
      requirement: {
        type: "close_call_recovery",
        target: 1,
      },
      getProgress: (stats) => ({
        current: stats.closeCallRecoveries || 0,
        target: 1,
        percentage: stats.closeCallRecoveries > 0 ? 100 : 0,
      }),
    },
    {
      id: "survivor_legend",
      name: "Survivor Legend",
      tier: BADGE_TIERS.STAR,
      description: "Survive 10 minutes with 95%+ accuracy",
      requirement: {
        type: "survival_time_and_accuracy",
        survivalTarget: 600,
        accuracyTarget: 95,
      },
      getProgress: (stats) => ({
        current: Math.floor((stats.survivalTime || 0) / 60),
        target: 10,
        percentage: Math.min(100, ((stats.survivalTime || 0) / 600) * 100),
      }),
    },
  ],

  TRAINER: [
    {
      id: "key_explorer",
      name: "Key Explorer",
      tier: BADGE_TIERS.BRONZE,
      description: "Type 100 correct letters in one session (60s minimum)",
      requirement: {
        type: "correct_letters",
        target: 100,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.correctLetters || 0,
        target: 100,
        percentage: Math.min(100, ((stats.correctLetters || 0) / 100) * 100),
      }),
    },
    {
      id: "first_words",
      name: "First Words",
      tier: BADGE_TIERS.BRONZE,
      description: "Type 30 words correctly (60s minimum)",
      requirement: {
        type: "correct_words",
        target: 30,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.correctWords || 0,
        target: 30,
        percentage: Math.min(100, ((stats.correctWords || 0) / 30) * 100),
      }),
    },
    {
      id: "finger_flyer",
      name: "Finger Flyer",
      tier: BADGE_TIERS.SILVER,
      description: "Reach 35+ WPM during practice (60s minimum)",
      requirement: {
        type: "wpm_single_round",
        target: 35,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.wpm || 0,
        target: 35,
        percentage: Math.min(100, ((stats.wpm || 0) / 35) * 100),
      }),
    },
    {
      id: "letter_master",
      name: "Letter Master",
      tier: BADGE_TIERS.SILVER,
      description: "Type every letter of the alphabet correctly at least once",
      requirement: {
        type: "alphabet_coverage",
        target: 26,
      },
      getProgress: (stats) => ({
        current: stats.uniqueLetters?.size || 0,
        target: 26,
        percentage: Math.min(100, ((stats.uniqueLetters?.size || 0) / 26) * 100),
      }),
    },
    {
      id: "accuracy_ace_trainer",
      name: "Accuracy Ace",
      tier: BADGE_TIERS.GOLD,
      description: "Maintain 95%+ accuracy for an entire session (60s minimum)",
      requirement: {
        type: "accuracy_single_round",
        target: 95,
        minTimer: 60,
      },
      getProgress: (stats) => ({
        current: stats.accuracy || 0,
        target: 95,
        percentage: Math.min(100, ((stats.accuracy || 0) / 95) * 100),
      }),
    },
    {
      id: "speed_typer",
      name: "Speed Typer",
      tier: BADGE_TIERS.GOLD,
      description: "Type 70 words correctly (90s minimum)",
      requirement: {
        type: "correct_words",
        target: 70,
        minTimer: 90,
      },
      getProgress: (stats) => ({
        current: stats.correctWords || 0,
        target: 70,
        percentage: Math.min(100, ((stats.correctWords || 0) / 70) * 100),
      }),
    },
    {
      id: "keyboard_legend",
      name: "Keyboard Legend",
      tier: BADGE_TIERS.STAR,
      description: "Reach 50+ WPM with 97%+ accuracy (90s minimum)",
      requirement: {
        type: "wpm_and_accuracy",
        wpmTarget: 50,
        accuracyTarget: 97,
        minTimer: 90,
      },
      getProgress: (stats) => ({
        current: stats.wpm || 0,
        target: 50,
        percentage: Math.min(100, ((stats.wpm || 0) / 50) * 100),
      }),
    },
  ],
};

export const getAllBadges = () => {
  return [
    ...BADGES.NORMAL.map((badge) => ({ ...badge, category: GAME_MODE_NORMAL })),
    ...BADGES.HARD.map((badge) => ({ ...badge, category: GAME_MODE_HARD })),
    ...BADGES.COMBO.map((badge) => ({ ...badge, category: GAME_MODE_COMBO })),
    ...BADGES.SURVIVAL.map((badge) => ({ ...badge, category: GAME_MODE_SURVIVAL })),
    ...BADGES.TRAINER.map((badge) => ({ ...badge, category: "TRAINER" })),
  ];
};

export const getBadgesByCategory = (category) => {
  const categoryKey = category === "Normal" ? "NORMAL" :
                      category === "Hard" ? "HARD" :
                      category === "Combo" ? "COMBO" :
                      category === "Survival" ? "SURVIVAL" :
                      category;
  return BADGES[categoryKey] || [];
};
