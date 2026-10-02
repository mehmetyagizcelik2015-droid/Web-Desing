import React, { useState } from 'react';
import { Plus, Sparkles, Move } from 'lucide-react';
import { BlockData, ViewportMode } from '../types/builder';
import { BLOCK_LIBRARY, BlockTemplate } from '../data/blockLibrary';
import { CanvasBlock } from './CanvasBlock';

interface CanvasProps {
  blocks: BlockData[];
  selectedBlockId: string | null;
  viewport: ViewportMode;
  zoom: number;
  onSelectBlock: (id: string | null) => void;
  onMoveBlock: (index: number, direction: 'up' | 'down') => void;
  onDuplicateBlock: (index: number) => void;
  onDeleteBlock: (index: number) => void;
  onUpdateBlock: (index: number, updated: BlockData) => void;
  onAddBlockAtIndex: (template: BlockTemplate, targetIndex: number) => void;
  onReorderBlocks: (fromIndex: number, toIndex: number) => void;
  onOpenTemplates: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  blocks,
  selectedBlockId,
  viewport,
  zoom,
  onSelectBlock,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onUpdateBlock,
  onAddBlockAtIndex,
  onReorderBlocks,
  onOpenTemplates
}) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<'before' | 'after' | null>(null);
  const [isDraggingOverBottom, setIsDraggingOverBottom] = useState(false);

  // Viewport width styling
  const getViewportWidth = () => {
    switch (viewport) {
      case 'tablet':
        return 'w-[768px] min-h-[900px] shadow-2xl border-x border-neutral-800 rounded-t-2xl my-6';
      case 'mobile':
        return 'w-[375px] min-h-[750px] shadow-2xl border-x border-neutral-800 rounded-t-3xl my-6';
      default:
        return 'w-full max-w-[1400px] min-h-[900px] my-6 shadow-2xl border border-neutral-800/80 rounded-xl';
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const position = e.clientY < midY ? 'before' : 'after';
    setDragOverIndex(index);
    setDragOverPosition(position);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const rawData = e.dataTransfer.getData('application/json');
      if (rawData) {
        const payload = JSON.parse(rawData);

        // Dropped from sidebar
        if (payload.source === 'sidebar' && payload.templateIndex !== undefined) {
          const template = BLOCK_LIBRARY[payload.templateIndex];
          if (template) {
            const insertionIndex = dragOverPosition === 'after' ? targetIndex + 1 : targetIndex;
            onAddBlockAtIndex(template, insertionIndex);
          }
        }

        // Reordered on canvas
        if (payload.source === 'canvas' && payload.draggedIndex !== undefined) {
          const fromIndex = payload.draggedIndex;
          let toIndex = dragOverPosition === 'after' ? targetIndex : targetIndex - 1;
          if (toIndex < 0) toIndex = 0;
          onReorderBlocks(fromIndex, toIndex);
        }
      }
    } catch (err) {
      console.error('Error handling drop:', err);
    } finally {
      setDragOverIndex(null);
      setDragOverPosition(null);
      setIsDraggingOverBottom(false);
    }
  };

  const handleCanvasDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        source: 'canvas',
        draggedIndex: index
      })
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleBottomDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const rawData = e.dataTransfer.getData('application/json');
      if (rawData) {
        const payload = JSON.parse(rawData);
        if (payload.source === 'sidebar' && payload.templateIndex !== undefined) {
          const template = BLOCK_LIBRARY[payload.templateIndex];
          if (template) {
            onAddBlockAtIndex(template, blocks.length);
          }
        }
      }
    } catch (err) {
      console.error('Error on bottom drop:', err);
    } finally {
      setIsDraggingOverBottom(false);
    }
  };

  return (
    <main
      className="flex-1 overflow-auto bg-neutral-900/90 relative flex flex-col items-center justify-start p-4 cursor-default select-none"
      onClick={() => onSelectBlock(null)}
      style={{
        backgroundImage: 'radial-gradient(circle, #33415525 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Scaled Device Container */}
      <div
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out, width 0.2s ease-out'
        }}
        className={`transition-all duration-200 flex flex-col ${getViewportWidth()}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Device frame header if mobile or tablet */}
        {viewport !== 'desktop' && (
          <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-neutral-400 text-[11px] rounded-t-2xl font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              {viewport === 'mobile' ? 'iPhone (375px)' : 'iPad (768px)'}
            </span>
            <span>WebStudio Önizleme</span>
          </div>
        )}

        {/* Empty state when no blocks */}
        {blocks.length === 0 ? (
          <div className="py-24 px-8 text-center bg-neutral-950 border border-neutral-800 rounded-xl my-auto flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <Move className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sayfanız Henüz Boş</h3>
            <p className="text-sm text-neutral-400 max-w-md mb-6 leading-relaxed">
              Sol menüdeki "Bloklar" sekmesinden bileşenleri sürükleyip buraya bırakın veya hazır bir
              şablon yükleyerek hızlıca başlayın.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenTemplates}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Hazır Şablon Yükle
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col overflow-hidden rounded-b-xl bg-neutral-950">
            {blocks.map((block, index) => (
              <CanvasBlock
                key={block.id}
                block={block}
                index={index}
                totalBlocks={blocks.length}
                isSelected={selectedBlockId === block.id}
                onSelect={() => onSelectBlock(block.id)}
                onMoveUp={() => onMoveBlock(index, 'up')}
                onMoveDown={() => onMoveBlock(index, 'down')}
                onDuplicate={() => onDuplicateBlock(index)}
                onDelete={() => onDeleteBlock(index)}
                onUpdateBlock={updated => onUpdateBlock(index, updated)}
                isDragOver={dragOverIndex === index}
                dragOverPosition={dragOverIndex === index ? dragOverPosition : null}
                onDragStart={e => handleCanvasDragStart(e, index)}
                onDragOver={e => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={e => handleDrop(e, index)}
              />
            ))}

            {/* Bottom Drop Zone / Add Block Indicator */}
            <div
              onDragOver={e => {
                e.preventDefault();
                setIsDraggingOverBottom(true);
              }}
              onDragLeave={() => setIsDraggingOverBottom(false)}
              onDrop={handleBottomDrop}
              className={`p-6 border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-1.5 ${
                isDraggingOverBottom
                  ? 'border-blue-500 bg-blue-500/10 text-blue-300 scale-[1.01]'
                  : 'border-neutral-800/80 hover:border-neutral-700 bg-neutral-950/80 text-neutral-400'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span className="text-xs font-medium">
                Yeni blok eklemek için buraya sürükleyin veya sol menüden seçin
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
