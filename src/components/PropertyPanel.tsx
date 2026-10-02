import React, { useState } from 'react';
import {
  X,
  Type,
  Palette,
  Layout,
  Sliders,
  Plus,
  Trash2,
  ExternalLink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import { BlockData, CardItem } from '../types/builder';

interface PropertyPanelProps {
  block: BlockData | null;
  onUpdate: (updated: BlockData) => void;
  onClose: () => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ block, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  if (!block) return null;

  const handleStyleChange = (key: keyof BlockData['styles'], val: any) => {
    onUpdate({
      ...block,
      styles: {
        ...block.styles,
        [key]: val
      }
    });
  };

  const colorPresets = [
    '#0F172A', // Slate 900
    '#0B0F19', // Darkest Blue
    '#18181B', // Zinc 900
    '#1E293B', // Slate 800
    '#111827', // Gray 900
    '#18120C', // Warm Brown
    '#1E1B4B', // Indigo 950
    '#022C22', // Emerald 950
    '#FFFFFF', // White
    '#F8FAFC'  // Off-white
  ];

  const accentPresets = [
    '#2563EB', // Blue
    '#3B82F6', // Sky Blue
    '#6366F1', // Indigo
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F43F5E', // Rose
    '#10B981', // Emerald
    '#D97706', // Amber
    '#F97316'  // Orange
  ];

  const handleUpdateCard = (cardIndex: number, field: keyof CardItem, val: any) => {
    if (!block.cards) return;
    const updatedCards = [...block.cards];
    updatedCards[cardIndex] = {
      ...updatedCards[cardIndex],
      [field]: val
    };
    onUpdate({ ...block, cards: updatedCards });
  };

  const handleAddCard = () => {
    const newCard: CardItem = {
      id: 'c_' + Math.random().toString(36).substring(2, 7),
      title: 'Yeni Madde / Özellik',
      description: 'Bu öğenin açıklama metnini buradan düzenleyebilirsiniz.',
      price: '₺499',
      period: '/aylık',
      features: ['Yeni Özellik 1', 'Yeni Özellik 2']
    };
    onUpdate({
      ...block,
      cards: [...(block.cards || []), newCard]
    });
  };

  const handleDeleteCard = (cardIndex: number) => {
    if (!block.cards) return;
    const updated = block.cards.filter((_, idx) => idx !== cardIndex);
    onUpdate({ ...block, cards: updated });
  };

  return (
    <aside className="w-80 border-l border-neutral-800 bg-neutral-950 flex flex-col h-[calc(100vh-3.5rem)] select-none z-20">
      {/* Header */}
      <div className="h-12 border-b border-neutral-800 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {block.type} Özellikleri
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800 bg-neutral-900/60 p-1">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'content'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          İçerik
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'style'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Stil & Tasarım
        </button>
      </div>

      {/* Tab: CONTENT */}
      {activeTab === 'content' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Brand Name (Header / Footer) */}
          {(block.type === 'header' || block.type === 'footer') && (
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                Marka / Logo Adı
              </label>
              <input
                type="text"
                value={block.brandName || ''}
                onChange={e => onUpdate({ ...block, brandName: e.target.value })}
                className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Badge */}
          {block.badge !== undefined && (
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                Üst Rozet / Etiket (Badge)
              </label>
              <input
                type="text"
                value={block.badge || ''}
                onChange={e => onUpdate({ ...block, badge: e.target.value })}
                className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Main Title */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Ana Başlık
            </label>
            <textarea
              rows={2}
              value={block.title || ''}
              onChange={e => onUpdate({ ...block, title: e.target.value })}
              className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Subtitle */}
          {block.subtitle !== undefined && (
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                Alt Açıklama (Subtitle)
              </label>
              <textarea
                rows={3}
                value={block.subtitle || ''}
                onChange={e => onUpdate({ ...block, subtitle: e.target.value })}
                className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          )}

          {/* Content (About / Footer) */}
          {block.content !== undefined && (
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                Detaylı Metin İçeriği
              </label>
              <textarea
                rows={4}
                value={block.content || ''}
                onChange={e => onUpdate({ ...block, content: e.target.value })}
                className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          )}

          {/* Primary Button */}
          {block.primaryBtn && (
            <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-2">
              <span className="text-[11px] font-semibold text-neutral-300 block">
                Birincil Eylem Butonu
              </span>
              <div>
                <label className="block text-[10px] text-neutral-400 mb-1">Buton Metni</label>
                <input
                  type="text"
                  value={block.primaryBtn.text}
                  onChange={e =>
                    onUpdate({
                      ...block,
                      primaryBtn: { ...block.primaryBtn!, text: e.target.value }
                    })
                  }
                  className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-700 rounded text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-400 mb-1">Hedef Bağlantı (URL)</label>
                <input
                  type="text"
                  value={block.primaryBtn.url}
                  onChange={e =>
                    onUpdate({
                      ...block,
                      primaryBtn: { ...block.primaryBtn!, url: e.target.value }
                    })
                  }
                  className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-700 rounded text-xs text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* Secondary Button */}
          {block.secondaryBtn && (
            <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-2">
              <span className="text-[11px] font-semibold text-neutral-300 block">
                İkincil Buton
              </span>
              <div>
                <label className="block text-[10px] text-neutral-400 mb-1">Buton Metni</label>
                <input
                  type="text"
                  value={block.secondaryBtn.text}
                  onChange={e =>
                    onUpdate({
                      ...block,
                      secondaryBtn: { ...block.secondaryBtn!, text: e.target.value }
                    })
                  }
                  className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-700 rounded text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-400 mb-1">Hedef Bağlantı (URL)</label>
                <input
                  type="text"
                  value={block.secondaryBtn.url}
                  onChange={e =>
                    onUpdate({
                      ...block,
                      secondaryBtn: { ...block.secondaryBtn!, url: e.target.value }
                    })
                  }
                  className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-700 rounded text-xs text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* Image URL */}
          {block.image !== undefined && (
            <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-2">
              <span className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                Görsel Kaynağı
              </span>
              <input
                type="text"
                value={block.image || ''}
                onChange={e => onUpdate({ ...block, image: e.target.value })}
                placeholder="https://..."
                className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-700 rounded text-xs text-white font-mono truncate"
              />
              <div className="text-[10px] text-neutral-400">
                Hazır Fotoğraflar:
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() =>
                    onUpdate({
                      ...block,
                      image:
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
                    })
                  }
                  className="text-[10px] bg-neutral-800 hover:bg-neutral-700 p-1 rounded text-neutral-300"
                >
                  Teknoloji
                </button>
                <button
                  onClick={() =>
                    onUpdate({
                      ...block,
                      image:
                        'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80'
                    })
                  }
                  className="text-[10px] bg-neutral-800 hover:bg-neutral-700 p-1 rounded text-neutral-300"
                >
                  Ofis / Ekip
                </button>
                <button
                  onClick={() =>
                    onUpdate({
                      ...block,
                      image:
                        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
                    })
                  }
                  className="text-[10px] bg-neutral-800 hover:bg-neutral-700 p-1 rounded text-neutral-300"
                >
                  Tasarım
                </button>
              </div>
            </div>
          )}

          {/* Cards / Features / Pricing List */}
          {block.cards && (
            <div className="space-y-3 pt-2 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-200">
                  Kartlar ({block.cards.length})
                </span>
                <button
                  onClick={handleAddCard}
                  className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Yeni Kart Ekle
                </button>
              </div>

              <div className="space-y-2">
                {block.cards.map((card, cidx) => (
                  <div
                    key={card.id}
                    className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400">
                        Kart #{cidx + 1}
                      </span>
                      <button
                        onClick={() => handleDeleteCard(cidx)}
                        className="text-neutral-400 hover:text-red-400 p-0.5"
                        title="Kartı Sil"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={card.title}
                      onChange={e => handleUpdateCard(cidx, 'title', e.target.value)}
                      placeholder="Kart Başlığı"
                      className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-700 rounded text-xs text-white"
                    />

                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={e => handleUpdateCard(cidx, 'description', e.target.value)}
                      placeholder="Açıklama"
                      className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-700 rounded text-xs text-white resize-none"
                    />

                    {/* Pricing specific fields */}
                    {block.type === 'pricing' && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={card.price || ''}
                          onChange={e => handleUpdateCard(cidx, 'price', e.target.value)}
                          placeholder="Fiyat (₺299)"
                          className="w-1/2 px-2 py-1 bg-neutral-950 border border-neutral-700 rounded text-xs text-white font-mono"
                        />
                        <label className="flex items-center gap-1.5 text-[11px] text-neutral-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!card.highlighted}
                            onChange={e => handleUpdateCard(cidx, 'highlighted', e.target.checked)}
                          />
                          Popüler Yap
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: STYLE */}
      {activeTab === 'style' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Background Color */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-2">
              Arka Plan Rengi
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {colorPresets.map(c => (
                <button
                  key={c}
                  onClick={() => handleStyleChange('backgroundColor', c)}
                  className={`w-6 h-6 rounded-md border transition-transform ${
                    block.styles.backgroundColor === c
                      ? 'scale-110 border-blue-500 shadow-sm'
                      : 'border-neutral-700 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={block.styles.backgroundColor || '#0F172A'}
                onChange={e => handleStyleChange('backgroundColor', e.target.value)}
                className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={block.styles.backgroundColor || '#0F172A'}
                onChange={e => handleStyleChange('backgroundColor', e.target.value)}
                className="flex-1 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-white"
              />
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-2">
              Yazı Rengi
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={block.styles.textColor || '#FFFFFF'}
                onChange={e => handleStyleChange('textColor', e.target.value)}
                className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={block.styles.textColor || '#FFFFFF'}
                onChange={e => handleStyleChange('textColor', e.target.value)}
                className="flex-1 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-white"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-2">
              Vurgu & Buton Rengi
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {accentPresets.map(a => (
                <button
                  key={a}
                  onClick={() => handleStyleChange('accentColor', a)}
                  className={`w-6 h-6 rounded-md border transition-transform ${
                    block.styles.accentColor === a
                      ? 'scale-110 border-white shadow-sm'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: a }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={block.styles.accentColor || '#2563EB'}
                onChange={e => handleStyleChange('accentColor', e.target.value)}
                className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={block.styles.accentColor || '#2563EB'}
                onChange={e => handleStyleChange('accentColor', e.target.value)}
                className="flex-1 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-white"
              />
            </div>
          </div>

          {/* Alignment */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Metin Hizalaması
            </label>
            <div className="grid grid-cols-3 gap-1 bg-neutral-900 p-1 border border-neutral-800 rounded-lg">
              <button
                onClick={() => handleStyleChange('alignment', 'left')}
                className={`py-1.5 flex items-center justify-center rounded text-xs transition-colors ${
                  block.styles.alignment === 'left' || !block.styles.alignment
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleStyleChange('alignment', 'center')}
                className={`py-1.5 flex items-center justify-center rounded text-xs transition-colors ${
                  block.styles.alignment === 'center'
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleStyleChange('alignment', 'right')}
                className={`py-1.5 flex items-center justify-center rounded text-xs transition-colors ${
                  block.styles.alignment === 'right'
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Padding / Spacing */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Dikey Boşluk (Padding)
            </label>
            <div className="grid grid-cols-3 gap-1 bg-neutral-900 p-1 border border-neutral-800 rounded-lg text-xs">
              <button
                onClick={() => handleStyleChange('paddingY', 'compact')}
                className={`py-1 rounded transition-colors ${
                  block.styles.paddingY === 'compact'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Kompakt
              </button>
              <button
                onClick={() => handleStyleChange('paddingY', 'normal')}
                className={`py-1 rounded transition-colors ${
                  block.styles.paddingY === 'normal' || !block.styles.paddingY
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => handleStyleChange('paddingY', 'relaxed')}
                className={`py-1 rounded transition-colors ${
                  block.styles.paddingY === 'relaxed'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Geniş
              </button>
            </div>
          </div>

          {/* Max Width */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              İçerik Genişliği
            </label>
            <select
              value={block.styles.maxWidth || 'wide'}
              onChange={e => handleStyleChange('maxWidth', e.target.value)}
              className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="narrow">Dar (Max 4XL)</option>
              <option value="medium">Orta (Max 5XL)</option>
              <option value="wide">Geniş Standart (Max 7XL)</option>
              <option value="full">Tam Genişlik (Full Width)</option>
            </select>
          </div>
        </div>
      )}
    </aside>
  );
};
