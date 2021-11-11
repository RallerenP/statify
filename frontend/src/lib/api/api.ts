import type { StatTileDTO, UpdateTileDTO } from './dtos/TileDTOs';
import type { CreateMenuItemDTO } from "./dtos/MenuDTOs";

const base = "http://localhost:3000";

export const getAllMenus = async () => {
  return fetch(`${base}/menu`).then(res => res.json());
}

export const getMenuItem = async (url: string) => {
  return fetch(`${base}/menu${url}`).then(res => res.json());
}

export const createNewMenuItem = async (dto: CreateMenuItemDTO, url: string) => {
  return fetch(`${base}/menu${url}`, {
    method: 'POST',
    body: JSON.stringify(dto),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())
}

export const deleteMenuItem = async (url: string) => {
  return fetch(`${base}/menu${url}`, { method: 'DELETE' });
}

export const getTiles = async (url: string) => {
  return fetch(`${base}/tile${url}`).then(res => res.json());
}

export const updateTile = async (id: string, dto: UpdateTileDTO) => {
  return fetch(`${base}/tile/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}

export const deleteTile = async (id: string) => {
  return fetch(`${base}/tile/${id}`, {
    method: 'DELETE'
  })
}

export const updateStat = async (id: string, dto: Partial<StatTileDTO>) => {
  return fetch(`${base}/tile/stat/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}