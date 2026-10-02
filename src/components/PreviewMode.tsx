import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  ArrowLeft,
  Download,
  ExternalLink
} from 'lucide-react';
import { Project, ViewportMode, BlockData } from '../types/builder';
import { generateHtmlCode } from '../utils/codeExport';
import { downloadFile } from '../utils/storage';

interface PreviewModeProps {
  project: Project;
  onExitPreview: () => void;
  onOpenExport: () => void;
}

export const PreviewMode: React.FC<PreviewModeProps> = ({
  project,
  onExitPreview,
  onOpenExport
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [activePageId, setActivePageId] = useState<string>(project.activePageId);

  const activePage = project.pages.find(p => p.id === activePageId) || project.pages[0];

  const getViewportWidth = () => {
    switch (viewport) {
      case 'tablet':
        return 'w-[768px] min-h-screen my-6 rounded-2xl shadow-2xl border border-neutral-700/60 overflow-hidden';
      case 'mobile':
        return 'w-[375px] min-h-screen my-6 rounded-3xl shadow-2xl border-4 border-neutral-800 overflow-hidden';
      default:
        return 'w-full min-h-screen';
    }
  };

  const renderBlock = (block: BlockData) => {
    const bg = block.styles.backgroundColor || '#0F172A';
    const text = block.styles.textColor || '#FFFFFF';
    const accent = block.styles.accentColor || '#2563EB';
    const align =
      block.styles.alignment === 'center'
        ? 'text-center'
        : block.styles.alignment === 'right'
        ? 'text-right'
        : 'text-left';
    const padding =
      block.styles.paddingY === 'compact'
        ? 'py-8'
        : block.styles.paddingY === 'relaxed'
        ? 'py-24'
        : 'py-16';
    const maxWidth =
      block.styles.maxWidth === 'narrow'
        ? 'max-w-4xl'
        : block.styles.maxWidth === 'medium'
        ? 'max-w-5xl'
        : block.styles.maxWidth === 'full'
        ? 'max-w-full'
        : 'max-w-7xl';

    switch (block.type) {
      case 'header':
        return (
          <header
            key={block.id}
            style={{ backgroundColor: bg, color: text }}
            className="sticky top-0 z-50 px-6 py-4 border-b border-white/10 backdrop-blur-md"
          >
            <div className={`${maxWidth} mx-auto flex items-center justify-between`}>
              <a href="#" className="text-xl font-bold tracking-tight">
                {block.brandName || block.title || 'WebStudio'}
              </a>
              <nav className="hidden md:flex items-center gap-6 text-sm opacity-85">
                {(block.navLinks || []).map(link => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="hover:opacity-100 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              {block.primaryBtn && (
                <a
                  href={block.primaryBtn.url}
                  style={{ backgroundColor: accent }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-opacity"
                >
                  {block.primaryBtn.text}
                </a>
              )}
            </div>
          </header>
        );

      case 'hero':
        return (
          <section
            key={block.id}
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6 ${align} relative overflow-hidden`}
          >
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div
                  className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-4 px-3 py-1 rounded-full border border-white/20 bg-white/10"
                  style={{ color: accent }}
                >
                  {block.badge}
                </div>
              )}
              <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-5 max-w-4xl mx-auto leading-tight">
                {block.title}
              </h1>
              {block.subtitle && (
                <p
                  className={`text-base md:text-xl opacity-80 mb-8 max-w-2xl leading-relaxed ${
                    block.styles.alignment === 'center' ? 'mx-auto' : ''
                  }`}
                >
                  {block.subtitle}
                </p>
              )}
              <div
                className={`flex flex-wrap items-center gap-4 ${
                  block.styles.alignment === 'center'
                    ? 'justify-center'
                    : block.styles.alignment === 'right'
                    ? 'justify-end'
                    : 'justify-start'
                } mb-10`}
              >
                {block.primaryBtn && (
                  <a
                    href={block.primaryBtn.url}
                    style={{ backgroundColor: accent }}
                    className="px-7 py-3.5 rounded-xl font-semibold text-white shadow-lg hover:opacity-95 transition-all text-sm"
                  >
                    {block.primaryBtn.text}
                  </a>
                )}
                {block.secondaryBtn && (
                  <a
                    href={block.secondaryBtn.url}
                    className="px-7 py-3.5 rounded-xl font-medium border border-white/20 hover:bg-white/10 transition-colors text-sm"
                  >
                    {block.secondaryBtn.text}
                  </a>
                )}
              </div>
              {block.image && (
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-6">
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-auto object-cover max-h-[500px]"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </section>
        );

      case 'features':
        return (
          <section
            key={block.id}
            id="features"
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6 ${align}`}
          >
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
                <p className={`text-sm md:text-base opacity-75 mb-12 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {(block.cards || []).map((card, idx) => (
                  <div
                    key={card.id}
                    className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold mb-5 text-white text-sm"
                        style={{ backgroundColor: accent }}
                      >
                        0{idx + 1}
                      </div>
                      <h3 className="text-xl font-semibold mb-2.5">{card.title}</h3>
                      <p className="text-xs md:text-sm opacity-75 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'about':
        return (
          <section
            key={block.id}
            id="about"
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6`}
          >
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
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-5 leading-tight">
                  {block.title}
                </h2>
                {block.content && (
                  <p className="text-sm md:text-base opacity-80 mb-6 leading-relaxed">
                    {block.content}
                  </p>
                )}
                {block.primaryBtn && (
                  <a
                    href={block.primaryBtn.url}
                    style={{ backgroundColor: accent }}
                    className="inline-block px-6 py-3 rounded-xl font-semibold text-white text-xs shadow-md"
                  >
                    {block.primaryBtn.text}
                  </a>
                )}
              </div>
              {block.image && (
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-full object-cover max-h-[420px]"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </section>
        );

      case 'services':
        return (
          <section
            key={block.id}
            id="services"
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6 ${align}`}
          >
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
                <p className={`text-sm md:text-base opacity-75 mb-12 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {(block.cards || []).map(card => (
                  <div
                    key={card.id}
                    className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col"
                  >
                    {card.image && (
                      <img src={card.image} alt={card.title} className="w-full h-44 object-cover" />
                    )}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
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
          </section>
        );

      case 'pricing':
        return (
          <section
            key={block.id}
            id="pricing"
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6 ${align}`}
          >
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
                <p className={`text-sm md:text-base opacity-75 mb-12 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-stretch">
                {(block.cards || []).map(card => (
                  <div
                    key={card.id}
                    className={`p-7 rounded-2xl flex flex-col justify-between ${
                      card.highlighted
                        ? 'border-2 border-blue-500 bg-white/10 shadow-2xl relative'
                        : 'border border-white/10 bg-white/5'
                    }`}
                  >
                    <div>
                      {card.highlighted && (
                        <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          POPÜLER
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-1.5">{card.title}</h3>
                      <p className="text-xs opacity-70 mb-5">{card.description}</p>
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-extrabold">{card.price || '₺0'}</span>
                        <span className="text-xs opacity-75">{card.period || '/ay'}</span>
                      </div>
                      <ul className="space-y-2.5 mb-8 text-xs opacity-85">
                        {(card.features || []).map((feat, fidx) => (
                          <li key={fidx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className={`w-full py-3 rounded-xl text-xs font-semibold ${
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
          </section>
        );

      case 'testimonials':
        return (
          <section
            key={block.id}
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6 ${align}`}
          >
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
                <p className={`text-sm md:text-base opacity-75 mb-12 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {(block.cards || []).map(card => (
                  <div
                    key={card.id}
                    className="p-7 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                  >
                    <p className="text-sm opacity-90 italic mb-6 leading-relaxed">
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
          </section>
        );

      case 'gallery':
        return (
          <section
            key={block.id}
            id="gallery"
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6 ${align}`}
          >
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
                <p className={`text-sm md:text-base opacity-75 mb-12 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
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
          </section>
        );

      case 'faq':
        return (
          <section
            key={block.id}
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6 ${align}`}
          >
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
                <p className={`text-sm md:text-base opacity-75 mb-12 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div className="space-y-4 text-left">
                {(block.cards || []).map(card => (
                  <div key={card.id} className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-base font-semibold mb-1.5">{card.title}</h3>
                    <p className="text-xs md:text-sm opacity-75 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section
            key={block.id}
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6 ${align}`}
          >
            <div className={`${maxWidth} mx-auto`}>
              {block.badge && (
                <div className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/20 text-white">
                  {block.badge}
                </div>
              )}
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                {block.title}
              </h2>
              {block.subtitle && (
                <p className={`text-base md:text-lg opacity-90 mb-8 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}`}>
                  {block.subtitle}
                </p>
              )}
              <div
                className={`flex flex-wrap items-center gap-4 ${
                  block.styles.alignment === 'center' ? 'justify-center' : 'justify-start'
                }`}
              >
                {block.primaryBtn && (
                  <a
                    href={block.primaryBtn.url}
                    className="px-8 py-3.5 rounded-xl font-bold bg-white text-neutral-900 shadow-xl text-sm hover:bg-neutral-100"
                  >
                    {block.primaryBtn.text}
                  </a>
                )}
                {block.secondaryBtn && (
                  <a
                    href={block.secondaryBtn.url}
                    className="px-8 py-3.5 rounded-xl font-semibold border-2 border-white text-white hover:bg-white/10 text-sm"
                  >
                    {block.secondaryBtn.text}
                  </a>
                )}
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section
            key={block.id}
            id="contact"
            style={{ backgroundColor: bg, color: text }}
            className={`${padding} px-6`}
          >
            <div className={`${maxWidth} mx-auto`}>
              <div className="text-center mb-12">
                {block.badge && (
                  <div
                    className="inline-block text-[11px] font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/15 bg-white/10"
                    style={{ color: accent }}
                  >
                    {block.badge}
                  </div>
                )}
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">
                  {block.title}
                </h2>
                {block.subtitle && (
                  <p className="text-sm md:text-base opacity-75 max-w-xl mx-auto">
                    {block.subtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {(block.cards || []).map(card => (
                    <div key={card.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="font-semibold text-base mb-1.5">{card.title}</div>
                      <div className="text-xs md:text-sm opacity-75 whitespace-pre-line">
                        {card.description}
                      </div>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    alert('Mesajınız başarıyla gönderildi!');
                  }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4"
                >
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2 opacity-80">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmet Yılmaz"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2 opacity-80">
                      E-Posta
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ahmet@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2 opacity-80">
                      Mesajınız
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Mesajınızı buraya yazın..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ backgroundColor: accent }}
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-lg hover:opacity-90 transition-opacity"
                  >
                    Mesaj Gönder
                  </button>
                </form>
              </div>
            </div>
          </section>
        );

      case 'footer':
        return (
          <footer
            key={block.id}
            style={{ backgroundColor: bg, color: text }}
            className="border-t border-white/10 px-6 py-12"
          >
            <div className={`${maxWidth} mx-auto flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div>
                <a href="#" className="text-xl font-bold tracking-tight text-white mb-2 block">
                  {block.brandName || block.title || 'WebStudio'}
                </a>
                <p className="text-xs opacity-75 max-w-sm">{block.content}</p>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm opacity-80">
                {(block.navLinks || []).map(link => (
                  <a key={link.id} href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className={`${maxWidth} mx-auto mt-8 pt-8 border-t border-white/5 text-center text-xs opacity-50`}>
              &copy; {new Date().getFullYear()} {block.brandName || 'WebStudio'}. Tüm hakları saklıdır.
            </div>
          </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 flex flex-col select-none overflow-hidden">
      {/* Floating Preview Top Control Bar */}
      <div className="h-14 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitPreview}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Düzenleme Moduna Dön</span>
          </button>

          <div className="h-4 w-px bg-neutral-700" />

          {/* Page switch in preview */}
          <div className="flex items-center gap-1">
            {project.pages.map(page => (
              <button
                key={page.id}
                onClick={() => setActivePageId(page.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activePageId === page.id
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>

        {/* Viewport switch */}
        <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-0.5 shadow-inner">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-md text-xs transition-colors flex items-center gap-1.5 ${
              viewport === 'desktop'
                ? 'bg-neutral-800 text-white shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Masaüstü</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-md text-xs transition-colors flex items-center gap-1.5 ${
              viewport === 'tablet'
                ? 'bg-neutral-800 text-white shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-md text-xs transition-colors flex items-center gap-1.5 ${
              viewport === 'mobile'
                ? 'bg-neutral-800 text-white shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobil</span>
          </button>
        </div>

        {/* Export Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Kodu İndir</span>
        </button>
      </div>

      {/* Website Viewport Area */}
      <div className="flex-1 overflow-y-auto bg-neutral-950 flex flex-col items-center">
        <div className={getViewportWidth()}>
          {activePage?.blocks.map(renderBlock)}
        </div>
      </div>
    </div>
  );
};
