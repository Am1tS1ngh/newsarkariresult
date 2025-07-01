import latestUpdates from '../data/latest-updates.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const fetchLatestUpdates = async () => {
  // This can be updated later to fetch from an API
  return latestUpdates;
};

export const fetchJobs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'getAllRecords', payload: {} }),
      cache: 'no-store', // Ensure fresh data
    });
    if (!response.ok) {
      throw new Error('Failed to fetch records');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : data.records || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return []; // Return empty array on error
  }
};

export const fetchJobById = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'getRecordDetails',
        payload: { title_slug: slug },
      }),
      cache: 'no-store', // Ensure fresh data for slug pages
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch job details for slug: ${slug}`);
    }
    
    const job = await response.json();
    return job;
  } catch (error) {
    console.error(`Error fetching job by slug ${slug}:`, error);
    return null; // Return null on error
  }
};