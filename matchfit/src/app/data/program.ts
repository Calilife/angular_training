import { DayPlan, Exercise, Workout } from '../models';

/**
 * MatchFit program for an over-30 player with 7v7 matches on Tuesday and Friday.
 *
 * The schedule follows in-season strength & conditioning principles:
 * - Heavy lower-body work goes on Sunday: ~48h after Friday's match (recovered)
 *   and ~48h before Tuesday's match (time to dissipate fatigue).
 * - A lighter upper-body / core / injury-prevention session goes on Wednesday,
 *   the day after Tuesday's match, keeping the legs fresh for Friday.
 * - Never heavy legs the day before a match.
 * - Eccentric hamstring (Nordics), adductor (Copenhagen) and calf/Achilles work
 *   target the three most common injury sites in veteran soccer players.
 */

// ---------------------------------------------------------------------------
// Exercises — Workout A: Lower Body Strength & Power (Sunday)
// ---------------------------------------------------------------------------

const backSquat: Exercise = {
  id: 'back-squat',
  name: 'Barbell Back Squat',
  category: 'strength',
  focus: 'Drive hard out of the bottom — bar speed on the way up builds sprint power.',
  why: 'The foundation of leg strength: faster sprints, stronger duels, higher jumps. After 30 you lose muscle every year you do not lift — squatting reverses that.',
  muscles: ['Quads', 'Glutes', 'Hamstrings', 'Core'],
  sets: '4 × 5 (heavy but 1–2 reps in reserve)',
  rest: '2–3 min',
  cues: [
    'Feet shoulder-width, toes slightly out',
    'Brace your core like you are about to be tackled',
    'Sit down between your hips, knees track over toes',
    'Hit at least parallel, then drive up explosively',
  ],
  videoId: 'ultWZbUMPL8',
  videoSearch: 'how to barbell back squat proper form',
  alternative: 'Goblet Squat (dumbbell held at chest) — same depth, lighter load',
};

const romanianDeadlift: Exercise = {
  id: 'rdl',
  name: 'Romanian Deadlift (RDL)',
  category: 'injury-prevention',
  focus: 'Slow 3-second lowering — the eccentric stretch under load is what bulletproofs your hamstrings.',
  why: 'Hamstring strains are up to 50% of all soccer muscle injuries and get more common after 30. Eccentric hamstring loading is the single best-proven protection.',
  muscles: ['Hamstrings', 'Glutes', 'Lower back'],
  sets: '3 × 8',
  rest: '2 min',
  cues: [
    'Soft knees, push your hips straight back',
    'Bar stays glued to your thighs',
    'Lower for 3 seconds until you feel a strong hamstring stretch',
    'Flat back the whole time — stop at mid-shin',
  ],
  videoId: 'JCXUYuzwNrM',
  videoSearch: 'romanian deadlift RDL technique tutorial',
  alternative: 'Single-leg dumbbell RDL — extra balance work, lighter weight',
};

const bulgarianSplitSquat: Exercise = {
  id: 'bulgarian-split-squat',
  name: 'Bulgarian Split Squat',
  category: 'strength',
  focus: 'Stay tall and controlled — no wobbling. Single-leg stability is what cutting and changing direction are made of.',
  why: 'Soccer is played one leg at a time: every sprint stride, cut and shot. Unilateral strength fixes left–right imbalances that cause injuries.',
  muscles: ['Quads', 'Glutes', 'Hip stabilizers'],
  sets: '3 × 8 per leg',
  rest: '90 s per side',
  cues: [
    'Rear foot on a bench, front foot far enough forward',
    'Drop the back knee straight down',
    'Front knee tracks over toes, torso slightly forward',
    'Drive through the whole front foot',
  ],
  videoId: '2C-uNgKwPLE',
  videoSearch: 'bulgarian split squat proper form',
  alternative: 'Reverse lunges — easier on balance, same pattern',
};

