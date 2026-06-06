// Updates the web page to reflect the current state.

export function updateBars(state) {
  document.getElementById('bar-hp').style.width    = state.hp     + '%';
  document.getElementById('bar-sleep').style.width = state.sleep  + '%';
  document.getElementById('bar-mood').style.width= state.mood + '%';
  document.getElementById('bar-money').style.width = state.money + '%';
}

export function updateBarColors(state) {
  document.getElementById('bar-hp')
  .classList.toggle('bar--warning', state.hp <= 30);
}

const SPRITE_MAP = {
  'idle:normal':        'uda--idle-normal',
  'idle:sleepy':        'uda--idle-sleepy',
  'idle:sad':           'uda--idle-sad',
  'idle:sleepy+sad':    'uda--idle-sleepy-sad',
  'working:normal':     'uda--working-normal',
  'sleeping:normal':    'uda--sleeping-normal',
  'drinking:normal':    'uda--drinking-normal',
};

export function updateUda(state) {
  const passiveKey = [
    state.passive.sleepy ? 'sleepy' : '',
    state.passive.sad    ? 'sad'    : '',
  ].filter(Boolean).join('+') || 'normal';
  
  const key = `${state.active}:${passiveKey}`;
  const udaEl = document.getElementById('uda-sprite');
  
  udaEl.className = udaEl.className
    .split(' ')
    .filter(c => !c.startsWith('uda--'))
    .join(' ');
  udaEl.classList.add(SPRITE_MAP[key] ?? 'uda--idle-normal');
}

export function eventLogger(message) {
  const log = document.getElementById('event-log');
  const entry = document.createElement('p');
  entry.textContent = message;
  log.prepend(entry); // newest at top
}



