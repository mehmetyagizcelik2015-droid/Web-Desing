import React from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { TEMPLATES, TemplatePreset } from '../data/templates';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TemplatePreset) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="h-14 border-b border-neutral-800 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Hazır Web Sitesi Şablonları</h3>
              <p className="text-[11px] text-neutral-400">
                Tek tıkla profesyonel bir şablon yükleyip istediğiniz gibi özelleştirin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {TEMPLATES.map(template => (
            <div
              key={template.id}
              className="group border border-neutral-800/90 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 hover:border-neutral-700 transition-all flex flex-col overflow-hidden hover:shadow-xl hover:shadow-black/50"
            >
              {/* Thumbnail */}
              <div className="h-44 overflow-hidden relative border-b border-neutral-800/80 bg-neutral-950">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-neutral-300">
                  {template.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">
                    {template.name}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {template.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (
                      confirm(
                        `"${template.name}" şablonunu yüklemek istediğinize emin misiniz? Mevcut sayfa blokları bu şablonla değiştirilecektir.`
                      )
                    ) {
                      onSelectTemplate(template);
                      onClose();
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-blue-600 text-neutral-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Bu Şablonu Kullan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/40 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium"
          >
            Vazgeç
          </button>
        </div>
      </div>
    </div>
  );
};
