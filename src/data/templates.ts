import { BlockData, Project } from '../types/builder';
import { BLOCK_LIBRARY } from './blockLibrary';

export interface TemplatePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  createBlocks: () => BlockData[];
}

const getBlock = (type: string, overrides: Partial<BlockData> = {}): BlockData => {
  const tmpl = BLOCK_LIBRARY.find(b => b.type === type);
  if (!tmpl) throw new Error(`Block ${type} not found`);
  const base = tmpl.createDefault();
  return {
    ...base,
    ...overrides,
    id: 'block_' + Math.random().toString(36).substring(2, 9),
    styles: { ...base.styles, ...(overrides.styles || {}) }
  };
};

export const TEMPLATES: TemplatePreset[] = [
  {
    id: 'saas-starter',
    name: 'Modern SaaS & Girişim',
    category: 'Teknoloji',
    description: 'Yazılım şirketleri, SaaS ürünleri ve dijital servisler için optimize edilmiş dönüşüm odaklı açılış sayfası.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
    createBlocks: () => [
      getBlock('header', {
        brandName: 'CloudFlow',
        primaryBtn: { text: 'Ücretsiz Başla', url: '#pricing', variant: 'solid' }
      }),
      getBlock('hero', {
        badge: 'YAPAY ZEKA DESTEKLİ BULUT PLATFORMU',
        title: 'Verilerinizi Güvenle Yönetin, İşinizi Hızlandırın',
        subtitle: 'Bulut altyapınızı tek bir merkezi kontrol panelinden izleyin, otomatik ölçeklendirin ve ekibinizle gerçek zamanlı iş birliği yapın.',
        primaryBtn: { text: '14 Gün Ücretsiz Dene', url: '#pricing', variant: 'solid' },
        secondaryBtn: { text: 'Canlı Demo İzle', url: '#features' }
      }),
      getBlock('features', {
        badge: 'ÖNE ÇIKAN YETENEKLER',
        title: 'Neden CloudFlow?',
        subtitle: 'Binlerce şirketin altyapısını bize emanet etmesinin en önemli nedenleri.'
      }),
      getBlock('about', {
        badge: 'GÜVENLİK VE GÜVENİLİRLİK',
        title: 'Kurumsal Seviyede Güvenlik ve Sıfır Kesinti',
        content: 'Verileriniz askeri düzeyde 256-bit şifreleme ile korunur. Çoklu bölge yedekliliğimiz sayesinde sisteminiz her zaman kesintisiz çalışmaya devam eder.'
      }),
      getBlock('pricing', {
        title: 'Şeffaf ve Esnek Fiyatlandırma'
      }),
      getBlock('testimonials', {
        title: 'Lider Şirketlerin Tercihi'
      }),
      getBlock('cta', {
        title: 'Bulut Yolculuğunuza Bugün Başlayın',
        subtitle: 'Dakikalar içinde kurulum yapın, hiçbir taahhüt olmadan dilediğiniz zaman iptal edin.'
      }),
      getBlock('footer', {
        brandName: 'CloudFlow',
        content: 'Geleceğin bulut altyapı çözümü.'
      })
    ]
  },
  {
    id: 'creative-agency',
    name: 'Tasarım Stüdyosu & Ajans',
    category: 'Yaratıcı',
    description: 'Tasarımcılar, yaratıcı ajanslar ve sanat yönetmenleri için prestijli, minimalist portföy.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80',
    createBlocks: () => [
      getBlock('header', {
        brandName: 'ATELIER',
        styles: {
          backgroundColor: '#09090B',
          textColor: '#FAFAFA',
          accentColor: '#E2E8F0',
          paddingY: 'compact',
          borderBottom: true
        }
      }),
      getBlock('hero', {
        badge: 'YARATICI STÜDYO & MARKA DANIŞMANLIĞI',
        title: 'Etkileyici Marka Deneyimleri Tasarlıyoruz',
        subtitle: 'Fikirleri unutulmaz görsel kimliklere ve dijital ürünlere dönüştüren multidisipliner tasarım kolektifi.',
        image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
        primaryBtn: { text: 'Projelerimizi Görün', url: '#gallery', variant: 'solid' },
        secondaryBtn: { text: 'İletişime Geçin', url: '#contact' },
        styles: {
          backgroundColor: '#09090B',
          textColor: '#FAFAFA',
          accentColor: '#FFFFFF',
          paddingY: 'relaxed',
          alignment: 'center'
        }
      }),
      getBlock('gallery', {
        badge: 'ÖDÜLLÜ ÇALIŞMALAR',
        title: 'Son Tasarım Projelerimiz',
        subtitle: 'Küresel markalar ve yenilikçi girişimler için yarattığımız kimlikler.',
        styles: {
          backgroundColor: '#121215',
          textColor: '#FAFAFA'
        }
      }),
      getBlock('services', {
        badge: 'NELER YAPIYORUZ?',
        title: 'Kapsamlı Yaratıcı Hizmetler',
        styles: {
          backgroundColor: '#09090B',
          textColor: '#FAFAFA'
        }
      }),
      getBlock('contact', {
        badge: 'BİRLİKTE ÜRETELİM',
        title: 'Yeni Projeniz İçin Bir Kahve İçelim',
        subtitle: 'Fikirlerinizi dinlemekten heyecan duyarız.',
        styles: {
          backgroundColor: '#121215',
          textColor: '#FAFAFA'
        }
      }),
      getBlock('footer', {
        brandName: 'ATELIER',
        content: 'Telif Hakkı © Atelier Design Collective. Tüm hakları saklıdır.',
        styles: {
          backgroundColor: '#050507',
          textColor: '#71717A'
        }
      })
    ]
  },
  {
    id: 'cafe-bistro',
    name: 'Gurme Kafe & Restoran',
    category: 'Hizmet & İşletme',
    description: 'Özel kahve dükkanları, butik fırınlar ve şık restoranlar için lezzet dolu vitrin.',
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80',
    createBlocks: () => [
      getBlock('header', {
        brandName: 'KAFE ROASTERY',
        primaryBtn: { text: 'Masa Ayırt', url: '#contact', variant: 'solid' },
        styles: {
          backgroundColor: '#18120C',
          textColor: '#F5EBE1',
          accentColor: '#D97706'
        }
      }),
      getBlock('hero', {
        badge: 'ÖZEL KAVRULMUŞ ÇEKİRDEKLER',
        title: 'Gerçek Nitelikli Kahve Deneyimi',
        subtitle: 'Dünyanın en iyi kahve çiftliklerinden özenle seçilen çekirdekler, ustalıkla kavrulup taze demleniyor.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
        primaryBtn: { text: 'Menüyü İncele', url: '#services', variant: 'solid' },
        secondaryBtn: { text: 'Bizi Ziyaret Edin', url: '#contact' },
        styles: {
          backgroundColor: '#18120C',
          textColor: '#F5EBE1',
          accentColor: '#D97706'
        }
      }),
      getBlock('services', {
        badge: 'LEZZET SEÇKİSİ',
        title: 'Özel Menümüz',
        subtitle: 'Günlük taze hamur işleri ve el yapımı kahveler.',
        styles: {
          backgroundColor: '#231B13',
          textColor: '#F5EBE1',
          accentColor: '#D97706'
        }
      }),
      getBlock('about', {
        badge: 'TUTKU VE HİKAYE',
        title: 'Kahveye Olan Tutkumuz 2018’de Başladı',
        content: 'Her fincanda toprağın, çiftçinin emeğinin ve kavurma sanatının izlerini taşıyoruz. Sıcak, samimi bir atmosferde unutulmaz anlar yaşamanız için çalışıyoruz.',
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80',
        styles: {
          backgroundColor: '#18120C',
          textColor: '#F5EBE1',
          accentColor: '#D97706'
        }
      }),
      getBlock('contact', {
        badge: 'REZERVASYON & ADRES',
        title: 'Sizi Ağırlamaktan Mutluluk Duyarız',
        styles: {
          backgroundColor: '#231B13',
          textColor: '#F5EBE1',
          accentColor: '#D97706'
        }
      }),
      getBlock('footer', {
        brandName: 'KAFE ROASTERY',
        content: 'Pazartesi - Pazar: 08:00 - 23:00 | Moda, Kadıköy',
        styles: {
          backgroundColor: '#120D09',
          textColor: '#A89F91'
        }
      })
    ]
  },
  {
    id: 'blank-slate',
    name: 'Boş Tuval (Sıfırdan Başla)',
    category: 'Özel',
    description: 'Hiçbir hazır blok olmadan tamamen sıfırdan kendi tasarımınızı oluşturun.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    createBlocks: () => [
      getBlock('header', {
        brandName: 'WebSitem',
        styles: { backgroundColor: '#0F172A', textColor: '#FFFFFF' }
      }),
      getBlock('hero', {
        badge: 'HOŞ GELDİNİZ',
        title: 'Kendi Sayfanızı Tasarlamaya Başlayın',
        subtitle: 'Sol taraftaki blokları sürükleyip buraya bırakarak sayfanızı dilediğiniz gibi genişletin.',
        primaryBtn: { text: 'Blok Ekle', url: '#', variant: 'solid' },
        styles: { backgroundColor: '#1E293B', textColor: '#FFFFFF' }
      }),
      getBlock('footer', {
        brandName: 'WebSitem',
        content: 'Sayfa tasarımcımız ile kolayca üretilmiştir.',
        styles: { backgroundColor: '#0F172A', textColor: '#94A3B8' }
      })
    ]
  }
];

