// FoodFinder Module
const FoodFinderModule = {
    meals: [],
    
    load() {
        this.meals = storage.get('meals') || this.getDefaultMeals();
        this.render();
    },
    
    getDefaultMeals() {
        return [
            { 
                id: '1', 
                name: 'Community Lunch', 
                location: 'St. Mary\'s Church', 
                address: '456 Church St',
                time: '12:00 PM', 
                days: ['Mon', 'Wed', 'Fri'],
                type: 'hot-meal',
                description: 'Free hot lunch served daily'
            },
            { 
                id: '2', 
                name: 'Evening Meal', 
                location: 'Community Center', 
                address: '123 Main St',
                time: '6:00 PM', 
                days: ['Tue', 'Thu', 'Sat'],
                type: 'hot-meal',
                description: 'Dinner service with take-home options'
            },
            { 
                id: '3', 
                name: 'Food Bank Distribution', 
                location: 'St. Mary\'s Food Bank', 
                address: '456 Church St',
                time: '2:00 PM - 4:00 PM', 
                days: ['Tue', 'Thu'],
                type: 'food-bank',
                description: 'Groceries and essentials'
            },
            { 
                id: '4', 
                name: 'Weekend Breakfast', 
                location: 'Unity Church', 
                address: '789 Unity Ave',
                time: '9:00 AM', 
                days: ['Sat', 'Sun'],
                type: 'hot-meal',
                description: 'Hearty breakfast to start your weekend'
            }
        ];
    },
    
    saveMeals() {
        storage.set('meals', this.meals);
    },
    
    render() {
        const section = document.getElementById('food-finder');
        if (!section) return;
        
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        
        section.innerHTML = `
            <div class="container">
                <h2>🍽️ FoodFinder</h2>
                <p class="intro">Find free meals and food resources in your area.</p>
                
                <div class="card">
                    <h3>Filter Meals</h3>
                    <div class="form-group">
                        <label for="day-filter">Day of Week:</label>
                        <select id="day-filter">
                            <option value="all">All Days</option>
                            <option value="Mon">Monday</option>
                            <option value="Tue">Tuesday</option>
                            <option value="Wed">Wednesday</option>
                            <option value="Thu">Thursday</option>
                            <option value="Fri">Friday</option>
                            <option value="Sat">Saturday</option>
                            <option value="Sun">Sunday</option>
                            <option value="today">Today (${today})</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="type-filter">Meal Type:</label>
                        <select id="type-filter">
                            <option value="all">All Types</option>
                            <option value="hot-meal">Hot Meals</option>
                            <option value="food-bank">Food Bank</option>
                        </select>
                    </div>
                </div>

                <div class="mt-3">
                    <h3>Available Meals & Resources</h3>
                    <div id="meals-list"></div>
                </div>
                
                <div class="card mt-3">
                    <h3>Weekly Calendar</h3>
                    <div id="weekly-calendar"></div>
                </div>
            </div>
        `;
        
        this.initializeControls();
        this.renderMealsList();
        this.renderCalendar();
    },
    
    initializeControls() {
        const dayFilter = document.getElementById('day-filter');
        const typeFilter = document.getElementById('type-filter');
        
        dayFilter?.addEventListener('change', () => this.renderMealsList());
        typeFilter?.addEventListener('change', () => this.renderMealsList());
    },
    
    renderMealsList() {
        const list = document.getElementById('meals-list');
        if (!list) return;
        
        const dayFilter = document.getElementById('day-filter')?.value || 'all';
        const typeFilter = document.getElementById('type-filter')?.value || 'all';
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        
        let filtered = this.meals;
        
        if (dayFilter !== 'all') {
            const targetDay = dayFilter === 'today' ? today : dayFilter;
            filtered = filtered.filter(m => m.days.includes(targetDay));
        }
        
        if (typeFilter !== 'all') {
            filtered = filtered.filter(m => m.type === typeFilter);
        }
        
        if (filtered.length === 0) {
            list.innerHTML = '<p class="text-center">No meals found for the selected criteria.</p>';
            return;
        }
        
        list.innerHTML = filtered.map(meal => `
            <div class="card">
                <div class="card-header">
                    <div>
                        <h4 class="card-title">${meal.name}</h4>
                        <div class="card-meta">📍 ${meal.location}</div>
                    </div>
                    <span class="badge badge-primary">${meal.type === 'hot-meal' ? '🍽️ Hot Meal' : '🥫 Food Bank'}</span>
                </div>
                <p>${meal.description}</p>
                <p><strong>Address:</strong> ${meal.address}</p>
                <p><strong>Time:</strong> 🕐 ${meal.time}</p>
                <p><strong>Days:</strong> ${meal.days.join(', ')}</p>
                ${meal.days.includes(today) ? '<span class="badge badge-success">Available Today!</span>' : ''}
            </div>
        `).join('');
    },
    
    renderCalendar() {
        const calendar = document.getElementById('weekly-calendar');
        if (!calendar) return;
        
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        calendar.innerHTML = `
            <div class="calendar-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem;">
                ${daysOfWeek.map(day => {
                    const dayMeals = this.meals.filter(m => m.days.includes(day));
                    return `
                        <div class="calendar-day" style="padding: 1rem; background: var(--bg-secondary); border-radius: var(--border-radius);">
                            <h4 style="margin-bottom: 0.5rem;">${day}</h4>
                            ${dayMeals.length > 0 ? `
                                <div style="font-size: 0.875rem;">
                                    ${dayMeals.map(m => `
                                        <div style="margin-bottom: 0.25rem;">
                                            ${m.type === 'hot-meal' ? '🍽️' : '🥫'} ${m.time}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : '<p style="font-size: 0.875rem; color: var(--text-secondary);">No meals</p>'}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};
