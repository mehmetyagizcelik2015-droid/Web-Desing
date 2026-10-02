import { BlockData, Project } from '../types/builder';

export const generateHtmlCode = (project: Project, pageId?: string): string => {
  const page = project.pages.find(p => p.id === (pageId || project.activePageId)) || project.pages[0];
  if (!page) return '';

  const renderBlockHtml = (block: BlockData): string => {
    const bg = block.styles.backgroundColor || '#0F172A';
    const text = block.styles.textColor || '#FFFFFF';
    const accent = block.styles.accentColor || '#2563EB';
    const align = block.styles.alignment === 'center' ? 'text-center' : block.styles.alignment === 'right' ? 'text-right' : 'text-left';
    const padding = block.styles.paddingY === 'compact' ? 'py-6 md:py-8' : block.styles.paddingY === 'relaxed' ? 'py-20 md:py-32' : 'py-12 md:py-16';
    const maxWidth = block.styles.maxWidth === 'narrow' ? 'max-w-4xl' : block.styles.maxWidth === 'medium' ? 'max-w-5xl' : block.styles.maxWidth === 'full' ? 'max-w-full' : 'max-w-7xl';

    switch (block.type) {
      case 'header':
        return `
    <!-- Header / Navigasyon -->
    <header style="background-color: ${bg}; color: ${text};" class="sticky top-0 z-50 border-b border-white/10 px-4 md:px-8 py-4 backdrop-blur-md">
      <div class="${maxWidth} mx-auto flex items-center justify-between">
        <a href="#" class="text-xl font-bold tracking-tight">${block.brandName || block.title || 'WebStudio'}</a>
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium opacity-90">
          ${(block.navLinks || []).map(link => `<a href="${link.href}" class="hover:opacity-100 hover:text-blue-400 transition-colors">${link.label}</a>`).join('\n          ')}
        </nav>
        <div class="flex items-center gap-3">
          ${block.primaryBtn ? `<a href="${block.primaryBtn.url}" style="background-color: ${accent};" class="px-5 py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-sm">${block.primaryBtn.text}</a>` : ''}
        </div>
      </div>
    </header>`;

      case 'hero':
        return `
    <!-- Hero Bölümü -->
    <section style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8 relative overflow-hidden">
      <div class="${maxWidth} mx-auto ${align}">
        ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-4 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-400">${block.badge}</div>` : ''}
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''} leading-tight">
          ${block.title}
        </h1>
        ${block.subtitle ? `<p class="text-lg md:text-xl opacity-80 mb-8 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''} leading-relaxed">${block.subtitle}</p>` : ''}
        <div class="flex flex-wrap items-center gap-4 ${block.styles.alignment === 'center' ? 'justify-center' : block.styles.alignment === 'right' ? 'justify-end' : 'justify-start'} mb-12">
          ${block.primaryBtn ? `<a href="${block.primaryBtn.url}" style="background-color: ${accent};" class="px-7 py-3.5 rounded-xl font-semibold text-white shadow-lg hover:opacity-95 transition-all text-base">${block.primaryBtn.text}</a>` : ''}
          ${block.secondaryBtn ? `<a href="${block.secondaryBtn.url}" class="px-7 py-3.5 rounded-xl font-medium border border-white/20 hover:bg-white/10 transition-colors text-base">${block.secondaryBtn.text}</a>` : ''}
        </div>
        ${block.image ? `
        <div class="mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img src="${block.image}" alt="${block.title}" class="w-full h-auto object-cover max-h-[550px]" loading="lazy" />
        </div>` : ''}
      </div>
    </section>`;

      case 'features':
        return `
    <!-- Özellikler Bölümü -->
    <section id="features" style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8">
      <div class="${maxWidth} mx-auto ${align}">
        ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-blue-400">${block.badge}</div>` : ''}
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">${block.title}</h2>
        ${block.subtitle ? `<p class="text-lg opacity-80 mb-14 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}">${block.subtitle}</p>` : ''}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          ${(block.cards || []).map((card, idx) => `
          <div class="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center font-bold mb-6 text-white" style="background-color: ${accent};">
              0${idx + 1}
            </div>
            <h3 class="text-xl font-semibold mb-3">${card.title}</h3>
            <p class="text-sm opacity-75 leading-relaxed">${card.description}</p>
          </div>`).join('\n')}
        </div>
      </div>
    </section>`;

      case 'about':
        return `
    <!-- Hakkımızda Bölümü -->
    <section id="about" style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8">
      <div class="${maxWidth} mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-blue-400">${block.badge}</div>` : ''}
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">${block.title}</h2>
          ${block.content ? `<p class="text-base md:text-lg opacity-80 mb-8 leading-relaxed">${block.content}</p>` : ''}
          ${block.primaryBtn ? `<a href="${block.primaryBtn.url}" style="background-color: ${accent};" class="inline-block px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity">${block.primaryBtn.text}</a>` : ''}
        </div>
        ${block.image ? `
        <div class="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <img src="${block.image}" alt="${block.title}" class="w-full h-full object-cover max-h-[460px]" loading="lazy" />
        </div>` : ''}
      </div>
    </section>`;

      case 'services':
        return `
    <!-- Hizmetler Bölümü -->
    <section id="services" style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8">
      <div class="${maxWidth} mx-auto ${align}">
        ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-blue-400">${block.badge}</div>` : ''}
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">${block.title}</h2>
        ${block.subtitle ? `<p class="text-lg opacity-80 mb-14 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}">${block.subtitle}</p>` : ''}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          ${(block.cards || []).map(card => `
          <div class="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col">
            ${card.image ? `<img src="${card.image}" alt="${card.title}" class="w-full h-48 object-cover" loading="lazy" />` : ''}
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-semibold mb-2">${card.title}</h3>
                <p class="text-sm opacity-75 leading-relaxed mb-4">${card.description}</p>
              </div>
              ${card.linkText ? `<a href="#" class="text-sm font-semibold text-blue-400 hover:underline inline-flex items-center gap-1">${card.linkText} &rarr;</a>` : ''}
            </div>
          </div>`).join('\n')}
        </div>
      </div>
    </section>`;

      case 'pricing':
        return `
    <!-- Fiyatlandırma Bölümü -->
    <section id="pricing" style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8">
      <div class="${maxWidth} mx-auto ${align}">
        ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-blue-400">${block.badge}</div>` : ''}
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">${block.title}</h2>
        ${block.subtitle ? `<p class="text-lg opacity-80 mb-14 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}">${block.subtitle}</p>` : ''}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch">
          ${(block.cards || []).map(card => `
          <div class="p-8 rounded-2xl ${card.highlighted ? 'border-2 border-blue-500 bg-white/10 shadow-2xl relative' : 'border border-white/10 bg-white/5'} flex flex-col justify-between">
            <div>
              ${card.highlighted ? `<div class="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">POPÜLER</div>` : ''}
              <h3 class="text-xl font-bold mb-2">${card.title}</h3>
              <p class="text-xs opacity-70 mb-6">${card.description}</p>
              <div class="flex items-baseline gap-1 mb-8">
                <span class="text-4xl font-extrabold">${card.price || '₺0'}</span>
                <span class="text-sm opacity-75">${card.period || '/ay'}</span>
              </div>
              <ul class="space-y-3 mb-8 text-sm opacity-85">
                ${(card.features || []).map(f => `<li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>${f}</li>`).join('\n                ')}
              </ul>
            </div>
            <a href="#contact" class="w-full text-center py-3 rounded-xl font-semibold ${card.highlighted ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-md' : 'border border-white/20 hover:bg-white/10'} transition-all">${card.linkText || 'Planı Seç'}</a>
          </div>`).join('\n')}
        </div>
      </div>
    </section>`;

      case 'testimonials':
        return `
    <!-- Müşteri Yorumları -->
    <section style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8">
      <div class="${maxWidth} mx-auto ${align}">
        ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-blue-400">${block.badge}</div>` : ''}
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">${block.title}</h2>
        ${block.subtitle ? `<p class="text-lg opacity-80 mb-14 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}">${block.subtitle}</p>` : ''}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          ${(block.cards || []).map(card => `
          <div class="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <p class="text-base opacity-90 italic mb-6 leading-relaxed">"${card.description}"</p>
            <div class="flex items-center gap-4">
              ${card.avatar ? `<img src="${card.avatar}" alt="${card.author}" class="w-12 h-12 rounded-full object-cover border border-white/20" />` : ''}
              <div>
                <h4 class="font-semibold text-sm">${card.author || 'Anonim Müşteri'}</h4>
                <p class="text-xs opacity-60">${card.role || 'Girişimci'}</p>
              </div>
            </div>
          </div>`).join('\n')}
        </div>
      </div>
    </section>`;

      case 'gallery':
        return `
    <!-- Portföy / Galeri Bölümü -->
    <section id="gallery" style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8">
      <div class="${maxWidth} mx-auto ${align}">
        ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-blue-400">${block.badge}</div>` : ''}
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">${block.title}</h2>
        ${block.subtitle ? `<p class="text-lg opacity-80 mb-14 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}">${block.subtitle}</p>` : ''}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${(block.cards || []).map(card => `
          <div class="group relative rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-4/3">
            <img src="${card.image}" alt="${card.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-left text-white">
              <h3 class="text-lg font-bold">${card.title}</h3>
              <p class="text-xs opacity-75">${card.description}</p>
            </div>
          </div>`).join('\n')}
        </div>
      </div>
    </section>`;

      case 'faq':
        return `
    <!-- SSS Bölümü -->
    <section style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8">
      <div class="${maxWidth} mx-auto ${align}">
        ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-blue-400">${block.badge}</div>` : ''}
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">${block.title}</h2>
        ${block.subtitle ? `<p class="text-lg opacity-80 mb-12 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}">${block.subtitle}</p>` : ''}
        <div class="space-y-4 text-left">
          ${(block.cards || []).map(card => `
          <div class="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 class="text-lg font-semibold mb-2">${card.title}</h3>
            <p class="text-sm opacity-75 leading-relaxed">${card.description}</p>
          </div>`).join('\n')}
        </div>
      </div>
    </section>`;

      case 'cta':
        return `
    <!-- CTA Bandı -->
    <section style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8">
      <div class="${maxWidth} mx-auto ${align}">
        ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/20 text-white">${block.badge}</div>` : ''}
        <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">${block.title}</h2>
        ${block.subtitle ? `<p class="text-lg opacity-90 mb-8 max-w-2xl ${block.styles.alignment === 'center' ? 'mx-auto' : ''}">${block.subtitle}</p>` : ''}
        <div class="flex flex-wrap items-center gap-4 ${block.styles.alignment === 'center' ? 'justify-center' : 'justify-start'}">
          ${block.primaryBtn ? `<a href="${block.primaryBtn.url}" class="px-8 py-4 rounded-xl font-bold bg-white text-slate-900 shadow-xl hover:bg-slate-100 transition-colors text-base">${block.primaryBtn.text}</a>` : ''}
          ${block.secondaryBtn ? `<a href="${block.secondaryBtn.url}" class="px-8 py-4 rounded-xl font-semibold border-2 border-white text-white hover:bg-white/10 transition-colors text-base">${block.secondaryBtn.text}</a>` : ''}
        </div>
      </div>
    </section>`;

      case 'contact':
        return `
    <!-- İletişim Bölümü -->
    <section id="contact" style="background-color: ${bg}; color: ${text};" class="${padding} px-4 md:px-8">
      <div class="${maxWidth} mx-auto">
        <div class="text-center mb-14">
          ${block.badge ? `<div class="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-blue-400">${block.badge}</div>` : ''}
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">${block.title}</h2>
          ${block.subtitle ? `<p class="text-lg opacity-80 max-w-2xl mx-auto">${block.subtitle}</p>` : ''}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="space-y-6">
            ${(block.cards || []).map(card => `
            <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 class="text-lg font-semibold mb-2">${card.title}</h3>
              <p class="text-sm opacity-75 whitespace-pre-line">${card.description}</p>
            </div>`).join('\n')}
          </div>
          <form class="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4" onsubmit="event.preventDefault(); alert('Mesajınız başarıyla iletildi!');">
            <div>
              <label class="block text-xs font-medium uppercase tracking-wider mb-2 opacity-80">Adınız Soyadınız</label>
              <input type="text" required placeholder="Örn: Ahmet Yılmaz" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:border-blue-500 text-white placeholder-white/40" />
            </div>
            <div>
              <label class="block text-xs font-medium uppercase tracking-wider mb-2 opacity-80">E-Posta Adresiniz</label>
              <input type="email" required placeholder="ahmet@example.com" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:border-blue-500 text-white placeholder-white/40" />
            </div>
            <div>
              <label class="block text-xs font-medium uppercase tracking-wider mb-2 opacity-80">Mesajınız</label>
              <textarea rows="4" required placeholder="Size nasıl yardımcı olabiliriz?" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:border-blue-500 text-white placeholder-white/40"></textarea>
            </div>
            <button type="submit" style="background-color: ${accent};" class="w-full py-3.5 rounded-xl font-bold text-white shadow-lg hover:opacity-90 transition-opacity">Gönder</button>
          </form>
        </div>
      </div>
    </section>`;

      case 'footer':
        return `
    <!-- Footer / Alt Bilgi -->
    <footer style="background-color: ${bg}; color: ${text};" class="border-t border-white/10 px-4 md:px-8 py-12">
      <div class="${maxWidth} mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="#" class="text-xl font-bold tracking-tight text-white mb-2 block">${block.brandName || block.title || 'WebStudio'}</a>
          <p class="text-xs opacity-75 max-w-sm">${block.content || 'Tüm hakları saklıdır.'}</p>
        </div>
        <div class="flex flex-wrap items-center gap-6 text-sm">
          ${(block.navLinks || []).map(link => `<a href="${link.href}" class="hover:text-white transition-colors">${link.label}</a>`).join('\n          ')}
        </div>
      </div>
      <div class="${maxWidth} mx-auto mt-8 pt-8 border-t border-white/5 text-center text-xs opacity-50">
        &copy; ${new Date().getFullYear()} ${block.brandName || 'WebStudio'}. Tasarım WebStudio platformu ile üretilmiştir.
      </div>
    </footer>`;

      default:
        return ``;
    }
  };

  const blocksHtml = page.blocks.map(renderBlockHtml).join('\n');

  return `<!doctype html>
<html lang="${project.settings.language || 'tr'}" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${project.settings.siteName || 'Web Sitem'} - ${page.name}</title>
    <meta name="description" content="${project.settings.siteDescription || 'Web sitemiz'}" />
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cabinet+Grotesk:wght@600;800&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      }
      h1, h2, h3 {
        font-family: 'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif;
      }
    </style>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white min-h-screen flex flex-col justify-between">
${blocksHtml}
  </body>
</html>`;
};
