import {Howl, Howler} from 'howler';

export default const Hyoid = {

	// store the sounds by name and url
	// to know which sounds are alreay loaded
	// TODO convert this to a cache object with eviction rules and memory management
	loadedSounds: [],

	// destroys all the created Howl sounds and cleans up the local store
	unload: () => {
		Howler.unload();
		loadedSounds = [];
	},

	// stops all currently playing sounds
	stopAll: () => {
		Howler.stop();
	},

	// mute or unmute the currently playing sound(s)
	mute: (isMuted) => {
		Howler.mute(isMuted);
	},

	// set the global volume level
	// should be a double between 0 and 1
	volumeLevel: (volumeLevel) => {
		Howler.volume(volumeLevel);
	},

	// resets the global volume level back to 1
	resetVolumeLevel: () => {
		Howler.volume(1);
	},

	// load the sound give the URL or a name for it
	// if there's no URL, then use the URL as the sound name as well
	// this function will block until the sound is loaded
	// if the sound should just load in the background without blocking, don't add 'await' to the function call
	load: async(url, name='', options={}) => {
		let storedName = name || url;

		return new Promise((res, rej) => {
			const howl = new Howl({
				src: [storedName],
				...options
			});

			loadedSounds[storedName] = howl;

			howl.once('load', function() {
				res(howl);
			});
			howl.once('loaderror', function() {
				rej(howl);
			});
		});
	},

	// load an array of sounds and await them all loading
	loadAll: async(sounds, options={}) => {
		return Promise.all(sounds.map(async(sound) => {
			await load(sound, '', options);
		}));
	},

	// plays the sound given the URL or name
	// if the sound is not already loaded, this function will block until the sound is loaded
	// then block until the sound is finished playing
	// if the sound should just play without blocking, don't add 'await' to the function call
	play: async(nameOrUrl) => {
		let sound = null;
		if (typeof loadedSounds[nameOrUrl] === 'undefined') {
			sound = await load(nameOrUrl);
		}
		else {
			sound = loadedSounds[nameOrUrl];
		}

		return new Promise((res, rej) => {
			sound.once('end', () => {
				resolve(sound);
			});

			sound.once('stop', () => {
				resolve(sound);
			});

			sound.play();
		});
	},

	// pauses the sound given the URL or name
	pause: (nameOrUrl) => {
		let sound = loadedSounds[nameOrUrl];
		if (typeof sound !== 'undefined') {
			sound.pause();
		}
	},

	// stops the sound given the URL or name
	stop: (nameOrUrl) => {
		let sound = loadedSounds[nameOrUrl];
		if (typeof sound !== 'undefined') {
			sound.stop();
		}
	},

};