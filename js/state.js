export const state = {
  money: 10, hp:100, sleep: 50, mood: 50,
  active: 'idle', 
  passive: { sleepy: false, sad: false },
};

export function derivePassive(s) {
  s.passive.sleepy = s.sleep < 30;
  s.passive.sad    = s.mood < 30;
}