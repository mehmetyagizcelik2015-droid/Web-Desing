/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Project, ViewportMode, BlockData } from './types/builder';
import { BlockTemplate } from './data/blockLibrary';
import { TemplatePreset, getDefaultProject } from './data/templates';
import { loadProjectFromStorage, saveProjectToStorage } from './utils/storage';
import { StudioHeader } from './components/StudioHeader';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertyPanel } from './components/PropertyPanel';
import { ExportModal } from './components/ExportModal';
import { TemplatesModal } from './components/TemplatesModal';
import { PreviewMode } from './components/PreviewMode';

export default function App() {
  const [project, setProject] = useState<Project>(() => loadProjectFromStorage());
  const [history, setHistory] = useState<Project[]>([loadProjectFromStorage()]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [zoom, setZoom] = useState<number>(100);
  const [savedTime, setSavedTime] = useState<string>('Şimdi');

  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active page shortcut
  const activePage =
    project.pages.find(p => p.id === project.activePageId) || project.pages[0];

  const selectedBlock =
    activePage?.blocks.find(b => b.id === selectedBlockId) || null;

  // Record history and save project
  const updateProjectWithHistory = useCallback(
    (newProject: Project) => {
      setProject(newProject);

      setHistory(prev => {
        const sliced = prev.slice(0, historyIndex + 1);
        return [...sliced, newProject].slice(-30); // Keep last 30 states
      });
      setHistoryIndex(prev => Math.min(prev + 1, 29));

      // Auto-save debounced
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        saveProjectToStorage(newProject);
        const now = new Date();
        setSavedTime(
          now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        );
      }, 500);
    },
    [historyIndex]
  );

  // Undo / Redo handlers
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const targetState = history[prevIndex];
      setHistoryIndex(prevIndex);
      setProject(targetState);
      saveProjectToStorage(targetState);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const targetState = history[nextIndex];
      setHistoryIndex(nextIndex);
      setProject(targetState);
      saveProjectToStorage(targetState);
    }
  }, [historyIndex, history]);

  // Global Keyboard shortcuts (Undo/Redo/Deselect)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'Escape') {
        setSelectedBlockId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Block manipulation handlers
  const handleAddBlock = (template: BlockTemplate, targetIndex?: number) => {
    const newBlock = template.createDefault();
    const currentBlocks = [...activePage.blocks];

    if (targetIndex !== undefined && targetIndex >= 0 && targetIndex <= currentBlocks.length) {
      currentBlocks.splice(targetIndex, 0, newBlock);
    } else {
      currentBlocks.push(newBlock);
    }

    const updatedPages = project.pages.map(p =>
      p.id === activePage.id ? { ...p, blocks: currentBlocks } : p
    );

    updateProjectWithHistory({ ...project, pages: updatedPages });
    setSelectedBlockId(newBlock.id);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= activePage.blocks.length) return;

    const currentBlocks = [...activePage.blocks];
    const [moved] = currentBlocks.splice(index, 1);
    currentBlocks.splice(targetIndex, 0, moved);

    const updatedPages = project.pages.map(p =>
      p.id === activePage.id ? { ...p, blocks: currentBlocks } : p
    );

    updateProjectWithHistory({ ...project, pages: updatedPages });
  };

  const handleReorderBlocks = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const currentBlocks = [...activePage.blocks];
    const [moved] = currentBlocks.splice(fromIndex, 1);
    currentBlocks.splice(toIndex, 0, moved);

    const updatedPages = project.pages.map(p =>
      p.id === activePage.id ? { ...p, blocks: currentBlocks } : p
    );

    updateProjectWithHistory({ ...project, pages: updatedPages });
  };

  const handleDuplicateBlock = (index: number) => {
    const sourceBlock = activePage.blocks[index];
    const duplicated: BlockData = {
      ...JSON.parse(JSON.stringify(sourceBlock)),
      id: 'block_' + Math.random().toString(36).substring(2, 9)
    };

    const currentBlocks = [...activePage.blocks];
    currentBlocks.splice(index + 1, 0, duplicated);

    const updatedPages = project.pages.map(p =>
      p.id === activePage.id ? { ...p, blocks: currentBlocks } : p
    );

    updateProjectWithHistory({ ...project, pages: updatedPages });
    setSelectedBlockId(duplicated.id);
  };

  const handleDeleteBlock = (index: number) => {
    const blockToDelete = activePage.blocks[index];
    const currentBlocks = activePage.blocks.filter((_, idx) => idx !== index);

    const updatedPages = project.pages.map(p =>
      p.id === activePage.id ? { ...p, blocks: currentBlocks } : p
    );

    if (selectedBlockId === blockToDelete.id) {
      setSelectedBlockId(null);
    }

    updateProjectWithHistory({ ...project, pages: updatedPages });
  };

  const handleUpdateBlock = (index: number, updated: BlockData) => {
    const currentBlocks = [...activePage.blocks];
    currentBlocks[index] = updated;

    const updatedPages = project.pages.map(p =>
      p.id === activePage.id ? { ...p, blocks: currentBlocks } : p
    );

    updateProjectWithHistory({ ...project, pages: updatedPages });
  };

  const handleUpdateSelectedBlock = (updated: BlockData) => {
    const index = activePage.blocks.findIndex(b => b.id === updated.id);
    if (index !== -1) {
      handleUpdateBlock(index, updated);
    }
  };

  // Page handlers
  const handleSelectPage = (pageId: string) => {
    setSelectedBlockId(null);
    setProject(prev => ({ ...prev, activePageId: pageId }));
  };

  const handleAddPage = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'yeni-sayfa';

    const newPage = {
      id: 'page_' + Math.random().toString(36).substring(2, 8),
      name,
      slug,
      blocks: [
        activePage.blocks.find(b => b.type === 'header') || {
          id: 'block_nav_' + Math.random().toString(36).substring(2, 8),
          type: 'header' as const,
          brandName: project.settings.siteName,
          title: project.settings.siteName,
          styles: { backgroundColor: '#0F172A', textColor: '#FFFFFF' }
        },
        activePage.blocks.find(b => b.type === 'footer') || {
          id: 'block_ftr_' + Math.random().toString(36).substring(2, 8),
          type: 'footer' as const,
          brandName: project.settings.siteName,
          title: project.settings.siteName,
          content: 'Tüm hakları saklıdır.',
          styles: { backgroundColor: '#090D16', textColor: '#94A3B8' }
        }
      ]
    };

    const newProject = {
      ...project,
      pages: [...project.pages, newPage],
      activePageId: newPage.id
    };

    updateProjectWithHistory(newProject);
  };

  const handleDeletePage = (pageId: string) => {
    if (project.pages.length <= 1) return;
    const remaining = project.pages.filter(p => p.id !== pageId);
    const newActiveId = remaining[0].id;

    updateProjectWithHistory({
      ...project,
      pages: remaining,
      activePageId: newActiveId
    });
  };

  // Site Settings
  const handleUpdateSettings = (settings: Project['settings']) => {
    updateProjectWithHistory({ ...project, settings });
  };

  // Template Loader
  const handleSelectTemplate = (template: TemplatePreset) => {
    const newBlocks = template.createBlocks();
    const updatedPages = project.pages.map(p =>
      p.id === activePage.id ? { ...p, blocks: newBlocks } : p
    );

    updateProjectWithHistory({ ...project, pages: updatedPages });
    setSelectedBlockId(null);
  };

  // Project Import
  const handleImportProject = (imported: Project) => {
    updateProjectWithHistory(imported);
    setSelectedBlockId(null);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans">
      {/* Top Header */}
      <StudioHeader
        project={project}
        viewport={viewport}
        setViewport={setViewport}
        zoom={zoom}
        setZoom={setZoom}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onOpenTemplates={() => setIsTemplatesModalOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onTogglePreview={() => setIsPreviewMode(true)}
        onSelectPage={handleSelectPage}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
        savedTime={savedTime}
      />

      {/* Main Studio Body: Left Sidebar + Central Interactive Canvas + Right Property Panel */}
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar
          project={project}
          selectedBlockId={selectedBlockId}
          onSelectBlock={id => setSelectedBlockId(id)}
          onAddBlock={template => handleAddBlock(template)}
          onMoveBlock={handleMoveBlock}
          onDuplicateBlock={handleDuplicateBlock}
          onDeleteBlock={handleDeleteBlock}
          onUpdateSettings={handleUpdateSettings}
          onSelectPage={handleSelectPage}
          onAddPage={handleAddPage}
          onDeletePage={handleDeletePage}
        />

        <Canvas
          blocks={activePage?.blocks || []}
          selectedBlockId={selectedBlockId}
          viewport={viewport}
          zoom={zoom}
          onSelectBlock={id => setSelectedBlockId(id)}
          onMoveBlock={handleMoveBlock}
          onDuplicateBlock={handleDuplicateBlock}
          onDeleteBlock={handleDeleteBlock}
          onUpdateBlock={handleUpdateBlock}
          onAddBlockAtIndex={(template, index) => handleAddBlock(template, index)}
          onReorderBlocks={handleReorderBlocks}
          onOpenTemplates={() => setIsTemplatesModalOpen(true)}
        />

        {selectedBlock && (
          <PropertyPanel
            block={selectedBlock}
            onUpdate={handleUpdateSelectedBlock}
            onClose={() => setSelectedBlockId(null)}
          />
        )}
      </div>

      {/* Fullscreen Live Preview Mode */}
      {isPreviewMode && (
        <PreviewMode
          project={project}
          onExitPreview={() => setIsPreviewMode(false)}
          onOpenExport={() => setIsExportModalOpen(true)}
        />
      )}

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Export & Code Download Modal */}
      <ExportModal
        project={project}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onImportProject={handleImportProject}
      />
    </div>
  );
}
