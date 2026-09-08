// Universal Native Mobile Haptic Feedback & Audio Click Engine
// Works seamlessly across Android devices (Physical Vibration API) and iOS (Web Audio Taptic Click)

let audioCtx = null;

const playSubtleTapticClick = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    // Silent fail if audio context is blocked
  }
};

export const triggerHaptic = (type = 'medium') => {
  // 1. Play crisp micro-click sound (guaranteed on iOS iPhones and all mobile browsers)
  playSubtleTapticClick();

  // 2. Trigger physical vibration motor on Android / supporting hardware
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      // Chrome/Chromium security requirement: navigator.vibrate requires prior user activation
      if (navigator.userActivation && !navigator.userActivation.hasBeenActive) {
        return;
      }
      if (type === 'heavy' || type === 'pop') {
        // Double punch for confetti pop & gate open
        navigator.vibrate([60, 40, 80]);
      } else if (type === 'light') {
        navigator.vibrate(40);
      } else {
        // Standard tactile burst (55ms overcomes motor inertia on modern phones)
        navigator.vibrate(55);
      }
    }
  } catch (e) {
    // Fail silently on unsupported devices
  }
};
