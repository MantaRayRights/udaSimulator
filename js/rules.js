import {eventLogger} from './ui.js';
import {state, derivePassive} from './state.js';

const DECAY = {
  'idle':     { hp: -0.005, sleep: -0.001, mood: -0.001, money: -0.001 },
  'working':  { hp: -0.01, sleep: -0.001, mood: -0.001, money: 0.03 },
  'sleeping': { hp: -0.003, sleep: 0.05, mood: 0, money: -0.001 },
  'eating':   { hp: 0.02, sleep: -0.001, mood: 0.01, money: -0.01 },
  'drinking': { hp: -0.02, sleep: -0.01, mood: 0.03, money: -0.01 },
  'dead':     { hp: 0, sleep: 0, mood: 0, money: 0 }
};

export function udaLife(state, dt) {
  //console.log('active:', state.active);
  if (state.active === 'eating' || state.active === 'drinking') {
    if (state.money <= 0) {
      state.active = 'idle';
      // add popup "That costs a lot!"
      eventLogger("Uda couldn't afford to eat/drink");
    }
  }

  if (state.active !== 'sleeping' && state.sleep <=10) {
    state.active = 'sleeping';
    // add popup "Sorry..."
    eventLogger("Uda collapsed from exhaustion");
  }
  
  if (state.hp <= 0) {state.active = 'dead';
    eventLogger("Uda died");}

  derivePassive(state);

  let udaEfficiency = 0;
    if (state.active === 'working') {
      if (state.passive.sleepy) udaEfficiency -= 0.01;
      if (state.passive.sad)    udaEfficiency -= 0.01;
  }

  const rates = DECAY[state.active];
  //console.log('active:', state.active, 'rates:', rates);
  state.hp = clamp(state.hp + rates.hp * dt, 0, 100);
  state.sleep = clamp(state.sleep + rates.sleep * dt, 0, 100);
  state.mood = clamp(state.mood + rates.mood * dt, 0, 100);
  state.money = clamp(state.money + (rates.money + udaEfficiency) * dt, 0, 999);
  
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}