// VoiceUp: Micro-Podcast Studio Module

const VoiceUpModule = {
    recordings: [],
    isRecording: false,
    recordingStartTime: null,
    timerInterval: null,

    load() {
        this.loadRecordings();
        this.render();
    },

    loadRecordings() {
        this.recordings = storage.get('voiceup_recordings') || [];
    },

    saveRecordings() {
        storage.set('voiceup_recordings', this.recordings);
    },

    render() {
        const section = document.getElementById('voiceup');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2>🎙️ VoiceUp: Micro-Podcast Studio</h2>
                <p class="intro">Share your voice. Your story matters. Record up to 2 minutes.</p>

                <div class="card">
                    <h3>Record Your Story</h3>
                    <div class="recording-controls">
                        <button id="record-btn" class="btn btn-primary">
                            🎙️ Start Recording
                        </button>
                        <button id="stop-btn" class="btn btn-danger hidden">
                            ⏹️ Stop Recording
                        </button>
                        <div id="recording-timer" class="recording-timer hidden">
                            ⏱️ <span id="timer-display">00:00</span> / 02:00
                        </div>
                    </div>
                    <div id="recording-status" class="alert alert-info hidden"></div>
                </div>

                <div id="recorded-audio-section" class="card hidden">
                    <h3>Your Recording</h3>
                    <audio id="recorded-audio" controls></audio>
                    <form id="post-recording-form" class="mt-2">
                        <div class="form-group">
                            <label for="recording-title">Title (optional)</label>
                            <input type="text" id="recording-title" class="form-control" 
                                placeholder="Give your recording a title">
                        </div>
                        <div class="form-group">
                            <label for="recording-tags">Tags</label>
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="tags" value="help-needed"> Help Needed
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="tags" value="urgent"> Urgent
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="tags" value="daily-win"> Daily Win
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="tags" value="challenge"> Challenge
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="tags" value="story"> Story
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="anonymous-post"> Post Anonymously
                            </label>
                        </div>
                        <div class="flex gap-1">
                            <button type="submit" class="btn btn-success">📤 Post Recording</button>
                            <button type="button" id="discard-recording" class="btn btn-secondary">🗑️ Discard</button>
                        </div>
                    </form>
                </div>

                <div class="mt-3">
                    <h3>Community Voice Feed</h3>
                    <div class="filter-controls mb-2">
                        <label for="filter-tags">Filter by tag:</label>
                        <select id="filter-tags">
                            <option value="all">All Posts</option>
                            <option value="help-needed">Help Needed</option>
                            <option value="urgent">Urgent</option>
                            <option value="daily-win">Daily Win</option>
                            <option value="challenge">Challenge</option>
                            <option value="story">Story</option>
                        </select>
                    </div>
                    <div id="recordings-feed"></div>
                </div>
            </div>
        `;

        this.initializeControls();
        this.renderFeed();
    },

    initializeControls() {
        const recordBtn = document.getElementById('record-btn');
        const stopBtn = document.getElementById('stop-btn');
        const form = document.getElementById('post-recording-form');
        const discardBtn = document.getElementById('discard-recording');
        const filterSelect = document.getElementById('filter-tags');

        recordBtn?.addEventListener('click', () => this.startRecording());
        stopBtn?.addEventListener('click', () => this.stopRecording());
        form?.addEventListener('submit', (e) => this.handlePostRecording(e));
        discardBtn?.addEventListener('click', () => this.discardRecording());
        filterSelect?.addEventListener('change', () => this.renderFeed());
    },

    async startRecording() {
        try {
            this.isRecording = true;
            this.recordingStartTime = Date.now();
            
            const recordBtn = document.getElementById('record-btn');
            const stopBtn = document.getElementById('stop-btn');
            const timer = document.getElementById('recording-timer');
            const status = document.getElementById('recording-status');

            recordBtn.classList.add('hidden');
            stopBtn.classList.remove('hidden');
            timer.classList.remove('hidden');
            status.classList.remove('hidden');
            status.textContent = '🎙️ Recording in progress...';

            // Start timer display
            this.startTimer();

            // Start audio recording
            await audioRecorder.startRecording(
                null,
                (blob) => this.handleRecordingComplete(blob),
                () => this.handleMaxDuration()
            );

        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Error accessing microphone. Please check permissions.');
            this.resetRecordingUI();
        }
    },

    stopRecording() {
        this.isRecording = false;
        audioRecorder.stopRecording();
        this.stopTimer();
    },

    startTimer() {
        const display = document.getElementById('timer-display');
        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.recordingStartTime;
            const seconds = Math.floor(elapsed / 1000);
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            display.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);
    },

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    async handleRecordingComplete(blob) {
        const status = document.getElementById('recording-status');
        status.textContent = '✅ Recording complete!';
        
        // Convert to base64 for storage
        const base64Audio = await AudioRecorder.blobToBase64(blob);
        
        // Show playback and form
        const audioElement = document.getElementById('recorded-audio');
        const section = document.getElementById('recorded-audio-section');
        
        audioElement.src = base64Audio;
        section.classList.remove('hidden');
        
        // Store temporarily
        this.currentRecording = {
            audio: base64Audio,
            duration: Date.now() - this.recordingStartTime
        };

        this.resetRecordingUI();
    },

    handleMaxDuration() {
        const status = document.getElementById('recording-status');
        status.className = 'alert alert-warning';
        status.textContent = '⏱️ Maximum recording duration (2 minutes) reached!';
    },

    resetRecordingUI() {
        const recordBtn = document.getElementById('record-btn');
        const stopBtn = document.getElementById('stop-btn');
        const timer = document.getElementById('recording-timer');

        recordBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        timer.classList.add('hidden');
    },

    handlePostRecording(e) {
        e.preventDefault();

        if (!this.currentRecording) return;

        const title = document.getElementById('recording-title').value;
        const anonymous = document.getElementById('anonymous-post').checked;
        const tagCheckboxes = document.querySelectorAll('input[name="tags"]:checked');
        const tags = Array.from(tagCheckboxes).map(cb => cb.value);

        const recording = {
            id: storage.generateId(),
            audio: this.currentRecording.audio,
            duration: this.currentRecording.duration,
            title: title || 'Untitled Recording',
            tags: tags,
            anonymous: anonymous,
            timestamp: new Date().toISOString(),
            status: 'published'
        };

        this.recordings.unshift(recording);
        this.saveRecordings();

        // Reset form
        document.getElementById('post-recording-form').reset();
        document.getElementById('recorded-audio-section').classList.add('hidden');
        document.getElementById('recording-status').textContent = '✅ Recording posted successfully!';
        this.currentRecording = null;

        // Refresh feed
        this.renderFeed();

        accessibility.announceChange('Recording posted successfully');
    },

    discardRecording() {
        this.currentRecording = null;
        document.getElementById('recorded-audio-section').classList.add('hidden');
        document.getElementById('recording-status').classList.add('hidden');
        accessibility.announceChange('Recording discarded');
    },

    renderFeed() {
        const feed = document.getElementById('recordings-feed');
        if (!feed) return;

        const filterValue = document.getElementById('filter-tags')?.value || 'all';
        
        let filteredRecordings = this.recordings;
        if (filterValue !== 'all') {
            filteredRecordings = this.recordings.filter(r => r.tags.includes(filterValue));
        }

        if (filteredRecordings.length === 0) {
            feed.innerHTML = '<p class="text-center">No recordings yet. Be the first to share your voice!</p>';
            return;
        }

        feed.innerHTML = filteredRecordings.map(recording => {
            const date = new Date(recording.timestamp);
            const duration = Math.floor(recording.duration / 1000);
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;

            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${recording.title}</h4>
                            <div class="card-meta">
                                ${recording.anonymous ? '👤 Anonymous' : '👤 Community Member'} • 
                                ${date.toLocaleDateString()} ${date.toLocaleTimeString()} • 
                                ⏱️ ${minutes}:${String(seconds).padStart(2, '0')}
                            </div>
                        </div>
                    </div>
                    <div class="recording-tags mb-1">
                        ${recording.tags.map(tag => `<span class="badge badge-primary">${tag}</span>`).join(' ')}
                    </div>
                    <audio controls>
                        <source src="${recording.audio}" type="audio/webm">
                        Your browser does not support audio playback.
                    </audio>
                </div>
            `;
        }).join('');
    }
};
