/**
 * Audio notification utility
 * Uses AudioContext to work reliably in Capacitor Android WebView.
 * Must be "unlocked" by the first user interaction before it can play.
 */

let audioContext = null;
let audioBuffer = null;
let isUnlocked = false;

/**
 * Call this on the first user interaction (tap/click) to unlock audio.
 * Safe to call multiple times.
 */
export function unlockAudio() {
  if (isUnlocked) return;
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    isUnlocked = true;
    // Pre-load the notification sound
    loadNotificationSound();
  } catch (e) {
    console.log('AudioContext not available:', e);
  }
}

async function loadNotificationSound() {
  if (!audioContext || audioBuffer) return;
  try {
    // Try multiple paths to handle both web and Capacitor APK environments
    const paths = ['notification.mp3', '/notification.mp3', './notification.mp3'];
    for (const path of paths) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          console.log('Notification sound loaded from:', path);
          return;
        }
      } catch (e) {
        // Try next path
      }
    }
    console.log('Could not load notification.mp3 from any path');
  } catch (e) {
    console.log('Error loading notification sound:', e);
  }
}

/**
 * Play the notification sound.
 * Falls back to a simple beep generated via AudioContext if mp3 is not loaded.
 */
export function playNotificationSound() {
  // Ensure AudioContext is initialized
  if (!isUnlocked) {
    unlockAudio();
    return;
  }

  if (!audioContext) return;

  // If context was suspended (e.g. backgrounded), resume it
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  try {
    if (audioBuffer) {
      // Play the pre-loaded mp3
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    } else {
      // Fallback: generate a simple beep tone
      playBeep();
    }
  } catch (e) {
    console.log('Error playing notification:', e);
    // Try fallback beep
    try { playBeep(); } catch (_) {}
  }
}

function playBeep() {
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}
