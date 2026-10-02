import React from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Eye,
  Download,
  LayoutGrid,
  Sparkles,
  Plus,
  Trash2,
  Check,
  ZoomIn,
  ZoomOut,
  Layers,
  ChevronDown
} from 'lucide-react';
import { ViewportMode, Project, Page } from '../types/builder';

interface StudioHeaderProps {
  project: Project;
  viewport: ViewportMode;
  setViewport: (v: ViewportMode) => void;
  zoom: number;
  setZoom: (z: number) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  onTogglePreview: () => void;
  onSelectPage: (pageId: string) => void;
  onAddPage: (name: string) => void;
  onDeletePage: (pageId: string) => void;
  savedTime: string;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  project,
  viewport,
  setViewport,
  zoom,
  setZoom,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenTemplates,
  onOpenExport,
  onTogglePreview,
  onSelectPage,
  onAddPage,
  onDeletePage,
  savedTime
}) => {
  const [pageDropdownOpen, setPageDropdownOpen] = React.useState(false);
  const [newPageName, setNewPageName] = React.useState('');
  const [isAddingPage, setIsAddingPage] = React.useState(false);

  const activePage = project.pages.find(p => p.id === project.activePageId) || project.pages[0];

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPageName.trim()) {
      onAddPage(newPageName.trim());
      setNewPageName('');
      setIsAddingPage(false);
      setPageDropdownOpen(false);
    }
  };

  return (
    <header className="h-14 border-b border-neutral-800 bg-neutral-950 px-4 flex items-center justify-between z-30 select-none">
      {/* Zone 1: Brand & Page Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-black text-sm tracking-tighter">
            WS
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white block leading-none">
              WebStudio
            </span>
            <span className="text-[10px] text-neutral-400 font-mono tracking-wider">
              TASARIMCI v2.5
            </span>
          </div>
        </div>

        <div className="h-4 w-px bg-neutral-800" />

        {/* Page Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setPageDropdownOpen(!pageDropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-neutral-800/80 text-xs font-medium text-neutral-200 transition-colors border border-neutral-800"
          >
            <span className="text-neutral-400">Sayfa:</span>
            <span className="text-white font-semibold">{activePage?.name || 'Ana Sayfa'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {pageDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-60 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-2 z-50">
              <div className="text-[11px] font-semibold text-neutral-400 px-2 py-1 uppercase tracking-wider">
                Sayfalar
              </div>
              <div className="space-y-1 my-1 max-h-48 overflow-y-auto">
                {project.pages.map(page => (
                  <div
                    key={page.id}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                      page.id === project.activePageId
                        ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                        : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                    onClick={() => {
                      onSelectPage(page.id);
                      setPageDropdownOpen(false);
                    }}
                  >
                    <span className="truncate">{page.name}</span>
                    {project.pages.length > 1 && page.id === project.activePageId && (
                      <button
                        title="Sayfayı Sil"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`"${page.name}" sayfasını silmek istediğinize emin misiniz?`)) {
                            onDeletePage(page.id);
                          }
                        }}
                        className="p-1 hover:text-red-400 text-neutral-500 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isAddingPage ? (
                <form onSubmit={handleCreatePage} className="mt-2 pt-2 border-t border-neutral-800 flex gap-1.5">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Sayfa Adı (örn: Hizmetler)"
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                    className="flex-1 px-2.5 py-1 text-xs bg-neutral-950 border border-neutral-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded"
                  >
                    Ekle
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsAddingPage(true)}
                  className="w-full mt-2 pt-2 border-t border-neutral-800 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Yeni Sayfa Ekle
                </button>
              )}
            </div>
          )}
        </div>

        {/* Saved status */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-neutral-400">
          <Check className="w-3 h-3 text-emerald-400" />
          <span>Kayıt: {savedTime}</span>
        </div>
      </div>

      {/* Zone 2: Viewport Switcher & Zoom */}
      <div className="flex items-center gap-3">
        {/* Device Switcher */}
        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 shadow-inner">
          <button
            title="Masaüstü Görünümü (1200px)"
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewport === 'desktop'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Masaüstü</span>
          </button>
          <button
            title="Tablet Görünümü (768px)"
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewport === 'tablet'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Tablet</span>
          </button>
          <button
            title="Mobil Görünümü (375px)"
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewport === 'mobile'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Mobil</span>
          </button>
        </div>

        {/* Undo / Redo */}
        <div className="hidden md:flex items-center gap-1">
          <button
            title="Geri Al (Ctrl+Z)"
            disabled={!canUndo}
            onClick={onUndo}
            className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            title="İleri Al (Ctrl+Y)"
            disabled={!canRedo}
            onClick={onRedo}
            className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="hidden xl:flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1 text-[11px] font-mono text-neutral-300">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="hover:text-white"
            title="Uzaklaştır"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            className="hover:text-white"
            title="Yakınlaştır"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Zone 3: Actions (Templates, Preview, Export) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenTemplates}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-white text-xs font-medium transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Şablonlar</span>
        </button>

        <button
          onClick={onTogglePreview}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-white text-xs font-medium transition-all"
        >
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span>Önizle</span>
        </button>

        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Kodu Dışa Aktar</span>
        </button>
      </div>
    </header>
  );
};
