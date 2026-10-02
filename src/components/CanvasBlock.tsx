import React, { useState } from 'react';
import {
  GripVertical,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Settings,
  Edit2,
  ExternalLink,
  Check,
  Star
} from 'lucide-react';
import { BlockData } from '../types/builder';

interface CanvasBlockProps {
  block: BlockData;
  index: number;
  totalBlocks: number;
  isSelected: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onUpdateBlock: (updated: BlockData) => void;
  isDragOver: boolean;
  dragOverPosition: 'before' | 'after' | null;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const CanvasBlock: React.FC<CanvasBlockProps> = ({
  block,
  index,
  totalBlocks,
  isSelected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onUpdateBlock,
  isDragOver,
  dragOverPosition,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop
}) => {
  const [isEditingInline, setIsEditingInline] = useState(false);

  const bg = block.styles.backgroundColor || '#0F172A';
  const text = block.styles.textColor || '#FFFFFF';
  const accent = block.styles.accentColor || '#2563EB';
  const align = block.styles.alignment === 'center' ? 'text-center' : block.styles.alignment === 'right' ? 'text-right' : 'text-left';
  const padding = block.styles.paddingY === 'compact' ? 'py-8' : block.styles.paddingY === 'relaxed' ? 'py-24' : 'py-16';
  const maxWidth = block.styles.maxWidth === 'narrow' ? 'max-w-4xl' : block.styles.maxWidth === 'medium' ? 'max-w-5xl' : block.styles.maxWidth === 'full' ? 'max-w-full' : 'max-w-7xl';

  const handleInlineTitleChange = (val: string) => {
    onUpdateBlock({ ...block, title: val });
  };

  const handleInlineSubtitleChange = (val: string) => {
    onUpdateBlock({ ...block, subtitle: val });
  };

  const renderContent = () => {
    switch (block.type) {
      case 'header':
        return (
          <header className="px-6 py-4 border-b border-white/10 backdrop-blur-md">
            <div className={`${maxWidth} mx-auto flex items-center justify-between`}>
              <div className="text-xl font-bold tracking-tight">
                {block.brandName || block.title || 'WebStudio'}
              </div>
              <nav className="hidden md:flex items-center gap-6 text-sm opacity-85">
                {(block.navLinks || []).map(link => (
                  <span key={link.id} className="hover:opacity-100 transition-opacity cursor-pointer">
                    {link.label}
                  </span>
                ))}
              </nav>
              {block.primaryBtn && (
                <button
                  style={{ backgroundColor: accent }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-opacity"
                >
                  {block.primaryBtn.text}
                </button>
              )}
            </div>
          </header>
        );

      case 'hero':
        return (
          <div className={`${padding} px-6 ${align}`}>
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div
                  className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-4 px-3 py-1 rounded-full border border-white/20 bg-white/10"
                  style={{ color: accent }}
                >
                  {block.badge}
                </div>
              )}
              <h1
                contentEditable={isSelected}
                suppressContentEditableWarning
                onBlur={e => handleInlineTitleChange(e.currentTarget.textContent || '')}
                className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight ${
                  isSelected ? 'outline-dashed outline-1 outline-blue-400/50 p-1 rounded' : ''
                }`}
              >
                {block.title}
              </h1>
              {block.subtitle && (
                <p
                  contentEditable={isSelected}
                  suppressContentEditableWarning
                  onBlur={e => handleInlineSubtitleChange(e.currentTarget.textContent || '')}
                  className={`text-base md:text-lg opacity-80 mb-8 max-w-2xl leading-relaxed ${
                    block.styles.alignment === 'center' ? 'mx-auto' : ''
                  } ${isSelected ? 'outline-dashed outline-1 outline-blue-400/50 p-1 rounded' : ''}`}
                >
                  {block.subtitle}
                </p>
              )}
              <div
                className={`flex flex-wrap items-center gap-3 ${
                  block.styles.alignment === 'center' ? 'justify-center' : 'justify-start'
                } mb-8`}
              >
                {block.primaryBtn && (
                  <button
                    style={{ backgroundColor: accent }}
                    className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:opacity-95 transition-all text-sm"
                  >
                    {block.primaryBtn.text}
                  </button>
                )}
                {block.secondaryBtn && (
                  <button className="px-6 py-3 rounded-xl font-medium border border-white/20 hover:bg-white/10 transition-colors text-sm">
                    {block.secondaryBtn.text}
                  </button>
                )}
              </div>
              {block.image && (
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl mt-4">
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-auto object-cover max-h-[460px]"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'features':
        return (
          <div className={`${padding} px-6 ${align}`}>
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div
                  className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/15 bg-white/10"
                  style={{ color: accent }}
                >
                  {block.badge}
                </div>
              )}
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">{block.title}</h2>
              {block.subtitle && (
                <p className={`text-sm md:text-base opacity-75 mb-10 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {(block.cards || []).map((card, idx) => (
                  <div
                    key={card.id}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold mb-4 text-white text-sm"
                        style={{ backgroundColor: accent }}
                      >
                        0{idx + 1}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                      <p className="text-xs opacity-75 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className={`${padding} px-6`}>
            <div className={`${maxWidth} mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center`}>
              <div>
                {block.badge && (
                  <div
                    className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/15 bg-white/10"
                    style={{ color: accent }}
                  >
                    {block.badge}
                  </div>
                )}
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                  {block.title}
                </h2>
                {block.content && (
                  <p className="text-sm md:text-base opacity-80 mb-6 leading-relaxed">
                    {block.content}
                  </p>
                )}
                {block.primaryBtn && (
                  <button
                    style={{ backgroundColor: accent }}
                    className="px-5 py-2.5 rounded-xl font-semibold text-white text-xs shadow-md"
                  >
                    {block.primaryBtn.text}
                  </button>
                )}
              </div>
              {block.image && (
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-full object-cover max-h-[380px]"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className={`${padding} px-6 ${align}`}>
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div
                  className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/15 bg-white/10"
                  style={{ color: accent }}
                >
                  {block.badge}
                </div>
              )}
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">{block.title}</h2>
              {block.subtitle && (
                <p className={`text-sm md:text-base opacity-75 mb-10 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {(block.cards || []).map(card => (
                  <div
                    key={card.id}
                    className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex flex-col"
                  >
                    {card.image && (
                      <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-semibold mb-2">{card.title}</h3>
                        <p className="text-xs opacity-75 leading-relaxed">{card.description}</p>
                      </div>
                      {card.linkText && (
                        <span className="text-xs font-semibold text-blue-400 mt-4 inline-block">
                          {card.linkText} &rarr;
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className={`${padding} px-6 ${align}`}>
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div
                  className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/15 bg-white/10"
                  style={{ color: accent }}
                >
                  {block.badge}
                </div>
              )}
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">{block.title}</h2>
              {block.subtitle && (
                <p className={`text-sm md:text-base opacity-75 mb-10 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-stretch">
                {(block.cards || []).map(card => (
                  <div
                    key={card.id}
                    className={`p-6 rounded-2xl flex flex-col justify-between ${
                      card.highlighted
                        ? 'border-2 border-blue-500 bg-white/10 shadow-2xl relative'
                        : 'border border-white/10 bg-white/5'
                    }`}
                  >
                    <div>
                      {card.highlighted && (
                        <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                          POPÜLER
                        </div>
                      )}
                      <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                      <p className="text-xs opacity-70 mb-4">{card.description}</p>
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl font-extrabold">{card.price || '₺0'}</span>
                        <span className="text-xs opacity-75">{card.period || '/ay'}</span>
                      </div>
                      <ul className="space-y-2 mb-6 text-xs opacity-85">
                        {(card.features || []).map((feat, fidx) => (
                          <li key={fidx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className={`w-full py-2.5 rounded-xl text-xs font-semibold ${
                        card.highlighted
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'border border-white/20 hover:bg-white/10'
                      }`}
                    >
                      {card.linkText || 'Paketi Seç'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className={`${padding} px-6 ${align}`}>
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div
                  className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/15 bg-white/10"
                  style={{ color: accent }}
                >
                  {block.badge}
                </div>
              )}
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">{block.title}</h2>
              {block.subtitle && (
                <p className={`text-sm md:text-base opacity-75 mb-10 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {(block.cards || []).map(card => (
                  <div
                    key={card.id}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                  >
                    <p className="text-xs md:text-sm opacity-90 italic mb-6 leading-relaxed">
                      "{card.description}"
                    </p>
                    <div className="flex items-center gap-3">
                      {card.avatar && (
                        <img
                          src={card.avatar}
                          alt={card.author}
                          className="w-10 h-10 rounded-full object-cover border border-white/20"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-xs">{card.author || 'Müşteri'}</div>
                        <div className="text-[11px] opacity-60">{card.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className={`${padding} px-6 ${align}`}>
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div
                  className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/15 bg-white/10"
                  style={{ color: accent }}
                >
                  {block.badge}
                </div>
              )}
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">{block.title}</h2>
              {block.subtitle && (
                <p className={`text-sm md:text-base opacity-75 mb-10 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(block.cards || []).map(card => (
                  <div
                    key={card.id}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-4/3"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 flex flex-col justify-end text-left text-white">
                      <div className="font-bold text-sm">{card.title}</div>
                      <div className="text-[11px] opacity-75">{card.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className={`${padding} px-6 ${align}`}>
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div
                  className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/15 bg-white/10"
                  style={{ color: accent }}
                >
                  {block.badge}
                </div>
              )}
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">{block.title}</h2>
              {block.subtitle && (
                <p className={`text-sm md:text-base opacity-75 mb-10 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="space-y-3 text-left">
                {(block.cards || []).map(card => (
                  <div key={card.id} className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-sm font-semibold mb-1">{card.title}</h3>
                    <p className="text-xs opacity-75 leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className={`${padding} px-6 ${align}`}>
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/20 text-white">
                  {block.badge}
                </div>
              )}
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
                {block.title}
              </h2>
              {block.subtitle && (
                <p className={`text-sm md:text-base opacity-90 mb-6 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div
                className={`flex flex-wrap items-center gap-3 ${
                  block.styles.alignment === 'center' ? 'justify-center' : 'justify-start'
                }`}
              >
                {block.primaryBtn && (
                  <button className="px-6 py-3 rounded-xl font-bold bg-white text-neutral-900 shadow-xl text-xs hover:bg-neutral-100">
                    {block.primaryBtn.text}
                  </button>
                )}
                {block.secondaryBtn && (
                  <button className="px-6 py-3 rounded-xl font-semibold border-2 border-white text-white hover:bg-white/10 text-xs">
                    {block.secondaryBtn.text}
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className={`${padding} px-6`}>
            <div className={`${maxWidth} mx-auto`}>
              <div className="text-center mb-10">
                {block.badge && (
                  <div
                    className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/15 bg-white/10"
                    style={{ color: accent }}
                  >
                    {block.badge}
                  </div>
                )}
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">{block.title}</h2>
                {block.subtitle && <p className="text-sm opacity-75 max-w-xl mx-auto">{block.subtitle}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {(block.cards || []).map(card => (
                    <div key={card.id} className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-semibold text-sm mb-1">{card.title}</div>
                      <div className="text-xs opacity-75 whitespace-pre-line">{card.description}</div>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div>
                    <label className="block text-[10px] font-medium uppercase tracking-wider mb-1 opacity-80">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      disabled
                      placeholder="Örnek: Can Karaca"
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium uppercase tracking-wider mb-1 opacity-80">
                      E-Posta
                    </label>
                    <input
                      type="email"
                      disabled
                      placeholder="ornek@alanadi.com"
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium uppercase tracking-wider mb-1 opacity-80">
                      Mesaj
                    </label>
                    <textarea
                      rows={3}
                      disabled
                      placeholder="Mesajınızı buraya yazın..."
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-xs text-white resize-none"
                    />
                  </div>
                  <button
                    style={{ backgroundColor: accent }}
                    className="w-full py-2.5 rounded-xl font-bold text-white text-xs opacity-90"
                  >
                    Gönder (Önizleme)
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <footer className="border-t border-white/10 px-6 py-10">
            <div className={`${maxWidth} mx-auto flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div>
                <div className="text-lg font-bold tracking-tight text-white mb-1">
                  {block.brandName || block.title || 'WebStudio'}
                </div>
                <p className="text-xs opacity-75 max-w-sm">{block.content}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs opacity-80">
                {(block.navLinks || []).map(link => (
                  <span key={link.id} className="hover:text-white cursor-pointer">
                    {link.label}
                  </span>
                ))}
              </div>
            </div>
          </footer>
        );

      default:
        return <div className="p-8 text-center text-sm">Özel Bileşen</div>;
    }
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onSelect}
      className={`group relative transition-all duration-150 select-none ${
        isSelected
          ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-neutral-950 z-10'
          : 'hover:ring-1 hover:ring-blue-400/50'
      }`}
      style={{
        backgroundColor: bg,
        color: text
      }}
    >
      {/* Drop Before Indicator */}
      {isDragOver && dragOverPosition === 'before' && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500 shadow-[0_0_10px_#3b82f6] z-50 animate-pulse pointer-events-none" />
      )}

      {/* Floating Action Toolbar on Selected / Hover */}
      <div
        className={`absolute -top-3.5 left-4 z-40 flex items-center gap-1 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 shadow-2xl text-xs transition-opacity ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <span className="flex items-center gap-1 font-mono text-[10px] text-blue-400 font-semibold uppercase pr-1.5 border-r border-neutral-700 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-3.5 h-3.5" />
          {block.type}
        </span>

        <button
          title="Yukarı Taşı"
          disabled={index === 0}
          onClick={onMoveUp}
          className="p-1 hover:text-white text-neutral-400 disabled:opacity-20 hover:bg-neutral-800 rounded transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <button
          title="Aşağı Taşı"
          disabled={index === totalBlocks - 1}
          onClick={onMoveDown}
          className="p-1 hover:text-white text-neutral-400 disabled:opacity-20 hover:bg-neutral-800 rounded transition-colors"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>

        <button
          title="Çoğalt"
          onClick={onDuplicate}
          className="p-1 hover:text-white text-neutral-400 hover:bg-neutral-800 rounded transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        <button
          title="Sil"
          onClick={onDelete}
          className="p-1 hover:text-red-400 text-neutral-400 hover:bg-neutral-800 rounded transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Render the block visuals */}
      {renderContent()}

      {/* Drop After Indicator */}
      {isDragOver && dragOverPosition === 'after' && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-500 shadow-[0_0_10px_#3b82f6] z-50 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};
