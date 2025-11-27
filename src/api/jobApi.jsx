// MockAPI URL
const API_URL = 'https://6927655db35b4ffc5011d54a.mockapi.io/jobRoles';

// Function to fetch job roles from MockAPI
export const fetchJobRoles = async () => {
  try {
    console.log('📡 Fetching job roles from MockAPI...');
    
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Job roles fetched successfully:', data);
    
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching job roles:', error);
    throw new Error('Failed to fetch job roles. Please try again.');
  }
};