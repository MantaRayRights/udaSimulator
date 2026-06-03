import {udaLife} from './rules.js';
import {state} from './state.js';

function render() {
  updateBars(state);
  updateBarColors(state);
  updateSprite(state);
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