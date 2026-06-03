import {udaLife} from './rules.js';
import {state} from './state.js';
import {updateBars, updateBarColors, updateUda} from './ui.js';
import {events} from './events.js';

events();

function render() {
  updateBars(state);
  updateBarColors(state);
  updateUda(state);
}

let lastTime = null;

function loop(timestamp) {
  const dt = lastTime ? timestamp - lastTime : 0;
  lastTime = timestamp;
  
  udaLife(state,dt);
  render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);