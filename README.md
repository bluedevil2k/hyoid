# hyoid
An ES6 Wrapper of the Howler.js Audio Library - use async/await with Howler.js

# Example Usage

import Hyoid from 'hyoid';

const MY_SOUND = 'http://mysound.mp3';

// returns the Howl object for later manipulation
const sound = await Hyoid.load(MY_SOUND);

// blocks the program until the sound finishes
await Hyoid.play(MY_SOUND);

// plays the sound in the background without blocking
Hyoid.play(MY_SOUND);

// stops the playing of our sound
Hyoid.stop(MY_SOUND);

// pauses the sound
Hyoid.pause(MY_SOUND);

// stops all the sounds currently playing
Hyoid.stopAll();

// cleans up all the sounds you created with Hyoid
Hyoid.unload();