const hipThrust: Exercise = {
  id: 'hip-thrust',
  name: 'Barbell Hip Thrust',
  category: 'power',
  focus: 'Squeeze your glutes hard at the top for a full second — full hip extension is your acceleration engine.',
  why: 'Glutes power the first 10 meters. Stronger hip extension = faster acceleration, the quality that declines first after 30 — and the one that wins balls in 7v7.',
  muscles: ['Glutes', 'Hamstrings'],
  sets: '3 × 8',
  rest: '2 min',
  cues: [
    'Upper back on a bench, bar over your hips (use a pad)',
    'Chin tucked, ribs down',
    'Drive through heels until hips are fully extended',
    'One-second squeeze at the top, lower with control',
  ],
  videoId: 'SEdqd1n0cvg',
  videoSearch: 'barbell hip thrust proper form',
  alternative: 'Single-leg glute bridge from the floor',
};

const boxJump: Exercise = {
  id: 'box-jump',
  name: 'Box Jump',
  category: 'power',
  focus: 'Maximum intent on every jump, soft quiet landing. This converts gym strength into match explosiveness.',
  why: 'Power fades twice as fast as strength with age. Low-volume jumps keep you explosive for headers, sprints and reactions — without the joint stress of depth jumps.',
  muscles: ['Glutes', 'Quads', 'Calves'],
  sets: '3 × 5 (fresh and fast — do these early or rested)',
  rest: '90 s',
  cues: [
    'Modest box height — this is about take-off speed, not box height',
    'Big arm swing, explode up',
    'Land soft and quiet in a quarter squat',
    'Step down, never jump down',
  ],
  videoId: '52r_Ul5k03g',
  videoSearch: 'box jump technique soft landing',
  alternative: 'Vertical jumps to a target, or broad jumps on grass',
};

const nordicCurl: Exercise = {
  id: 'nordic-curl',
  name: 'Nordic Hamstring Curl',
  category: 'injury-prevention',
  focus: 'Fight the fall for as long as possible — every centimeter of slow lowering counts.',
  why: 'The most researched injury-prevention exercise in soccer: programs with Nordics cut hamstring injuries roughly in half. Non-negotiable for an over-30 player.',
  muscles: ['Hamstrings'],
  sets: '3 × 4–6 (build up slowly — these are brutal at first)',
  rest: '2 min',
  cues: [
    'Kneel with ankles anchored (partner, bar or machine)',
    'Straight line from knees to head',
    'Lower as slowly as you can, hips stay extended',
    'Catch yourself with your hands, push back up',
  ],
  videoSearch: 'nordic hamstring curl tutorial beginner',
  alternative: 'Sliding leg curls (towel/sliders) or stability-ball leg curls',
};

const calfRaise: Exercise = {
  id: 'calf-raise',
  name: 'Standing Calf Raise',
  category: 'injury-prevention',
  focus: 'Full range — deep stretch at the bottom, full rise to the top. Tempo over weight.',
  why: 'Calf strains and Achilles issues skyrocket in players over 30. Strong, regularly-loaded calves are your insurance policy for twice-a-week matches.',
  muscles: ['Calves', 'Achilles tendon'],
  sets: '3 × 12 (slow 3-second lowering)',
  rest: '60 s',
  cues: [
    'Stand on a step or plate, heels hanging off',
    'Rise all the way up onto your toes',
    'Lower for 3 seconds into a full stretch',
    'Keep knees straight to bias the gastrocnemius',
  ],
  videoSearch: 'standing calf raise full range tempo',
  alternative: 'Single-leg calf raises holding a dumbbell',
};

// ---------------------------------------------------------------------------
// Exercises — Workout B: Upper Body, Core & Injury-Proofing (Wednesday)
// ---------------------------------------------------------------------------

