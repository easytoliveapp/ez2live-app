import config from '@/config/config';

const { API_URL } = config;

const POST = async (path: string, data: any, authorization?: string) => {
  const API_ENDPOINT = `${API_URL}${path}`;

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization ?? ''}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const DELETE = async (path: string, authorization?: string) => {
  const API_ENDPOINT = `${API_URL}${path}`;

  const response = await fetch(API_ENDPOINT, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization ?? ''}`,
    },
  });
  return response.json();
};

const GET = async (path: string, authorization?: string) => {
  const API_ENDPOINT = `${API_URL}${path}`;

  const response = await fetch(API_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization ?? ''}`,
    },
  });
  return response.json();
};

const PUT = async (path: string, data: any, authorization?: string) => {
  const API_ENDPOINT = `${API_URL}${path}`;

  const response = await fetch(API_ENDPOINT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization ?? ''}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const PATCH = async (path: string, data: any, authorization?: string) => {
  const API_ENDPOINT = `${API_URL}${path}`;

  const response = await fetch(API_ENDPOINT, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization ?? ''}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default {
  POST,
  DELETE,
  GET,
  PUT,
  PATCH,
};
