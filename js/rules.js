import {events} from './events.js';
import {eventLogger} from './ui.js';
import {state} from './state.js';
import {derivePassive} from './state.js';

const DECAY = {
  idle:     { hp: -0.005, sleep: -0.001, mental: -0.001, money: -0.001 },
  working:  { hp: -0.01, sleep: -0.001, mental: -0.001, money: 0.03 },
  sleeping: { hp: -0.003, sleep: 0.05, mental: 0, money: -0.001 },
  drinking: { hp: -0.02, sleep: -0.01, mental: 0.03, money: -0.003 },
  dead:     { hp: 0, sleep: 0, mental: 0, money: 0 }
};

export function udaLife(state, dt) {
  const rates = DECAY[state.active];
  derivePassive(state);
  if (state.passive.sleepy && state.active === 'working') rates.money -= 0.01;
  if (state.passive.sad && state.active === 'working') rates.money -= 0.01;

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
  
  if (state.hp <= 0) state.active = 'dead';
    eventLogger("Uda died");

  state.hp     = clamp(state.hp     + rates.hp     * dt, 0, 100);
  state.sleep  = clamp(state.sleep  + rates.sleep  * dt, 0, 100);
  state.mental = clamp(state.mental + rates.mental * dt, 0, 100);
  state.money  = clamp(state.money  + rates.money  * dt, 0, 999);
  
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}