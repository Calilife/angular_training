# ⚽ MatchFit — Gym Training for the Over-30 7v7 Player

A mobile-first Angular app with a research-based gym program built around
**matches on Tuesday and Friday**.

## Run it

```bash
cd matchfit
npm install
npm start          # opens on http://localhost:4200
```

Open it on your phone at the gym: run `npm start -- --host 0.0.0.0` and visit
`http://<your-computer-ip>:4200` from the same Wi-Fi.

## The weekly schedule (and why)

| Day | What | Why |
|---|---|---|
| Monday | Rest | Day before a match — freshness wins games |
| **Tuesday** | **Match** | 7v7 |
| Wednesday | Gym: Upper body, core & injury-proofing (~45 min) | Day after a match: no heavy legs, so you're fresh Friday |
| Thursday | Rest | Day before a match |
| **Friday** | **Match** | 7v7 |
| Saturday | Active recovery (optional) | Easy movement speeds up recovery |
| Sunday | Gym: Lower body strength & power (~60 min) | 48h after Friday's match, 48h before Tuesday's — the only safe window for heavy legs |

Core principles from in-season strength & conditioning research:

- Heavy lower-body lifting needs ~48h before a match to dissipate fatigue.
- In-season volume stays low (2–4 sets, rarely above 8 reps) — train to perform, not to exhaust.
- Power work (jumps) comes first in a session, while fresh.
- Eccentric hamstring work (Nordic curls, RDLs) cuts hamstring injuries roughly in half — and hamstrings are up to 50% of soccer muscle injuries.
- Copenhagen planks reduce groin/adductor injuries (~40% in studies on players).
- Calf/Achilles loading twice a week is the over-30 player's insurance policy.

## App features

- **Week view** — see today's plan at a glance, built around your match days
- **Guided workouts** — every exercise with its focus point, sets/reps/rest, technique cues, an embedded technique video plus a YouTube search fallback, and a no-equipment alternative
- **Set logging** — record weight × reps per set, with "last time" hints so you know what to beat
- **Progress** — week streak, personal bests with trends, full session history
- All data stored locally in your browser (localStorage) — no account, no server

## Tech stack

Angular 19 (standalone components, signals, new control flow), zero runtime
dependencies beyond Angular itself. Data persists in `localStorage`.

## Sources

- [Soccer Interaction — 10 best strength exercises for soccer players](https://soccerinteraction.com/10-best-strength-exercises-for-soccer-players)
- [Soccer Interaction — Strength training to prevent injuries in soccer](https://soccerinteraction.com/strength-training-to-prevent-injuries-in-soccer)
- [White Lion Performance — 3 keys for in-season soccer strength training](https://www.whitelionperformance.com/blog/inseason-strength-soccer)
- [Erica Suter — In-season strength training and recovery for soccer players](https://ericasuter.com/in-season-strength-training-and-recovery-for-soccer-players/)
- [Strength & Conditioning Journal — Practical recovery strategies for soccer](https://journals.lww.com/nsca-scj/fulltext/2018/06000/practical_active_and_passive_recovery_strategies.6.aspx)
- [Compete Sports Performance — Strength training for soccer players](https://competeperformance.com/blog/strength-training-for-soccer-players/)

> Not medical advice. If something hurts (sharp pain, not muscle burn), stop and
> get it checked — especially tendons.