const benchPress: Exercise = {
  id: 'db-bench',
  name: 'Dumbbell Bench Press',
  category: 'upper-body',
  focus: 'Control the dumbbells down, press up powerfully. Upper-body strength wins shoulder-to-shoulder duels.',
  why: 'Holding off defenders and shielding the ball is upper-body work. Pressing also keeps overall muscle mass up, which protects metabolism after 30.',
  muscles: ['Chest', 'Shoulders', 'Triceps'],
  sets: '3 × 8–10',
  rest: '90 s',
  cues: [
    'Shoulder blades pinched back and down',
    'Lower to chest level with elbows ~45°',
    'Press up and slightly together',
    'Feet planted, slight arch',
  ],
  videoId: 'VmB1G1K7v94',
  videoSearch: 'dumbbell bench press proper form',
  alternative: 'Push-ups (elevate feet to make harder)',
};

const pullUps: Exercise = {
  id: 'pull-up',
  name: 'Pull-Ups',
  category: 'upper-body',
  focus: 'Full hang to chest-at-bar. Pulling strength balances pressing and keeps shoulders healthy.',
  why: 'A strong back improves posture, sprint arm drive and protects shoulders when you get pushed and pulled in duels.',
  muscles: ['Lats', 'Biceps', 'Upper back'],
  sets: '3 × max reps (or 3 × 8 lat pulldown)',
  rest: '2 min',
  cues: [
    'Start from a dead hang, shoulders engaged',
    'Pull elbows down to your ribs',
    'Chin over the bar without kicking',
    'Lower with full control',
  ],
  videoId: 'eGo4IYlbE5g',
  videoSearch: 'perfect pull up form tutorial',
  alternative: 'Lat pulldown or inverted rows',
};

const shoulderPress: Exercise = {
  id: 'shoulder-press',
  name: 'Dumbbell Shoulder Press',
  category: 'upper-body',
  focus: 'Ribs down, no back arch — strict pressing builds shoulders that survive falls and collisions.',
  why: 'Healthy strong shoulders matter when you hit the ground or wall off a defender. Standing version doubles as core work.',
  muscles: ['Shoulders', 'Triceps', 'Core'],
  sets: '3 × 10',
  rest: '90 s',
  cues: [
    'Stand tall, glutes and core braced',
    'Press dumbbells straight up, biceps by ears',
    'Do not lean back — lighten the load instead',
    'Lower to chin level with control',
  ],
  videoSearch: 'standing dumbbell shoulder press form',
  alternative: 'Seated press if lower back complains',
};

const copenhagenPlank: Exercise = {
  id: 'copenhagen-plank',
  name: 'Copenhagen Plank',
  category: 'injury-prevention',
  focus: 'Keep hips up in a perfect line — feel the inner thigh of the top leg working hard.',
  why: 'Groin/adductor strains are the #2 soccer injury and brutal to recover from after 30. Copenhagen work cut groin injuries ~40% in studies on players.',
  muscles: ['Adductors (groin)', 'Obliques'],
  sets: '3 × 20–30 s per side',
  rest: '45 s per side',
  cues: [
    'Side plank with top leg on a bench, bottom leg free',
    'Lift hips until body is one straight line',
    'Squeeze the top inner thigh the whole time',
    'Start with knee on the bench (short lever) — progress to foot',
  ],
  videoSearch: 'copenhagen plank adductor exercise tutorial',
  alternative: 'Ball squeezes between knees, or short-lever version',
};

const pallofPress: Exercise = {
  id: 'pallof-press',
  name: 'Pallof Press',
  category: 'core',
  focus: 'Resist the rotation — nothing moves except your arms. This is the core strength you use shielding the ball.',
  why: 'Anti-rotation core strength transfers directly to staying on the ball under contact, striking harder, and protecting your lower back.',
  muscles: ['Obliques', 'Deep core', 'Glutes'],
  sets: '3 × 10 per side (3 s hold each rep)',
  rest: '45 s per side',
  cues: [
    'Cable or band at chest height, stand side-on',
    'Press hands straight out from your chest',
    'Do not let the band twist you — stay square',
    'Athletic stance, knees soft',
  ],
  videoSearch: 'pallof press anti rotation core exercise',
  alternative: 'Band version anchored to anything sturdy',
};

