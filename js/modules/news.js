// Street News Bulletin Module
const NewsModule = {
    articles: [],
    load() {
        this.articles = storage.get('news_articles') || this.getDefaultNews();
        this.render();
    },
    getDefaultNews() {
        return [
            { id: '1', title: 'Welcome to HopeVoice Hub', content: 'A new platform for our community to connect and be heard.', date: new Date().toISOString(), featured: true }
        ];
    },
    render() {
        const section = document.getElementById('news');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>📰 Street News Bulletin</h2>
                <p class="intro">Community news, events, and updates.</p>
                <div id="news-feed">
                    ${this.articles.map(a => {
                        const date = new Date(a.date);
                        return `
                            <div class="card ${a.featured ? 'featured' : ''}">
                                <div class="card-header">
                                    <h3 class="card-title">${a.title}</h3>
                                    <div class="card-meta">${date.toLocaleDateString()}</div>
                                </div>
                                <p>${a.content}</p>
                                ${a.featured ? '<span class="badge badge-success">Featured</span>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
};
