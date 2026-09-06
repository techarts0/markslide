import type { ExplorerData, FolderItem, SlideDoc } from '../types/explorer';

export function findSlideInTree(data: ExplorerData, slideId: string): SlideDoc | null {
  const rootSlide = data.slides.find((s) => s.id === slideId);
  if (rootSlide) return rootSlide;

  function searchFolders(folders: FolderItem[]): SlideDoc | null {
    for (const folder of folders) {
      const found = folder.slides.find((s) => s.id === slideId);
      if (found) return found;
      const subFound = searchFolders(folder.folders);
      if (subFound) return subFound;
    }
    return null;
  }

  return searchFolders(data.folders);
}

export function updateSlideInTree(
  data: ExplorerData,
  slideId: string,
  content: string,
  title?: string
): ExplorerData {
  return {
    ...data,
    slides: data.slides.map((s) =>
      s.id === slideId ? { ...s, content, title: title || s.title, updatedAt: Date.now() } : s
    ),
    folders: updateFolders(data.folders),
  };

  function updateFolders(folders: FolderItem[]): FolderItem[] {
    return folders.map((f) => ({
      ...f,
      slides: f.slides.map((s) =>
        s.id === slideId ? { ...s, content, title: title || s.title, updatedAt: Date.now() } : s
      ),
      folders: updateFolders(f.folders),
    }));
  }
}

export function addSlideToTree(
  data: ExplorerData,
  slide: SlideDoc,
  folderId?: string
): ExplorerData {
  if (!folderId) {
    return { ...data, slides: [slide, ...data.slides] };
  }

  return {
    ...data,
    folders: insertIntoFolders(data.folders),
  };

  function insertIntoFolders(folders: FolderItem[]): FolderItem[] {
    return folders.map((f) => {
      if (f.id === folderId) {
        return { ...f, isOpen: true, slides: [slide, ...f.slides] };
      }
      return { ...f, folders: insertIntoFolders(f.folders) };
    });
  }
}

export function addFolderToTree(
  data: ExplorerData,
  newFolder: FolderItem,
  parentFolderId?: string
): ExplorerData {
  if (!parentFolderId) {
    return { ...data, folders: [...data.folders, newFolder] };
  }

  return {
    ...data,
    folders: insertIntoFolders(data.folders),
  };

  function insertIntoFolders(folders: FolderItem[]): FolderItem[] {
    return folders.map((f) => {
      if (f.id === parentFolderId) {
        return { ...f, isOpen: true, folders: [...f.folders, newFolder] };
      }
      return { ...f, folders: insertIntoFolders(f.folders) };
    });
  }
}

export function deleteSlideFromTree(data: ExplorerData, slideId: string): ExplorerData {
  return {
    ...data,
    slides: data.slides.filter((s) => s.id !== slideId),
    folders: filterFolders(data.folders),
  };

  function filterFolders(folders: FolderItem[]): FolderItem[] {
    return folders.map((f) => ({
      ...f,
      slides: f.slides.filter((s) => s.id !== slideId),
      folders: filterFolders(f.folders),
    }));
  }
}

export function deleteFolderFromTree(data: ExplorerData, folderId: string): ExplorerData {
  return {
    ...data,
    folders: filterFolders(data.folders),
  };

  function filterFolders(folders: FolderItem[]): FolderItem[] {
    return folders
      .filter((f) => f.id !== folderId)
      .map((f) => ({
        ...f,
        folders: filterFolders(f.folders),
      }));
  }
}

export function renameSlideInTree(
  data: ExplorerData,
  slideId: string,
  newTitle: string
): ExplorerData {
  return {
    ...data,
    slides: data.slides.map((s) => (s.id === slideId ? { ...s, title: newTitle } : s)),
    folders: updateFolders(data.folders),
  };

  function updateFolders(folders: FolderItem[]): FolderItem[] {
    return folders.map((f) => ({
      ...f,
      slides: f.slides.map((s) => (s.id === slideId ? { ...s, title: newTitle } : s)),
      folders: updateFolders(f.folders),
    }));
  }
}

export function renameFolderInTree(
  data: ExplorerData,
  folderId: string,
  newName: string
): ExplorerData {
  return {
    ...data,
    folders: updateFolders(data.folders),
  };

  function updateFolders(folders: FolderItem[]): FolderItem[] {
    return folders.map((f) => {
      if (f.id === folderId) {
        return { ...f, name: newName };
      }
      return { ...f, folders: updateFolders(f.folders) };
    });
  }
}

export function toggleFolderInTree(data: ExplorerData, folderId: string): ExplorerData {
  return {
    ...data,
    folders: updateFolders(data.folders),
  };

  function updateFolders(folders: FolderItem[]): FolderItem[] {
    return folders.map((f) => {
      if (f.id === folderId) {
        return { ...f, isOpen: !f.isOpen };
      }
      return { ...f, folders: updateFolders(f.folders) };
    });
  }
}
