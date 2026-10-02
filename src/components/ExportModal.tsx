import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  FileJson,
  Upload,
  ExternalLink
} from 'lucide-react';
import { Project } from '../types/builder';
import { generateHtmlCode } from '../utils/codeExport';
import { downloadFile } from '../utils/storage';

interface ExportModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onImportProject: (imported: Project) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  project,
  isOpen,
  onClose,
  onImportProject
}) => {
  const [tab, setTab] = useState<'html' | 'json'>('html');
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const htmlCode = generateHtmlCode(project);
  const jsonCode = JSON.stringify(project, null, 2);

  const handleCopy = () => {
    const textToCopy = tab === 'html' ? htmlCode : jsonCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (tab === 'html') {
      const activePage = project.pages.find(p => p.id === project.activePageId) || project.pages[0];
      const filename = `${activePage.slug || 'index'}.html`;
      downloadFile(filename, htmlCode, 'text/html');
    } else {
      const filename = `${project.settings.siteName.toLowerCase().replace(/\s+/g, '_')}_proje.json`;
      downloadFile(filename, jsonCode, 'application/json');
    }
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.pages && parsed.settings) {
          onImportProject(parsed);
          setImportError(null);
          onClose();
        } else {
          setImportError('Geçersiz WebStudio proje dosyası.');
        }
      } catch (err) {
        setImportError('JSON dosyası okunamadı veya biçimi hatalı.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="h-14 border-b border-neutral-800 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Web Sitenizi Dışa Aktarın</h3>
              <p className="text-[11px] text-neutral-400">
                Temiz HTML & Tailwind CSS dosyası veya proje JSON yedeği
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub Header / Tabs */}
        <div className="px-6 py-2.5 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tab === 'html'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              HTML & Tailwind CSS (.html)
            </button>
            <button
              onClick={() => setTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tab === 'json'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              Proje JSON Yedeği (.json)
            </button>
          </div>

          <div className="flex items-center gap-2">
            {tab === 'json' && (
              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-medium cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>JSON Yükle</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleJsonUpload}
                  className="hidden"
                />
              </label>
            )}

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{tab === 'html' ? 'HTML İndir' : 'JSON İndir'}</span>
            </button>
          </div>
        </div>

        {importError && (
          <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-2 text-xs text-red-400 font-medium">
            {importError}
          </div>
        )}

        {/* Code Content Viewport */}
        <div className="flex-1 overflow-auto p-4 bg-neutral-950 font-mono text-xs text-neutral-300">
          <pre className="p-4 rounded-xl bg-neutral-900 border border-neutral-800/80 overflow-x-auto selection:bg-blue-500 selection:text-white leading-relaxed">
            <code>{tab === 'html' ? htmlCode : jsonCode}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/40 flex items-center justify-between text-xs text-neutral-400">
          <span>
            {tab === 'html'
              ? '💡 İpucu: İndirdiğiniz HTML dosyasını doğrudan tarayıcınızda açabilir veya GitHub Pages, Vercel ya da hostinginize yükleyebilirsiniz.'
              : '💡 İpucu: JSON yedeğini daha sonra "JSON Yükle" butonuyla açarak projenizi kaldığınız yerden düzenlemeye devam edebilirsiniz.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