export const getDefaultProject = (): Project => {
  const defaultTmpl = TEMPLATES[0];
  return {
    id: 'proj_' + Math.random().toString(36).substring(2, 9),
    title: 'Yeni Web Sitesi Projesi',
    pages: [
      {
        id: 'page_home',
        name: 'Ana Sayfa',
        slug: 'index',
        blocks: defaultTmpl.createBlocks()
      },
      {
        id: 'page_about',
        name: 'Hakkımızda',
        slug: 'hakkimizda',
        blocks: [
          getBlock('header', { brandName: 'CloudFlow' }),
          getBlock('about', {
            title: 'Hakkımızda & Vizyonumuz',
            content: 'Geleceğin teknolojisini bugünle buluşturan ekibimiz ve hikayemiz.'
          }),
          getBlock('testimonials'),
          getBlock('footer', { brandName: 'CloudFlow' })
        ]
      },
      {
        id: 'page_contact',
        name: 'İletişim',
        slug: 'iletisim',
        blocks: [
          getBlock('header', { brandName: 'CloudFlow' }),
          getBlock('contact'),
          getBlock('footer', { brandName: 'CloudFlow' })
        ]
      }
    ],
    activePageId: 'page_home',
    settings: {
      siteName: 'CloudFlow',
      siteDescription: 'Modern bulut ve web çözümleri platformu',
      primaryColor: '#2563EB',
      fontFamily: 'Plus Jakarta Sans',
      language: 'tr'
    },
    updatedAt: new Date().toISOString()
  };
};
