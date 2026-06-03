import { state } from './state.js';
import { derivePassive } from './state.js';
import { timeEvolution } from './rules.js';

// Listen to the browser events and update the state accordingly.
// I don't know how to connect the buttons yet! Just put them there first
document.getElementById('workButton').addEventListener('click', () => {
  state.active = 'working';
});

document.getElementById('eatButton').addEventListener('click', () => {
  if (state.money <= 0) return
  state.active = 'eating';
});

document.getElementById('sleepButton').addEventListener('click', () => {
  state.active = 'sleeping';
});

document.getElementById('drinkButton').addEventListener('click', () => {
  if (state.money <= 0) return;
  state.active = 'drinking';
});