const sidePlank: Exercise = {
  id: 'side-plank',
  name: 'Side Plank',
  category: 'core',
  focus: 'Perfectly straight line, hips high. Lateral core stability protects your back and hips when cutting.',
  why: 'Lateral trunk strength is linked to fewer groin and knee problems, and keeps you stable landing on one leg — which you do hundreds of times a match.',
  muscles: ['Obliques', 'Glute med', 'Shoulder stabilizers'],
  sets: '3 × 30–45 s per side',
  rest: '30 s per side',
  cues: [
    'Elbow under shoulder, feet stacked',
    'Lift hips — straight line ankle to head',
    'Push the floor away with your forearm',
    'Harder: raise the top leg',
  ],
  videoSearch: 'side plank proper form progressions',
  alternative: 'Knees-bent side plank to start',
};

const singleLegCalf: Exercise = {
  id: 'sl-calf-raise',
  name: 'Single-Leg Calf Raise',
  category: 'injury-prevention',
  focus: 'One leg, slow lowering — this is direct Achilles tendon maintenance, twice a week keeps it match-proof.',
  why: 'The Achilles is the over-30 player’s weakest link. Heavy, slow single-leg calf work is exactly what tendon rehab protocols use — do it before you need rehab.',
  muscles: ['Calves', 'Achilles tendon'],
  sets: '3 × 10–12 per leg',
  rest: '45 s per side',
  cues: [
    'Stand on one foot on a step, hold something for balance',
    'Full rise, 3-second lower into a deep stretch',
    'Add a dumbbell when 12 reps get easy',
    'Mild tendon discomfort that eases is okay; sharp pain is not',
  ],
  videoSearch: 'single leg calf raise achilles strength',
  alternative: 'Both-legs-up, one-leg-down negatives',
};

const hipMobility: Exercise = {
  id: 'hip-9090',
  name: '90/90 Hip Switches',
  category: 'mobility',
  focus: 'Slow controlled rotation through both hips — mobility you control is mobility you keep.',
  why: 'Stiff hips after 30 steal your stride length and push stress into knees and lower back. Five minutes here keeps your cutting and shooting mechanics clean.',
  muscles: ['Hip rotators', 'Glutes', 'Groin'],
  sets: '2 × 60 s continuous switching',
  rest: 'none',
  cues: [
    'Sit with front leg 90°, back leg 90°',
    'Stay tall, rotate knees side to side',
    'Pause in any sticky spot for a breath',
    'No hands for extra challenge',
  ],
  videoSearch: '90 90 hip switch mobility drill',
  alternative: 'Deep squat hold, hands on a support',
};

// ---------------------------------------------------------------------------
// Workouts
// ---------------------------------------------------------------------------

