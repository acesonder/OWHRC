// RespectPoint: Community Feedback Module
const RespectPointModule = {
    feedback: [],
    load() {
        this.feedback = storage.get('respect_feedback') || [];
        this.render();
    },
    saveFeedback() {
        storage.set('respect_feedback', this.feedback);
    },
    render() {
        const section = document.getElementById('respect-point');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>⭐ RespectPoint: Community Feedback</h2>
                <p class="intro">Rate services and share feedback to improve community spaces.</p>
                <div class="card">
                    <h3>Leave Feedback</h3>
                    <form id="feedback-form">
                        <div class="form-group">
                            <label>Location/Service</label>
                            <input type="text" id="feedback-location" required placeholder="Which service or location?">
                        </div>
                        <div class="form-group">
                            <label>Rating</label>
                            <div class="rating-input">
                                <input type="radio" name="rating" value="5" id="rate5"><label for="rate5">⭐⭐⭐⭐⭐</label>
                                <input type="radio" name="rating" value="4" id="rate4"><label for="rate4">⭐⭐⭐⭐</label>
                                <input type="radio" name="rating" value="3" id="rate3"><label for="rate3">⭐⭐⭐</label>
                                <input type="radio" name="rating" value="2" id="rate2"><label for="rate2">⭐⭐</label>
                                <input type="radio" name="rating" value="1" id="rate1"><label for="rate1">⭐</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Comments</label>
                            <textarea id="feedback-comments" placeholder="Share your experience..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit Feedback</button>
                    </form>
                </div>
                <div class="mt-3">
                    <h3>Recent Feedback</h3>
                    <div id="feedback-list"></div>
                </div>
            </div>
        `;
        this.initializeControls();
        this.renderFeedback();
    },
    initializeControls() {
        const form = document.getElementById('feedback-form');
        form?.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    handleSubmit(e) {
        e.preventDefault();
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const fb = {
            id: storage.generateId(),
            location: document.getElementById('feedback-location').value,
            rating: rating || '3',
            comments: document.getElementById('feedback-comments').value,
            timestamp: new Date().toISOString()
        };
        this.feedback.unshift(fb);
        this.saveFeedback();
        e.target.reset();
        this.renderFeedback();
    },
    renderFeedback() {
        const list = document.getElementById('feedback-list');
        if (!list) return;
        if (this.feedback.length === 0) {
            list.innerHTML = '<p class="text-center">No feedback yet.</p>';
            return;
        }
        list.innerHTML = this.feedback.map(fb => {
            const date = new Date(fb.timestamp);
            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${fb.location}</h4>
                            <div class="card-meta">${date.toLocaleDateString()}</div>
                        </div>
                        <div>${'⭐'.repeat(parseInt(fb.rating))}</div>
                    </div>
                    ${fb.comments ? `<p>${fb.comments}</p>` : ''}
                </div>
            `;
        }).join('');
    }
};
