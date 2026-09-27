export type Category =
  | 'water'
  | 'strength'
  | 'racket'
  | 'team'
  | 'combat'
  | 'endurance'
  | 'movement'
  | 'winter'
  | 'precision'

export interface Activity {
  id: string
  name: string
  icon: string
  category: Category
  goals: string[]
}

export const CATEGORY_LABELS: Record<Category, string> = {
  water: 'Water',
  strength: 'Strength',
  racket: 'Racket',
  team: 'Team',
  combat: 'Combat',
  endurance: 'Endurance',
  movement: 'Movement',
  winter: 'Winter',
  precision: 'Precision',
}

// Adding a sport to the product is adding an entry here. Everything downstream
// (onboarding, curriculum generation, lesson rendering) is activity-agnostic.
// Goals are deliberately sport-specific: they decide where a track starts and
// what it focuses on, so a generic list would flatten the whole product.
export const ACTIVITIES: Activity[] = [
  // ---------------------------------------------------------------- water
  {
    id: 'swimming',
    name: 'Swimming',
    icon: '🏊',
    category: 'water',
    goals: [
      'Learn to swim from scratch',
      'Become comfortable in deep water',
      'Learn freestyle',
      'Improve swimming technique',
      'Swim for fitness',
      'Prepare for swimming competitions',
    ],
  },
  {
    id: 'surfing',
    name: 'Surfing',
    icon: '🏄',
    category: 'water',
    goals: [
      'Catch my first wave',
      'Pop up consistently',
      'Ride green waves',
      'Learn to turn and carve',
      'Handle bigger surf safely',
    ],
  },
  {
    id: 'rowing',
    name: 'Rowing',
    icon: '🚣',
    category: 'water',
    goals: [
      'Learn the rowing stroke',
      'Improve erg technique',
      'Build rowing endurance',
      'Row faster over 2000m',
      'Row safely on open water',
    ],
  },
  {
    id: 'kayaking',
    name: 'Kayaking',
    icon: '🛶',
    category: 'water',
    goals: [
      'Learn the basics safely',
      'Paddle efficiently for distance',
      'Learn to roll',
      'Handle moving water',
      'Build confidence in open water',
    ],
  },
  {
    id: 'water-polo',
    name: 'Water Polo',
    icon: '🤽',
    category: 'water',
    goals: [
      'Learn the fundamentals',
      'Master the eggbeater kick',
      'Improve passing and shooting',
      'Play better defence',
      'Build match fitness',
    ],
  },
  {
    id: 'diving',
    name: 'Diving',
    icon: '🤿',
    category: 'water',
    goals: [
      'Learn to dive safely',
      'Master a clean entry',
      'Learn basic dives',
      'Build board confidence',
      'Prepare for competition',
    ],
  },
  {
    id: 'sailing',
    name: 'Sailing',
    icon: '⛵',
    category: 'water',
    goals: [
      'Learn to sail from scratch',
      'Understand points of sail',
      'Handle the boat solo',
      'Learn racing tactics',
      'Sail confidently in stronger wind',
    ],
  },

  // ------------------------------------------------------------- strength
  {
    id: 'gym',
    name: 'Gym & Weights',
    icon: '🏋️',
    category: 'strength',
    goals: [
      'Start going to the gym',
      'Build muscle',
      'Lose weight',
      'Get stronger',
      'Improve general fitness',
      'Learn proper form',
      'Build a consistent routine',
    ],
  },
  {
    id: 'calisthenics',
    name: 'Calisthenics',
    icon: '💪',
    category: 'strength',
    goals: [
      'Do my first pull-up',
      'Do my first push-up',
      'Build a bodyweight routine',
      'Work toward a muscle-up',
      'Learn a handstand',
      'Train without any equipment',
    ],
  },
  {
    id: 'powerlifting',
    name: 'Powerlifting',
    icon: '🦾',
    category: 'strength',
    goals: [
      'Learn the three lifts safely',
      'Improve my squat',
      'Improve my bench press',
      'Improve my deadlift',
      'Prepare for a first meet',
    ],
  },
  {
    id: 'weightlifting',
    name: 'Olympic Lifting',
    icon: '🥇',
    category: 'strength',
    goals: [
      'Learn the snatch',
      'Learn the clean and jerk',
      'Improve mobility for the lifts',
      'Add weight safely',
      'Prepare for competition',
    ],
  },
  {
    id: 'crossfit',
    name: 'CrossFit',
    icon: '⚡',
    category: 'strength',
    goals: [
      'Start CrossFit safely',
      'Learn the core movements',
      'Improve conditioning',
      'Scale workouts properly',
      'Compete in a local event',
    ],
  },
  {
    id: 'kettlebell',
    name: 'Kettlebells',
    icon: '🔔',
    category: 'strength',
    goals: [
      'Learn the kettlebell swing',
      'Learn the Turkish get-up',
      'Build a kettlebell routine',
      'Improve conditioning',
      'Train strength at home',
    ],
  },

  // --------------------------------------------------------------- racket
  {
    id: 'tennis',
    name: 'Tennis',
    icon: '🎾',
    category: 'racket',
    goals: [
      'Learn tennis from scratch',
      'Build a consistent forehand and backhand',
      'Improve my serve',
      'Learn match strategy',
      'Prepare for club competition',
    ],
  },
  {
    id: 'badminton',
    name: 'Badminton',
    icon: '🏸',
    category: 'racket',
    goals: [
      'Learn the fundamentals',
      'Improve my grip and footwork',
      'Develop a reliable smash',
      'Play competitive singles',
      'Play doubles effectively',
    ],
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis',
    icon: '🏓',
    category: 'racket',
    goals: [
      'Learn the basics',
      'Master spin and control',
      'Improve my serve and return',
      'Play competitively',
    ],
  },
  {
    id: 'squash',
    name: 'Squash',
    icon: '🎯',
    category: 'racket',
    goals: [
      'Learn the fundamentals',
      'Improve court movement',
      'Develop a consistent length',
      'Learn match tactics',
      'Build squash fitness',
    ],
  },
  {
    id: 'padel',
    name: 'Padel',
    icon: '🥎',
    category: 'racket',
    goals: [
      'Learn padel from scratch',
      'Learn to use the walls',
      'Improve positioning in doubles',
      'Develop a reliable smash',
      'Play competitively',
    ],
  },
  {
    id: 'pickleball',
    name: 'Pickleball',
    icon: '🟡',
    category: 'racket',
    goals: [
      'Learn the basics and rules',
      'Master the dink',
      'Improve my third shot drop',
      'Play better doubles',
      'Compete at my local club',
    ],
  },

  // ----------------------------------------------------------------- team
  {
    id: 'football',
    name: 'Football',
    icon: '⚽',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Improve ball control',
      'Improve passing and vision',
      'Become a better finisher',
      'Improve match fitness',
    ],
  },
  {
    id: 'basketball',
    name: 'Basketball',
    icon: '🏀',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Improve my shooting',
      'Improve ball handling',
      'Play better defence',
      'Improve game IQ',
    ],
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    icon: '🏐',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Improve serving',
      'Improve setting and passing',
      'Learn to spike',
      'Play competitively',
    ],
  },
  {
    id: 'cricket',
    name: 'Cricket',
    icon: '🏏',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Improve my batting',
      'Improve my bowling',
      'Become a better fielder',
      'Play club cricket',
    ],
  },
  {
    id: 'rugby',
    name: 'Rugby',
    icon: '🏉',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Tackle safely and effectively',
      'Improve passing and handling',
      'Build contact confidence',
      'Improve match fitness',
    ],
  },
  {
    id: 'baseball',
    name: 'Baseball',
    icon: '⚾',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Improve my hitting',
      'Improve my pitching',
      'Become a better fielder',
      'Improve base running',
    ],
  },
  {
    id: 'american-football',
    name: 'American Football',
    icon: '🏈',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Improve catching and route running',
      'Improve throwing mechanics',
      'Build strength for contact',
      'Learn my position',
    ],
  },
  {
    id: 'hockey',
    name: 'Field Hockey',
    icon: '🏑',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Improve stick handling',
      'Improve passing and receiving',
      'Learn to shoot accurately',
      'Play competitively',
    ],
  },
  {
    id: 'handball',
    name: 'Handball',
    icon: '🤾',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Improve throwing power and accuracy',
      'Improve footwork and jumping',
      'Play better defence',
      'Build match fitness',
    ],
  },
  {
    id: 'ultimate',
    name: 'Ultimate Frisbee',
    icon: '🥏',
    category: 'team',
    goals: [
      'Learn the fundamentals',
      'Master the backhand and forehand',
      'Improve cutting and positioning',
      'Learn defensive strategy',
      'Play in a league',
    ],
  },

  // --------------------------------------------------------------- combat
  {
    id: 'boxing',
    name: 'Boxing',
    icon: '🥊',
    category: 'combat',
    goals: [
      'Learn the basics',
      'Boxing for fitness',
      'Self-defence',
      'Improve technique',
      'Prepare for amateur competition',
    ],
  },
  {
    id: 'kickboxing',
    name: 'Kickboxing',
    icon: '🦵',
    category: 'combat',
    goals: [
      'Learn the fundamentals',
      'Kickboxing for fitness',
      'Improve my kicks',
      'Learn combinations',
      'Prepare for sparring',
    ],
  },
  {
    id: 'muay-thai',
    name: 'Muay Thai',
    icon: '🤛',
    category: 'combat',
    goals: [
      'Learn the fundamentals',
      'Improve my clinch',
      'Develop powerful kicks',
      'Learn elbows and knees',
      'Prepare for competition',
    ],
  },
  {
    id: 'bjj',
    name: 'Brazilian Jiu-Jitsu',
    icon: '🥋',
    category: 'combat',
    goals: [
      'Start BJJ as a total beginner',
      'Survive and escape bad positions',
      'Build a guard game',
      'Learn submissions',
      'Prepare for my first competition',
    ],
  },
  {
    id: 'judo',
    name: 'Judo',
    icon: '🇯🇵',
    category: 'combat',
    goals: [
      'Learn to fall safely',
      'Learn core throws',
      'Improve my grip fighting',
      'Develop groundwork',
      'Work toward a belt',
    ],
  },
  {
    id: 'karate',
    name: 'Karate',
    icon: '👊',
    category: 'combat',
    goals: [
      'Learn the fundamentals',
      'Improve my kata',
      'Improve kumite sparring',
      'Self-defence',
      'Work toward a belt',
    ],
  },
  {
    id: 'taekwondo',
    name: 'Taekwondo',
    icon: '🦶',
    category: 'combat',
    goals: [
      'Learn the fundamentals',
      'Improve kicking technique',
      'Improve flexibility',
      'Learn poomsae forms',
      'Prepare for sparring',
    ],
  },
  {
    id: 'mma',
    name: 'MMA',
    icon: '🔥',
    category: 'combat',
    goals: [
      'Learn the fundamentals',
      'Build striking and grappling together',
      'Improve takedown defence',
      'Build fight conditioning',
      'Prepare for amateur competition',
    ],
  },
  {
    id: 'wrestling',
    name: 'Wrestling',
    icon: '🤼',
    category: 'combat',
    goals: [
      'Learn the basics',
      'Improve takedowns',
      'Improve ground control',
      'Build wrestling conditioning',
      'Prepare for competition',
    ],
  },
  {
    id: 'fencing',
    name: 'Fencing',
    icon: '🤺',
    category: 'combat',
    goals: [
      'Learn the fundamentals',
      'Improve footwork',
      'Improve blade work',
      'Learn bout tactics',
      'Prepare for competition',
    ],
  },
  {
    id: 'martial-arts',
    name: 'Martial Arts',
    icon: '🥷',
    category: 'combat',
    goals: [
      'Learn the fundamentals',
      'Self-defence',
      'Improve discipline and fitness',
      'Work toward a belt',
      'Prepare for sparring',
    ],
  },

  // ------------------------------------------------------------ endurance
  {
    id: 'running',
    name: 'Running',
    icon: '🏃',
    category: 'endurance',
    goals: [
      'Start running from zero',
      'Run 5K without stopping',
      'Train for a 10K',
      'Train for a half marathon',
      'Train for a marathon',
      'Improve my pace',
      'Run without injury',
    ],
  },
  {
    id: 'cycling',
    name: 'Cycling',
    icon: '🚴',
    category: 'endurance',
    goals: [
      'Learn to ride a bike',
      'Build cycling endurance',
      'Improve climbing',
      'Train for a long-distance ride',
      'Commute confidently in traffic',
    ],
  },
  {
    id: 'triathlon',
    name: 'Triathlon',
    icon: '🔺',
    category: 'endurance',
    goals: [
      'Complete my first sprint triathlon',
      'Improve my weakest discipline',
      'Master transitions',
      'Train for an Olympic distance',
      'Train for a half Ironman',
    ],
  },
  {
    id: 'hiking',
    name: 'Hiking',
    icon: '🥾',
    category: 'endurance',
    goals: [
      'Start hiking safely',
      'Build stamina for long hikes',
      'Prepare for a multi-day trek',
      'Handle steep and technical terrain',
      'Learn navigation basics',
    ],
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    icon: '🪢',
    category: 'endurance',
    goals: [
      'Learn to skip consistently',
      'Build conditioning',
      'Learn double unders',
      'Learn freestyle tricks',
      'Use it for fight training',
    ],
  },
  {
    id: 'athletics',
    name: 'Track & Field',
    icon: '🏟️',
    category: 'endurance',
    goals: [
      'Improve my sprint speed',
      'Learn sprint starts',
      'Improve middle-distance racing',
      'Learn a jumping event',
      'Learn a throwing event',
    ],
  },

  // ------------------------------------------------------------- movement
  {
    id: 'dance',
    name: 'Dance',
    icon: '💃',
    category: 'movement',
    goals: [
      'Learn to dance from scratch',
      'Improve rhythm and musicality',
      'Learn a specific style',
      'Dance socially with confidence',
      'Prepare for a performance',
    ],
  },
  {
    id: 'yoga',
    name: 'Yoga',
    icon: '🧘',
    category: 'movement',
    goals: [
      'Start yoga as a complete beginner',
      'Improve flexibility',
      'Build strength through yoga',
      'Establish a daily practice',
      'Learn breathing and relaxation',
      'Work toward advanced poses',
    ],
  },
  {
    id: 'pilates',
    name: 'Pilates',
    icon: '🩰',
    category: 'movement',
    goals: [
      'Start Pilates safely',
      'Build core strength',
      'Improve posture',
      'Recover from back pain',
      'Build a home routine',
    ],
  },
  {
    id: 'gymnastics',
    name: 'Gymnastics',
    icon: '🤸',
    category: 'movement',
    goals: [
      'Learn the fundamentals safely',
      'Build a handstand',
      'Learn to cartwheel and roll',
      'Work toward a back handspring',
      'Build gymnastic strength',
    ],
  },
  {
    id: 'climbing',
    name: 'Rock Climbing',
    icon: '🧗',
    category: 'movement',
    goals: [
      'Start bouldering as a beginner',
      'Improve climbing technique',
      'Build finger and grip strength',
      'Learn to lead climb',
      'Climb a harder grade',
    ],
  },
  {
    id: 'parkour',
    name: 'Parkour',
    icon: '🏙️',
    category: 'movement',
    goals: [
      'Learn to land and roll safely',
      'Learn basic vaults',
      'Build jumping confidence',
      'Improve precision jumps',
      'Train for flow and movement',
    ],
  },
  {
    id: 'skateboarding',
    name: 'Skateboarding',
    icon: '🛹',
    category: 'movement',
    goals: [
      'Learn to ride and balance',
      'Learn to ollie',
      'Learn to drop in',
      'Land my first trick',
      'Skate ramps and bowls',
    ],
  },
  {
    id: 'roller-skating',
    name: 'Roller Skating',
    icon: '🛼',
    category: 'movement',
    goals: [
      'Learn to skate and stop',
      'Build balance and confidence',
      'Learn to skate backwards',
      'Learn basic tricks',
      'Skate at a rink or park',
    ],
  },

  // --------------------------------------------------------------- winter
  {
    id: 'skiing',
    name: 'Skiing',
    icon: '⛷️',
    category: 'winter',
    goals: [
      'Learn to ski from scratch',
      'Master the parallel turn',
      'Ski steeper runs with control',
      'Learn to ski moguls',
      'Ski off-piste safely',
    ],
  },
  {
    id: 'snowboarding',
    name: 'Snowboarding',
    icon: '🏂',
    category: 'winter',
    goals: [
      'Learn to snowboard from scratch',
      'Link my turns',
      'Ride switch',
      'Learn park basics',
      'Ride steeper terrain confidently',
    ],
  },
  {
    id: 'ice-skating',
    name: 'Ice Skating',
    icon: '⛸️',
    category: 'winter',
    goals: [
      'Learn to skate and stop',
      'Build balance and confidence',
      'Learn to skate backwards',
      'Learn crossovers',
      'Learn basic jumps and spins',
    ],
  },
  {
    id: 'ice-hockey',
    name: 'Ice Hockey',
    icon: '🏒',
    category: 'winter',
    goals: [
      'Learn to skate for hockey',
      'Improve stick handling',
      'Improve shooting',
      'Learn positional play',
      'Play in a league',
    ],
  },

  // ------------------------------------------------------------ precision
  {
    id: 'golf',
    name: 'Golf',
    icon: '⛳',
    category: 'precision',
    goals: [
      'Learn to play golf',
      'Build a repeatable swing',
      'Improve my short game',
      'Lower my handicap',
      'Play my first full round',
    ],
  },
  {
    id: 'archery',
    name: 'Archery',
    icon: '🏹',
    category: 'precision',
    goals: [
      'Learn archery safely',
      'Build a consistent form',
      'Improve my grouping',
      'Shoot at longer distances',
      'Prepare for competition',
    ],
  },
  {
    id: 'bowling',
    name: 'Bowling',
    icon: '🎳',
    category: 'precision',
    goals: [
      'Learn the fundamentals',
      'Build a consistent approach',
      'Learn to hook the ball',
      'Improve spare shooting',
      'Raise my average score',
    ],
  },
  {
    id: 'billiards',
    name: 'Pool & Billiards',
    icon: '🎱',
    category: 'precision',
    goals: [
      'Learn the fundamentals',
      'Build a straight, repeatable stroke',
      'Learn position play',
      'Learn to apply spin',
      'Play competitively',
    ],
  },
]

export function getActivity(id: string) {
  return ACTIVITIES.find((a) => a.id === id)
}

export const EXPERIENCE_LEVELS = [
  { id: 'none', label: 'Complete beginner', detail: "I've never done this before" },
  { id: 'some', label: 'Some experience', detail: "I've tried it a few times" },
  { id: 'regular', label: 'Regular', detail: 'I do this fairly often' },
  { id: 'advanced', label: 'Advanced', detail: 'I want to refine specific skills' },
]
