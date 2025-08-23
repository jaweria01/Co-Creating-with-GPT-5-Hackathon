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
    // Real backend call
    const response = await apiFetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
    });
    if (response && response.reply) {
        return response.reply;
    }
    // Mock response for testing
    return `Eco-Buddy: Based on "${text}", switch to LED bulbs to save 40 kWh/month 🌳`;
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

export async function fetchChatHistory() {
    // Real: apiFetch('/chat-history');
    return []; // Mock empty
}

export async function saveChatHistory(messages) {
    // Real: apiFetch('/chat-history', { method: 'POST', body: JSON.stringify(messages) });
    console.log('Saved history:', messages); // Mock
}

export async function fetchGamificationData() {
    // Real: apiFetch('/gamification');
    return { points: 150, badges: ['Beginner', 'Eco Hero'], history: ['Logged LED switch', 'Reduced water'] }; // Mock
}

export async function loginUser(credentials) {
    // Real: apiFetch('/login', { method: 'POST', body: JSON.stringify(credentials) });
    return { success: true }; // Mock
}

export async function signupUser(credentials) {
    // Real: apiFetch('/signup', { method: 'POST', body: JSON.stringify(credentials) });
    return { success: true }; // Mock
}

export async function logoutUser() {
    // Real: apiFetch('/logout', { method: 'POST' });
    return { success: true }; // Mock
}

export async function fetchDeviceData() {
    // Real: apiFetch('/devices');
    return [
        { id: 'Light1', status: 'On', usage: 5, suggestion: 'Switch to LED' },
        { id: 'AC1', status: 'Off', usage: 20, suggestion: 'Set to 24°C' },
    ]; // Test data
}

export async function connectDevice(deviceId) {
    // Real: apiFetch('/connect-device', { method: 'POST', body: JSON.stringify({ deviceId }) });
    return { id: deviceId, status: 'Connected', usage: 0, suggestion: 'Monitor usage' }; // Mock
}

export async function updateProfile(data) {
    // Real: apiFetch('/update-profile', { method: 'PUT', body: JSON.stringify(data) });
    return { success: true }; // Mock
}


// import { MOCK_DATA, API_BASE_URL } from '../constants';

// // Helper for API calls with error handling
// async function apiFetch(endpoint, options = {}) {
//     const url = `${API_BASE_URL}${endpoint}`;
//     try {
//         const response = await fetch(url, options);
//         if (!response.ok) throw new Error('API error');
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         return null; // Or throw for handling in components
//     }
// }

// // Mock functions for demo; replace with real backend calls
// export async function fetchCarbonData() {
//     // Real: return apiFetch('/carbon-data');
//     return MOCK_DATA;
// }

// export async function sendChatQuery(text) {
//     // Real: 
//     // return apiFetch('/chat', {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify({ query: text }),
//     // });
//     return `Eco-Buddy: Based on "${text}", switch to LED bulbs to save 40 kWh/month 🌳`; // Mock response
// }

// export async function sendVoiceQuery(audioBlob) {
//     // Real:
//     // const formData = new FormData();
//     // formData.append('audio', audioBlob);
//     // return apiFetch('/voice', { method: 'POST', body: formData });
//     return 'Eco-Buddy: Voice query processed - reduce plastic by recycling!'; // Mock
// }

// export async function logActivity(action) {
//     // Real: apiFetch('/log-activity', { method: 'POST', body: JSON.stringify({ action }) });
//     return { success: true, points: 10, newBadge: 'Eco Hero' }; // Mock
// }


// export async function fetchChatHistory() {
//     // Real: apiFetch('/chat-history');
//     return []; // Mock empty
// }

// export async function saveChatHistory(messages) {
//     // Real: apiFetch('/chat-history', { method: 'POST', body: JSON.stringify(messages) });
//     console.log('Saved history:', messages); // Mock
// }

// export async function fetchGamificationData() {
//     // Real: apiFetch('/gamification');
//     return { points: 150, badges: ['Beginner', 'Eco Hero'], history: ['Logged LED switch', 'Reduced water'] }; // Mock
// }

// export async function loginUser(credentials) {
//     // Real: apiFetch('/login', { method: 'POST', body: JSON.stringify(credentials) });
//     return { success: true }; // Mock
// }

// export async function signupUser(credentials) {
//     // Real: apiFetch('/signup', { method: 'POST', body: JSON.stringify(credentials) });
//     return { success: true }; // Mock
// }

// export async function logoutUser() {
//     // Real: apiFetch('/logout', { method: 'POST' });
//     return { success: true }; // Mock
// }

// export async function fetchDeviceData() {
//     // Real: apiFetch('/devices');
//     return [
//         { id: 'Light1', status: 'On', usage: 5, suggestion: 'Switch to LED' },
//         { id: 'AC1', status: 'Off', usage: 20, suggestion: 'Set to 24°C' },
//     ]; // Test data
// }

// export async function connectDevice(deviceId) {
//     // Real: apiFetch('/connect-device', { method: 'POST', body: JSON.stringify({ deviceId }) });
//     return { id: deviceId, status: 'Connected', usage: 0, suggestion: 'Monitor usage' }; // Mock
// }

// export async function updateProfile(data) {
//     // Real: apiFetch('/update-profile', { method: 'PUT', body: JSON.stringify(data) });
//     return { success: true }; // Mock
// }