// Audio recording and playback utilities

class AudioRecorder {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.stream = null;
        this.isRecording = false;
        this.maxDuration = 120000; // 2 minutes in milliseconds
        this.timer = null;
    }

    async init() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            return true;
        } catch (error) {
            console.error('Error accessing microphone:', error);
            return false;
        }
    }

    async startRecording(onDataAvailable, onStop, onMaxDuration) {
        if (!this.stream) {
            const initialized = await this.init();
            if (!initialized) {
                throw new Error('Failed to initialize microphone');
            }
        }

        this.audioChunks = [];
        this.mediaRecorder = new MediaRecorder(this.stream);

        this.mediaRecorder.addEventListener('dataavailable', (event) => {
            this.audioChunks.push(event.data);
            if (onDataAvailable) {
                onDataAvailable(event.data);
            }
        });

        this.mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
            if (onStop) {
                onStop(audioBlob);
            }
            this.clearTimer();
        });

        this.mediaRecorder.start();
        this.isRecording = true;

        // Set maximum duration timer
        this.timer = setTimeout(() => {
            if (this.isRecording) {
                this.stopRecording();
                if (onMaxDuration) {
                    onMaxDuration();
                }
            }
        }, this.maxDuration);

        return true;
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.clearTimer();
        }
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    pauseRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.pause();
        }
    }

    resumeRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.resume();
        }
    }

    cleanup() {
        this.stopRecording();
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    // Convert blob to base64 for storage
    static blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    // Convert base64 back to blob
    static base64ToBlob(base64, mimeType = 'audio/webm') {
        const byteString = atob(base64.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeType });
    }
}

class AudioPlayer {
    constructor() {
        this.audio = null;
    }

    play(audioSource) {
        // Stop current playback if any
        this.stop();

        if (audioSource instanceof Blob) {
            const url = URL.createObjectURL(audioSource);
            this.audio = new Audio(url);
        } else if (typeof audioSource === 'string') {
            // Assume it's a base64 string or URL
            if (audioSource.startsWith('data:')) {
                this.audio = new Audio(audioSource);
            } else {
                const blob = AudioRecorder.base64ToBlob(audioSource);
                const url = URL.createObjectURL(blob);
                this.audio = new Audio(url);
            }
        }

        if (this.audio) {
            this.audio.play();
            return this.audio;
        }
        return null;
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }

    setVolume(volume) {
        if (this.audio) {
            this.audio.volume = Math.max(0, Math.min(1, volume));
        }
    }
}

// Create global instances
const audioRecorder = new AudioRecorder();
const audioPlayer = new AudioPlayer();
