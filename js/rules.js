const DECAY = {
  idle:     { hp: -0.005, sleep: -0.001, mental: -0.001, money: -0.001 },
  working:  { hp: -0.01, sleep: -0.001, mental: -0.001, money: 0.03 },
  sleeping: { hp: -0.003, sleep: 0.05, mental: 0, money: -0.001 },
  drinking: { hp: -0.02, sleep: -0.01, mental: 0.03, money: -0.003 },
  dead:     { hp: 0, sleep: 0, mental: 0, money: 0 }
};

export function timeEvolution(state, dt) {
  const rates = DECAY[state.active];
  
  state.hp     = clamp(state.hp     + rates.hp     * dt, 0, 100);
  state.sleep  = clamp(state.sleep  + rates.sleep  * dt, 0, 100);
  state.mental = clamp(state.mental + rates.mental * dt, 0, 100);
  state.money  = clamp(state.money  + rates.money  * dt, 0, 999);
  
  derivePassive(state);
  
  if (state.hp <= 0) state.active = 'dead';
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}