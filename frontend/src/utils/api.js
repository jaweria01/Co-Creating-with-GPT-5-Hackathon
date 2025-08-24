import { MOCK_DATA } from '../constants';

// Helper for API calls with error handling
const API_BASE_URL = "https://ae163ea1e651.ngrok-free.app"; // no trailing slash!

async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log("➡️ Fetching:", url);

  try {
    const isFormData = options.body instanceof FormData;

    const res = await fetch(url, {
      method: options.method || "GET",
      headers: isFormData
        ? options.headers || {} // agar FormData hai to Content-Type browser set karega
        : {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
      body: options.body ? (isFormData ? options.body : JSON.stringify(options.body)) : null,
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error("❌ Expected JSON but got:", text.slice(0, 200));
      throw new Error(`Invalid JSON response. Content type: ${contentType}`);
    }

    return await res.json();
  } catch (err) {
    console.error("apiFetch error:", err);
    return null;
  }
}



// Mock functions for demo; replace with real backend calls
export async function fetchCarbonData() {
    // Real: return apiFetch('/carbon-data');
    return MOCK_DATA;
}

// voice chatbot 
export async function sendChatQuery(text) {
    try {
        const response = await fetch('https://jawadah1-ecobuddy-chat.hf.space/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),  // Send the user's message
        });

        if (!response.ok) {
            // Handle HTTP errors
            console.error("Error from server:", response.status, response.statusText);
            return 'Eco-Buddy: Unable to get a response from the server';
        }

        const data = await response.json();

        if (data && data.reply) {
            return data.reply;  // Return the reply from the chatbot API
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


// log activity 
export async function logActivity(action) {
    try {
        let userId = localStorage.getItem('username') || 'anonymous';

        const response = await apiFetch('/log-activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userId,
                activity: action,
                points: 0 // let backend calculate points
            })
        });

        if (response) {
            return {
                success: true,
                points: response.points || 0,
                newBadge: response.new_badges?.length ? response.new_badges[0] : '',
                message: response.message || 'Activity logged successfully',
                ...response
            };
        }

        return { success: false, points: 0, newBadge: '', error: 'No response from API' };
    } catch (error) {
        console.error("Error in logActivity:", error);
        return { success: false, points: 0, newBadge: '', error: 'Something went wrong while logging activity' };
    }
}

// leaderboard
// leaderboard
export async function fetchLeaderboard() {
  try {
    const data = await apiFetch('/leaderboard'); // API call

    if (!data || !data.leaderboard) return [];

    // Map API response to frontend-friendly format
    return data.leaderboard.map(u => ({
      name: u.user_id,
      badge: u.badges?.length ? u.badges[u.badges.length - 1] : "",
      score: u.points || 0,
      streak: u.streak || 0,
    }));
  } catch (error) {
    console.error("Error in fetchLeaderboard:", error);
    return [];
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

