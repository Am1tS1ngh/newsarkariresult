import latestUpdates from '../data/latest-updates.json';
import jobs from '../data/jobs.json';

// Uncomment the lines below when the backend is ready
// import axios from 'axios';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const fetchLatestUpdates = async () => {
  // const response = await axios.get(`${API_BASE_URL}/latest-updates`);
  // return response.data;
  return latestUpdates;
};

export const fetchJobs = async () => {
  // const response = await axios.get(`${API_BASE_URL}/jobs`);
  // return response.data;
  return jobs;
};

export const fetchJobById = async (id) => {
  // const response = await axios.get(`${API_BASE_URL}/jobs`);
  // return response.data;
  const job = jobs.find((job) => job.id === Number(id));
  return job || null;
};