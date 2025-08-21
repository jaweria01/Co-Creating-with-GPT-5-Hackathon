import { MOCK_DATA, API_BASE_URL } from '../constants';

// Helper for API calls with error handling
async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('API error');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null; // Or throw for handling in components
    }
}

// Mock functions for demo; replace with real backend calls
export async function fetchCarbonData() {
    // Real: return apiFetch('/carbon-data');
    return MOCK_DATA;
}

export async function sendChatQuery(text) {
    // Real: 
    // return apiFetch('/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ query: text }),
    // });
    return `Eco-Buddy: Based on "${text}", switch to LED bulbs to save 40 kWh/month 🌳`; // Mock response
}

export async function sendVoiceQuery(audioBlob) {
    // Real:
    // const formData = new FormData();
    // formData.append('audio', audioBlob);
    // return apiFetch('/voice', { method: 'POST', body: formData });
    return 'Eco-Buddy: Voice query processed - reduce plastic by recycling!'; // Mock
}

export async function logActivity(action) {
    // Real: apiFetch('/log-activity', { method: 'POST', body: JSON.stringify({ action }) });
    return { success: true, points: 10, newBadge: 'Eco Hero' }; // Mock
}