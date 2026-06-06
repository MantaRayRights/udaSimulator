import {udaLife} from './rules.js';
import {state} from './state.js';
import {derivePassive} from './state.js';
import {updateBars, updateBarColors, updateUda} from './ui.js';
import {events} from './events.js';


let lastTime = null;

function render() {
  updateBars(state);
  updateBarColors(state);
  updateUda(state);
}

// requestAnimationFrame calls loop at the refresh rate of the browser
function loop(timestamp) {
  const dt = lastTime ? timestamp - lastTime : 0;
  lastTime = timestamp;
  
  udaLife(state,dt);
  //console.log(state.hp, state.sleep, state.mental, state.money);
  render();
  requestAnimationFrame(loop);
}

events();
requestAnimationFrame(loop);