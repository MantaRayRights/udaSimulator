// Updates the web page to reflect the current state.

function updateBars(state) {
  document.getElementById('bar-hp').style.width    = state.hp     + '%';
  document.getElementById('bar-sleep').style.width = state.sleep  + '%';
  document.getElementById('bar-mental').style.width= state.mental + '%';
  document.getElementById('bar-money').style.width = (state.money / MAX_MONEY * 100) + '%';
}

function updateBarColors(state) {
  const sleepBar = document.getElementById('bar-sleep');
  sleepBar.classList.toggle('bar--warning', state.passive.sleepy);
  
  const mentalBar = document.getElementById('bar-mental');
  mentalBar.classList.toggle('bar--warning', state.passive.sad);
}

const SPRITE_MAP = {
  'idle:normal':        'elf--idle-normal',
  'idle:sleepy':        'elf--idle-sleepy',
  'idle:sad':           'elf--idle-sad',
  'idle:sleepy+sad':    'elf--idle-sleepy-sad',
  'working:normal':     'elf--working-normal',
  'sleeping:normal':    'elf--sleeping-normal',
  'drinking:normal':    'elf--drinking-normal',
};

function updateSprite(state) {
  const passiveKey = [
    state.passive.sleepy ? 'sleepy' : '',
    state.passive.sad    ? 'sad'    : '',
  ].filter(Boolean).join('+') || 'normal';
  
  const key = `${state.active}:${passiveKey}`;
  const elfEl = document.getElementById('elf-sprite');
  
  elfEl.className = elfEl.className
    .split(' ')
    .filter(c => !c.startsWith('elf--'))
    .join(' ');
  elfEl.classList.add(SPRITE_MAP[key] ?? 'elf--idle-normal');
}

export function eventLogger(message) {
  const log = document.getElementById('event-log');
  const entry = document.createElement('p');
  entry.textContent = message;
  log.prepend(entry); // newest at top
}