export const WORKOUTS: Workout[] = [
  {
    id: 'lower-power',
    name: 'Lower Body Strength & Power',
    emoji: '🦵',
    intent:
      'The main session of the week. Heavy and explosive — you have 48h to recover before Tuesday’s match.',
    duration: '~60 min',
    warmup: [
      '5 min easy bike or rower',
      '10 bodyweight squats + 10 walking lunges',
      '10 leg swings each direction per leg',
      '2 light warm-up sets of the first exercise',
    ],
    exercises: [boxJump, backSquat, romanianDeadlift, bulgarianSplitSquat, hipThrust, nordicCurl, calfRaise],
    notes: [
      'Jumps come first while you are fresh — power before strength.',
      'Leave 1–2 reps in the tank on every set. In-season you train to perform, not to destroy yourself.',
      'Short on time? Do squat, RDL and Nordics — the big three.',
      'Feeling beaten up from Friday’s match? Drop to 2 sets per exercise, keep the weight.',
    ],
  },
  {
    id: 'upper-core',
    name: 'Upper Body, Core & Injury-Proofing',
    emoji: '🛡️',
    intent:
      'Day after Tuesday’s match: zero heavy leg work so you are fresh for Friday. Upper body strength plus the groin, core and Achilles work that keeps you on the pitch.',
    duration: '~45 min',
    warmup: [
      '5 min easy bike or brisk walk',
      '10 arm circles each way + 10 band pull-aparts',
      '8 push-ups + 30 s dead hang',
    ],
    exercises: [benchPress, pullUps, shoulderPress, copenhagenPlank, pallofPress, sidePlank, singleLegCalf, hipMobility],
    notes: [
      'In and out in 45 minutes — this session manages fatigue, it does not create it.',
      'Legs feel heavy from the match? Perfect, that is why there is no squatting today.',
      'Copenhagen planks and calf raises are the non-negotiables — they protect the two most common over-30 injuries.',
      'Finish with the 90/90s while you are warm.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Weekly plan (dayIndex matches JS Date.getDay(): 0 = Sunday)
// ---------------------------------------------------------------------------

export const WEEK_PLAN: DayPlan[] = [
  {
    dayIndex: 1,
    day: 'Monday',
    type: 'rest',
    title: 'Rest',
    emoji: '😴',
    description:
      'Day before a match: full rest. Optional 10 min of easy walking and the 90/90 hip drill. Hydrate and sleep 8h — recovery is training after 30.',
  },
  {
    dayIndex: 2,
    day: 'Tuesday',
    type: 'match',
    title: 'Match Day ⚽',
    emoji: '⚽',
    description:
      '7v7 match. Arrive early for a proper warm-up: 5 min jog, dynamic stretches, a few accelerations building to ~90%. After: protein within an hour, easy walk to cool down.',
  },
  {
    dayIndex: 3,
    day: 'Wednesday',
    type: 'gym',
    title: 'Gym: Upper & Injury-Proofing',
    emoji: '🛡️',
    description:
      'Upper body, core, groin and Achilles work. No heavy legs — they recover for Friday while the rest of you gets stronger.',
    workoutId: 'upper-core',
  },
  {
    dayIndex: 4,
    day: 'Thursday',
    type: 'rest',
    title: 'Rest',
    emoji: '😴',
    description:
      'Day before a match: full rest. Light stretching or foam rolling in the evening if you feel tight. Prioritize sleep.',
  },
  {
    dayIndex: 5,
    day: 'Friday',
    type: 'match',
    title: 'Match Day ⚽',
    emoji: '⚽',
    description:
      '7v7 match. Same warm-up routine — over 30, the warm-up is not optional. Post-match protein and a cool-down walk set up tomorrow’s recovery.',
  },
  {
    dayIndex: 6,
    day: 'Saturday',
    type: 'recovery',
    title: 'Active Recovery',
    emoji: '🧘',
    description:
      'Optional but valuable: 20–30 min easy bike, swim or walk. Foam roll quads, calves and glutes. 90/90 hips and a gentle hamstring stretch. Nothing intense.',
  },
  {
    dayIndex: 0,
    day: 'Sunday',
    type: 'gym',
    title: 'Gym: Lower Body Strength & Power',
    emoji: '🦵',
    description:
      'The big one. 48h after Friday’s match and 48h before Tuesday’s — the perfect window for heavy legs and jumps.',
    workoutId: 'lower-power',
  },
];

export const ALL_EXERCISES: Exercise[] = WORKOUTS.flatMap((w) => w.exercises);

export function getWorkout(id: string): Workout | undefined {
  return WORKOUTS.find((w) => w.id === id);
}

export function getDayPlan(dayIndex: number): DayPlan {
  return WEEK_PLAN.find((d) => d.dayIndex === dayIndex)!;
}
