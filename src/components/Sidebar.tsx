import React, { useState } from 'react';
import {
  Layers,
  PlusSquare,
  FileText,
  Settings,
  Search,
  GripVertical,
  Plus,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Menu,
  Sparkles,
  LayoutTemplate,
  Grid3X3,
  BookOpen,
  Briefcase,
  CreditCard,
  MessageSquareQuote,
  Image,
  HelpCircle,
  Megaphone,
  Mail,
  PanelBottom,
  Palette
} from 'lucide-react';
import { BLOCK_LIBRARY, BlockTemplate } from '../data/blockLibrary';
import { BlockData, Project, Page } from '../types/builder';

interface SidebarProps {
  project: Project;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onAddBlock: (template: BlockTemplate, targetIndex?: number) => void;
  onMoveBlock: (index: number, direction: 'up' | 'down') => void;
  onDuplicateBlock: (index: number) => void;
  onDeleteBlock: (index: number) => void;
  onUpdateSettings: (settings: Project['settings']) => void;
  onSelectPage: (pageId: string) => void;
  onAddPage: (name: string) => void;
  onDeletePage: (pageId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  project,
  selectedBlockId,
  onSelectBlock,
  onAddBlock,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onUpdateSettings,
  onSelectPage,
  onAddPage,
  onDeletePage
}) => {
  const [activeTab, setActiveTab] = useState<'blocks' | 'layers' | 'pages' | 'settings'>('blocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newPageInput, setNewPageInput] = useState('');

  const activePage = project.pages.find(p => p.id === project.activePageId) || project.pages[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Menu': return <Menu className="w-4 h-4 text-sky-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'LayoutTemplate': return <LayoutTemplate className="w-4 h-4 text-purple-400" />;
      case 'Grid3X3': return <Grid3X3 className="w-4 h-4 text-emerald-400" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-blue-400" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4 text-yellow-400" />;
      case 'MessageSquareQuote': return <MessageSquareQuote className="w-4 h-4 text-pink-400" />;
      case 'Image': return <Image className="w-4 h-4 text-violet-400" />;
      case 'HelpCircle': return <HelpCircle className="w-4 h-4 text-teal-400" />;
      case 'Megaphone': return <Megaphone className="w-4 h-4 text-rose-400" />;
      case 'Mail': return <Mail className="w-4 h-4 text-indigo-400" />;
      case 'PanelBottom': return <PanelBottom className="w-4 h-4 text-neutral-400" />;
      default: return <PlusSquare className="w-4 h-4 text-blue-400" />;
    }
  };

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'Navigasyon', label: 'Menü' },
    { id: 'Karşılama (Hero)', label: 'Hero' },
    { id: 'Özellikler & Hizmetler', label: 'Özellikler' },
    { id: 'İçerik & Hikaye', label: 'İçerik' },
    { id: 'Fiyatlandırma & Yorumlar', label: 'Fiyat & Yorum' },
    { id: 'İletişim & Kapanış', label: 'İletişim' }
  ];

  const filteredBlocks = BLOCK_LIBRARY.filter(block => {
    const matchesSearch = block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          block.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e: React.DragEvent, template: BlockTemplate) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      source: 'sidebar',
      blockType: template.type,
      templateIndex: BLOCK_LIBRARY.indexOf(template)
    }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <aside className="w-80 border-r border-neutral-800 bg-neutral-950 flex flex-col h-[calc(100vh-3.5rem)] select-none z-20">
      {/* Top Sidebar Tab Navigation */}
      <div className="flex items-center border-b border-neutral-800 p-1 bg-neutral-900/60">
        <button
          onClick={() => setActiveTab('blocks')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'blocks'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Bileşenler & Blok Kütüphanesi"
        >
          <PlusSquare className="w-3.5 h-3.5 text-blue-400" />
          <span>Bloklar</span>
        </button>

        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'layers'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Katmanlar & Sayfa Hiyerarşisi"
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Katmanlar</span>
        </button>

        <button
          onClick={() => setActiveTab('pages')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'pages'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Sayfalar"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sayfalar</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'settings'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Site Genel Ayarları"
        >
          <Settings className="w-3.5 h-3.5 text-amber-400" />
          <span>Ayarlar</span>
        </button>
      </div>

      {/* Tab Content: BLOCKS PALETTE */}
      {activeTab === 'blocks' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search bar */}
          <div className="p-3 border-b border-neutral-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Blok veya bileşen ara..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Category horizontal pill scroll */}
            <div className="flex items-center gap-1 overflow-x-auto pt-2 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-[11px] whitespace-nowrap px-2 py-1 rounded-md transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Block list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="text-[11px] font-medium text-neutral-400 flex items-center justify-between">
              <span>SÜRÜKLE VEYA TIKLA</span>
              <span className="font-mono text-neutral-400">{filteredBlocks.length} blok</span>
            </div>

            {filteredBlocks.map(template => (
              <div
                key={template.label + template.type}
                draggable
                onDragStart={e => handleDragStart(e, template)}
                onClick={() => onAddBlock(template)}
                className="group relative p-3 rounded-xl border border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-900 hover:border-neutral-700 cursor-grab active:cursor-grabbing transition-all hover:shadow-lg hover:shadow-black/40 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-neutral-800/90 group-hover:bg-neutral-800 border border-neutral-700/50">
                      {getIcon(template.iconName)}
                    </div>
                    <span className="text-xs font-semibold text-neutral-200 group-hover:text-white">
                      {template.label}
                    </span>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] text-blue-400 font-medium transition-opacity flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Ekle
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-400">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-800/80 border border-neutral-700/40">
                    {template.category}
                  </span>
                  <span className="flex items-center gap-1 opacity-60 group-hover:opacity-100">
                    <GripVertical className="w-3 h-3" /> Tuvale sürükle
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: LAYERS (Current Page Blocks) */}
      {activeTab === 'layers' && (
        <div className="flex-1 flex flex-col overflow-hidden p-3">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <span className="text-xs font-semibold text-neutral-200 block">Sayfa Katmanları</span>
              <span className="text-[11px] text-neutral-400 font-mono">{activePage?.blocks.length || 0} bölüm</span>
            </div>
            <button
              onClick={() => setActiveTab('blocks')}
              className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Blok Ekle
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 py-2">
            {activePage?.blocks.map((block, index) => {
              const isSelected = selectedBlockId === block.id;
              return (
                <div
                  key={block.id}
                  onClick={() => onSelectBlock(block.id)}
                  className={`group p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500/50 text-white'
                      : 'bg-neutral-900/60 border-neutral-800/80 text-neutral-300 hover:bg-neutral-900 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] text-neutral-400">#{index + 1}</span>
                    <span className="font-medium truncate">{block.title || block.type.toUpperCase()}</span>
                  </div>

                  <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                    <button
                      title="Yukarı Taşı"
                      disabled={index === 0}
                      onClick={e => {
                        e.stopPropagation();
                        onMoveBlock(index, 'up');
                      }}
                      className="p-1 hover:text-white text-neutral-400 disabled:opacity-20 rounded"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Aşağı Taşı"
                      disabled={index === activePage.blocks.length - 1}
                      onClick={e => {
                        e.stopPropagation();
                        onMoveBlock(index, 'down');
                      }}
                      className="p-1 hover:text-white text-neutral-400 disabled:opacity-20 rounded"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Çoğalt"
                      onClick={e => {
                        e.stopPropagation();
                        onDuplicateBlock(index);
                      }}
                      className="p-1 hover:text-white text-neutral-400 rounded"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Sil"
                      onClick={e => {
                        e.stopPropagation();
                        onDeleteBlock(index);
                      }}
                      className="p-1 hover:text-red-400 text-neutral-400 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: PAGES */}
      {activeTab === 'pages' && (
        <div className="flex-1 flex flex-col p-3 overflow-hidden">
          <div className="text-xs font-semibold text-neutral-200 pb-2 border-b border-neutral-800">
            Sitedeki Sayfalar
          </div>
          <div className="space-y-1.5 py-3 flex-1 overflow-y-auto">
            {project.pages.map(page => (
              <div
                key={page.id}
                onClick={() => onSelectPage(page.id)}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                  page.id === project.activePageId
                    ? 'bg-blue-600/20 border-blue-500/40 text-blue-300 font-semibold'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-850'
                }`}
              >
                <div>
                  <div className="font-medium">{page.name}</div>
                  <div className="text-[10px] text-neutral-400 font-mono">/{page.slug}</div>
                </div>
                {project.pages.length > 1 && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (confirm(`"${page.name}" sayfasını silmek istediğinize emin misiniz?`)) {
                        onDeletePage(page.id);
                      }
                    }}
                    className="p-1 text-neutral-400 hover:text-red-400 rounded"
                    title="Sayfayı Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              if (newPageInput.trim()) {
                onAddPage(newPageInput.trim());
                setNewPageInput('');
              }
            }}
            className="pt-3 border-t border-neutral-800 flex gap-2"
          >
            <input
              type="text"
              placeholder="Yeni Sayfa Adı..."
              value={newPageInput}
              onChange={e => setNewPageInput(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
            >
              Ekle
            </button>
          </form>
        </div>
      )}

      {/* Tab Content: SITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4">
          <div className="text-xs font-semibold text-neutral-200 pb-2 border-b border-neutral-800">
            Site Genel Ayarları
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Site Başlığı / Marka
            </label>
            <input
              type="text"
              value={project.settings.siteName}
              onChange={e =>
                onUpdateSettings({ ...project.settings, siteName: e.target.value })
              }
              className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Site Açıklaması (SEO Meta)
            </label>
            <textarea
              rows={3}
              value={project.settings.siteDescription}
              onChange={e =>
                onUpdateSettings({ ...project.settings, siteDescription: e.target.value })
              }
              className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Ana Vurgu Rengi
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={project.settings.primaryColor}
                onChange={e =>
                  onUpdateSettings({ ...project.settings, primaryColor: e.target.value })
                }
                className="w-9 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={project.settings.primaryColor}
                onChange={e =>
                  onUpdateSettings({ ...project.settings, primaryColor: e.target.value })
                }
                className="flex-1 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Yazı Tipi (Font Ailesi)
            </label>
            <select
              value={project.settings.fontFamily}
              onChange={e =>
                onUpdateSettings({ ...project.settings, fontFamily: e.target.value })
              }
              className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern & Temiz)</option>
              <option value="Cabinet Grotesk">Cabinet Grotesk (Cesur & Karakterli)</option>
              <option value="system-ui">Sistem Fontu (System UI)</option>
              <option value="serif">Klasik Serif</option>
            </select>
          </div>
        </div>
      )}
    </aside>
  );
};
