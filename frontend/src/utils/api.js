import { MOCK_DATA, API_BASE_URL } from '../constants';

// Helper for API calls with error handling
async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;  // Use the API_BASE_URL from constants
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // Try to get error details from response
            let errorDetails = 'API error';
            try {
                const errorData = await response.json();
                errorDetails = JSON.stringify(errorData, null, 2);
            } catch (e) {
                errorDetails = `API error: ${response.status} ${response.statusText}`;
            }
            throw new Error(`API request failed: ${errorDetails}`);
        }
        return await response.json();  // Return the JSON data if the request is successful
    } catch (error) {
        console.error(error);
        return null;  // Return null if there's an error
    }
}

// Mock functions for demo; replace with real backend calls
export async function fetchCarbonData() {
    // Real: return apiFetch('/carbon-data');
    return MOCK_DATA;
}

export async function sendChatQuery(text) {
    try {
        const response = await apiFetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),  // Send the user's message
        });

        if (response && response.reply) {
            return response.reply;  // Return the reply from the chatbot API
        }

        return 'Eco-Buddy: Unable to get a response from the server';  // Fallback message
    } catch (error) {
        console.error("Error in sendChatQuery:", error);
        return 'Eco-Buddy: Something went wrong. Please try again later.';  // Better error message
    }
}


export async function sendVoiceQuery(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob);  // Attach the audio file in the form data

    try {
        const response = await apiFetch('/voice', {
            method: 'POST',
            body: formData,  // Sending the audio file
        });

        if (response && response.reply) {
            return response.reply;  // Return the bot's response
        }

        return 'Eco-Buddy: Unable to process the voice query';  // Fallback message
    } catch (error) {
        console.error("Error in sendVoiceQuery:", error);
        return 'Eco-Buddy: Something went wrong with the voice processing.';  // Better error message
    }
}



export async function logActivity(action) {
    try {
        // Get user ID from localStorage (from auth system)
        // In the mock auth system, we use username as user identifier
        let userId = localStorage.getItem('username') || 'anonymous';
        
        // If no username, generate a simple ID
        if (!userId) {
            userId = 'user_' + Date.now(); // Simple ID based on timestamp
        }
        
        const response = await apiFetch('/log-activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userId,
                activity: action,
                points: 0  // Default to 0 points, let the backend calculate
            })
        });
        
        // If we get a response from the API, use it
        if (response) {
            // Transform the API response to match what Dashboard.jsx expects
            return {
                success: true,
                points: response.points || 0,
                newBadge: response.new_badges && response.new_badges.length > 0 ? response.new_badges[0] : '',
                message: response.message || 'Activity logged successfully',
                ...response // Include any other properties from the API response
            };
        }
        
        // Fallback response if API doesn't return data
        return { success: true, points: 10, newBadge: 'Eco Hero' };
    } catch (error) {
        console.error("Error in logActivity:", error);
        // Return fallback response in case of error to maintain UI functionality
        return { success: false, points: 0, newBadge: '', error: 'Something went wrong while logging activity' };
    }
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
    try {
        // Get leaderboard data from the API
        const response = await apiFetch('/leaderboard');
        
        // If we get a response, transform it to match the expected format
        if (response) {
            // Transform the leaderboard response to match the expected structure
            // This will depend on the actual API response format
            return {
                points: response.points || response.user_points || 0,
                badges: response.badges || response.user_badges || [],
                history: response.history || response.user_history || [],
                leaderboard: response.leaderboard || response.users || response,
                ...response // Include any other properties from the API response
            };
        }
        
        // Fallback if API doesn't return data
        return { points: 0, badges: [], history: [], leaderboard: [] };
    } catch (error) {
        console.error("Error in fetchGamificationData:", error);
        // Return fallback data in case of error
        return { points: 0, badges: [], history: [], leaderboard: [] };
    }
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

