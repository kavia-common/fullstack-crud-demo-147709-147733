import axios from "axios";

// API base (adjust as necessary; assumes frontend and backend are on correct CORS domains/ports)
const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// PUBLIC_INTERFACE
export interface Item {
  _id?: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

// PUBLIC_INTERFACE
export async function getItems(): Promise<Item[]> {
  const resp = await axios.get(`${API_BASE}/items`);
  return resp.data;
}

// PUBLIC_INTERFACE
export async function getItem(id: string): Promise<Item> {
  const resp = await axios.get(`${API_BASE}/items/${id}`);
  return resp.data;
}

// PUBLIC_INTERFACE
export async function createItem(item: { name: string; description: string }): Promise<Item> {
  const resp = await axios.post(`${API_BASE}/items`, item);
  return resp.data;
}

// PUBLIC_INTERFACE
export async function updateItem(id: string, item: { name: string; description: string }): Promise<Item> {
  const resp = await axios.put(`${API_BASE}/items/${id}`, item);
  return resp.data;
}

// PUBLIC_INTERFACE
export async function deleteItem(id: string): Promise<void> {
  await axios.delete(`${API_BASE}/items/${id}`);
}
