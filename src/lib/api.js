import latestUpdates from '../data/latest-updates.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const API_ENDPOINT = `${API_BASE_URL}/api/records`;

export const fetchLatestUpdates = async () => {
  // This can be updated later to fetch from an API
  return latestUpdates;
};



async function apiRequest(action, payload) {
    try {
        console.log(`Executing API request for action: ${action}`, payload);
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action,
                payload,
                srvc: 'web-client'
            }),
            cache: 'no-store',
        });

        const result = await response.json();
        
        if (!response.ok || !result.stat) {
            const errorDetails = result.data ? JSON.stringify(result.data) : (result.message || response.statusText);
            console.error(`API Error for action '${action}':`, errorDetails);
            // Propagate a more informative error message
            throw new Error(`API request failed for ${action}: ${errorDetails}`);
        }
        
        return result.data;

    } catch (error) {
        console.error(`Failed to execute API request for action '${action}':`, error);
        // Re-throw the error to be caught by the calling function
        throw error;
    }
}

export const fetchRecords = async ({ searchTerm = '', index = 1, items = 25 }) => {
  const data = await apiRequest('getAllRecords', { searchTerm, index, items });
    console.log(`Fetched records with searchTerm "${searchTerm}" at index ${index}`, data);
  // The response now contains the list and pagination info.
  // We return the whole data object for the client to handle, with a fallback.
  return data?.data || {list: [], count: 0, index: 1, items: 25};
};

export const fetchCategoryRecords = async ({ category, searchTerm = '', index = 1, items = 20 }) => {
  const data = await apiRequest('getCategoryRecords', { category, searchTerm, index, items });
  console.log(`Fetched category records for ${category} with searchTerm "${searchTerm}"`, data);
  return data?.data || {list: [], count: 0, index: 1, items: 25};
};

export const fetchRecordById = async (slug) => {
  return await apiRequest('getRecordDetails', { title_slug: slug });
};

export const addRecord = async (record) => {
    // The calling function (handleFormSubmit) will now catch the detailed error
    return await apiRequest('addRecord', { record });
};

export const updateRecord = async (unique_id, updateData) => {
    return await apiRequest('updateRecord', { unique_id, updateData });
};

export const deleteRecord = async (unique_id) => {
    const result = await apiRequest('deleteRecord', { unique_id });
    // deleteRecord might not return data, so we check the top-level result
    return result;
};