export const state = {
  money: 0, hp:100, sleep: 100, mood: 100,
  active: {'idle': true, 'working': false, 'eating':false, 'sleeping': false, 'drinking': false},
  passive: { sleepy: false, sad: false },
};

export function derivePassive(s) {
  s.passive.sleepy = s.sleep < 40;
  s.passive.sad    = s.mood < 40;
}