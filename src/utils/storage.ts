import { Project } from '../types/builder';
import { getDefaultProject } from '../data/templates';

const STORAGE_KEY = 'webstudio_active_project';

export const loadProjectFromStorage = (): Project => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load project from localStorage:', err);
  }
  return getDefaultProject();
};

export const saveProjectToStorage = (project: Project): void => {
  try {
    const toSave = { ...project, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error('Failed to save project to localStorage:', err);
  }
};

export const downloadFile = (filename: string, content: string, mimeType: string = 'text/html') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
