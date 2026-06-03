import {udaLife} from './rules.js';
import {state} from './state.js';
import {updateBars, updateBarColors, updateUda} from './ui.js';
import {events} from './events.js';

events();
requestAnimationFrame(loop);

function render() {
  updateBars(state);
  updateBarColors(state);
  updateUda(state);
}


function loop(timestamp) {
  // timestamp is milliseconds since the page loaded
  
  // update state
  udaLife(state,timestamp);
  // update visuals
  render();
  
  // schedule the next call
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

let lastTime = null;

function loop(timestamp) {
  const dt = lastTime ? timestamp - lastTime : 0;
  lastTime = timestamp;
  
  udaLife(state,dt);
  render();
  requestAnimationFrame(loop);
}