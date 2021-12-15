import type { CreateMenuItemDTO } from "./dtos/MenuDTOs";
import type { CreateTileDTO, TileDTO } from "./dtos/TileDTOs";

export const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const getAllMenus = async () => {
  return httpGet(`${base}/menu`).then(res => res.json());
}

export const getMenuItem = async (url: string) => {
  return httpGet(`${base}/menu${url}`).then(res => res.json());
}

export const createNewMenuItem = async (dto: CreateMenuItemDTO, url: string) => {
  return httpPost(`${base}/menu${url}`, dto).then(res => res.json())
}

export const deleteMenuItem = async (url: string) => {
  return httpDelete(`${base}/menu${url}`);
}

export const getTiles = async (url: string) => {
  return httpGet(`${base}/tile${url}`).then(res => res.json());
}

export const createTile = async (url: string, dto: CreateTileDTO) => {
  return httpPost(`${base}/tile${url}`, dto)
}

export const updateTile = async (id: string, dto: TileDTO) => {
  return httpPut(`${base}/tile/${id}`, dto).then(res => res.json());
}

export const deleteTile = async (id: string) => {
  return httpDelete(`${base}/tile/${id}`)
}

function httpGet(url: string) {
  return fetch(url);
}

function httpPost(url: string, body: any) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
}

function httpPut(url: string, body: any) {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
};

function httpDelete(url: string) {
  return fetch(url, { method: 'delete' })
}