// FoodFinder Module
const FoodFinderModule = {
    meals: [],
    load() {
        this.meals = storage.get('meals') || this.getDefaultMeals();
        this.render();
    },
    getDefaultMeals() {
        return [
            { id: '1', name: 'Community Lunch', location: 'St. Mary\'s Church', time: '12:00 PM', days: ['Mon', 'Wed', 'Fri'] },
            { id: '2', name: 'Evening Meal', location: 'Community Center', time: '6:00 PM', days: ['Tue', 'Thu', 'Sat'] }
        ];
    },
    render() {
        const section = document.getElementById('food-finder');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>🍽️ FoodFinder</h2>
                <p class="intro">Find free meals and food resources in your area.</p>
                <div class="card">
                    <h3>Upcoming Meals</h3>
                    <div id="meals-list">
                        ${this.meals.map(m => `
                            <div class="list-item">
                                <h4>${m.name}</h4>
                                <p>📍 ${m.location} • 🕐 ${m.time}</p>
                                <p>Days: ${m.days.join(', ')}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
};
