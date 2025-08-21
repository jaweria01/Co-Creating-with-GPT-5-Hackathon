export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const COLORS = {
    primary: '#10B981', // eco-green
    secondary: '#3B82F6', // eco-blue
    background: '#F0FDF4', // eco-light
};

export const MOCK_DATA = {
    carbonPie: {
        labels: ['Electricity', 'Travel', 'Water'],
        datasets: [{
            data: [40, 35, 25],
            backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
        }],
    },
    savingsLine: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Savings (kWh)',
            data: [100, 120, 110, 130, 140],
            borderColor: '#10B981',
            tension: 0.1,
        }],
    },
    greenScore: 75,
    leaderboard: [
        { name: 'User1', score: 95, badge: 'Eco Hero' },
        { name: 'User2', score: 85, badge: 'Beginner' },
        { name: 'You', score: 75, badge: 'Beginner' },
    ],
};