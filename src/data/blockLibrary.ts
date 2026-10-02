import { BlockData, BlockType } from '../types/builder';

export interface BlockTemplate {
  type: BlockType;
  label: string;
  category: 'Navigasyon' | 'Karşılama (Hero)' | 'Özellikler & Hizmetler' | 'İçerik & Hikaye' | 'Fiyatlandırma & Yorumlar' | 'İletişim & Kapanış';
  description: string;
  iconName: string;
  createDefault: () => BlockData;
}

const generateId = () => 'block_' + Math.random().toString(36).substring(2, 9);

export const BLOCK_LIBRARY: BlockTemplate[] = [
  // 1. Navigation Header
  {
    type: 'header',
    label: 'Navigasyon Menüsü',
    category: 'Navigasyon',
    description: 'Logo, sayfa bağlantıları ve sağ tarafta eylem butonu içeren modern üst menü.',
    iconName: 'Menu',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'header',
      brandName: 'WebStudio',
      title: 'WebStudio',
      navLinks: [
        { id: 'l1', label: 'Özellikler', href: '#features' },
        { id: 'l2', label: 'Hakkımızda', href: '#about' },
        { id: 'l3', label: 'Fiyatlandırma', href: '#pricing' },
        { id: 'l4', label: 'İletişim', href: '#contact' }
      ],
      primaryBtn: {
        text: 'Hemen Başla',
        url: '#pricing',
        variant: 'solid'
      },
      styles: {
        backgroundColor: '#0F172A',
        textColor: '#FFFFFF',
        accentColor: '#2563EB',
        paddingY: 'compact',
        borderBottom: true,
        maxWidth: 'wide'
      }
    })
  },

  // 2. Hero Section
  {
    type: 'hero',
    label: 'Modern SaaS Hero',
    category: 'Karşılama (Hero)',
    description: 'Büyük çarpıcı başlık, açıklama metni, iki eylem butonu ve görsel vitrini.',
    iconName: 'Sparkles',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'hero',
      badge: 'YENİ NESİL WEB PLATFORMU',
      title: 'Kod Yazmadan Çarpıcı Web Siteleri Tasarlayın',
      subtitle: 'Sürükle bırak editörümüzle dakikalar içinde modern, mobil uyumlu ve yüksek dönüşümlü web sayfaları oluşturun. Yayınlamaya hazır temiz kod dışa aktarın.',
      primaryBtn: {
        text: 'Ücretsiz Deneyin',
        url: '#features',
        variant: 'solid'
      },
      secondaryBtn: {
        text: 'Canlı Demo İncele',
        url: '#gallery'
      },
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      styles: {
        backgroundColor: '#0F172A',
        textColor: '#FFFFFF',
        accentColor: '#2563EB',
        paddingY: 'relaxed',
        alignment: 'center',
        maxWidth: 'wide'
      }
    })
  },

  // 3. Split 2-Column Hero
  {
    type: 'hero',
    label: '2 Kolonlu Bölünmüş Hero',
    category: 'Karşılama (Hero)',
    description: 'Sol tarafta başlık ve çağrı butonu, sağ tarafta büyük ürün veya tasarım görseli.',
    iconName: 'LayoutTemplate',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'hero',
      badge: 'DİJİTAL DÖNÜŞÜM',
      title: 'Fikirlerinizi Gerçek Web Sitelerine Dönüştürün',
      subtitle: 'Tasarım stüdyomuz işletmenizin dijital varlığını güçlendiren modern arayüzler ve kusursuz kullanıcı deneyimleri sunar.',
      primaryBtn: {
        text: 'Teklif Alın',
        url: '#contact',
        variant: 'solid'
      },
      secondaryBtn: {
        text: 'Portföyümüz',
        url: '#about'
      },
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
      styles: {
        backgroundColor: '#1E293B',
        textColor: '#F8FAFC',
        accentColor: '#3B82F6',
        paddingY: 'relaxed',
        alignment: 'left',
        maxWidth: 'wide'
      }
    })
  },

  // 4. Features Grid
  {
    type: 'features',
    label: '3 Kolonlu Özellikler',
    category: 'Özellikler & Hizmetler',
    description: 'İkonlar, başlıklar ve detaylı açıklamalar içeren 3 kolonlu modern özellik ızgarası.',
    iconName: 'Grid3X3',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'features',
      badge: 'GÜÇLÜ YETENEKLER',
      title: 'Tasarımınızı Bir Üst Seviyeye Taşıyın',
      subtitle: 'Her seviyeden kullanıcının profesyonel sonuçlar alabilmesi için geliştirilmiş araçlar.',
      cards: [
        {
          id: 'c1',
          title: 'Görsel Sürükle & Bırak',
          description: 'Bileşenleri dilediğiniz gibi sürükleyin, yerlerini değiştirin ve anında sonucu görün.',
          icon: 'Move'
        },
        {
          id: 'c2',
          title: 'Kusursuz Mobil Uyum',
          description: 'Tüm tasarımlar otomatik olarak akıllı telefonlar, tabletler ve masaüstü ekranlar için optimize edilir.',
          icon: 'Smartphone'
        },
        {
          id: 'c3',
          title: 'Temiz Kod Dışa Aktarma',
          description: 'Oluşturduğunuz sayfayı tek tıkla saf HTML & Tailwind CSS olarak indirin veya dilediğiniz sunucuya yükleyin.',
          icon: 'Code'
        }
      ],
      styles: {
        backgroundColor: '#0F172A',
        textColor: '#FFFFFF',
        accentColor: '#2563EB',
        paddingY: 'relaxed',
        alignment: 'center',
        maxWidth: 'wide'
      }
    })
  },

  // 5. About / Story Section
  {
    type: 'about',
    label: 'Hakkımızda & Hikaye',
    category: 'İçerik & Hikaye',
    description: 'Görsel ve detaylı metin içeren 2 kolonlu hikaye veya şirket tanıtım bölümü.',
    iconName: 'BookOpen',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'about',
      badge: 'BİZ KİMİZ?',
      title: 'Yaratıcılık ve Mühendisliğin Buluştuğu Nokta',
      content: '2020 yılından bu yana binlerce girişimci, ajans ve bağımsız üretici için web tasarımını kolaylaştırıyoruz. Amacımız, teknik bilgiye ihtiyaç duymadan herkesin dünya standartlarında web siteleri inşa edebilmesini sağlamaktır.',
      primaryBtn: {
        text: 'Hikayemizi Keşfedin',
        url: '#contact',
        variant: 'solid'
      },
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
      styles: {
        backgroundColor: '#0B0F19',
        textColor: '#F1F5F9',
        accentColor: '#2563EB',
        paddingY: 'relaxed',
        alignment: 'left',
        maxWidth: 'wide'
      }
    })
  },

  // 6. Services Grid
  {
    type: 'services',
    label: 'Hizmet Kartları',
    category: 'Özellikler & Hizmetler',
    description: 'Etkileyici görsel kartlar, hizmet başlıkları ve aksiyon butonları.',
    iconName: 'Briefcase',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'services',
      badge: 'UZMANLIK ALANLARIMIZ',
      title: 'İhtiyacınıza Uygun Dijital Çözümler',
      subtitle: 'Modern web dünyasında işletmenizi öne çıkaracak kapsamlı hizmet yelpazemiz.',
      cards: [
        {
          id: 's1',
          title: 'UI/UX Arayüz Tasarımı',
          description: 'Kullanıcı odaklı, estetik ve yüksek dönüşüm sağlayan modern arayüzler tasarlıyoruz.',
          image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
          linkText: 'Detaylı Bilgi'
        },
        {
          id: 's2',
          title: 'Özel Web Geliştirme',
          description: 'Hızlı yüklenen, SEO uyumlu ve ölçeklenebilir modern web uygulamaları geliştiriyoruz.',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
          linkText: 'Detaylı Bilgi'
        },
        {
          id: 's3',
          title: 'Performans & SEO Optimizasyonu',
          description: 'Google arama sonuçlarında üst sıralarda yer almanız için teknik ve içerik optimizasyonu.',
          image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80',
          linkText: 'Detaylı Bilgi'
        }
      ],
      styles: {
        backgroundColor: '#111827',
        textColor: '#FFFFFF',
        accentColor: '#3B82F6',
        paddingY: 'relaxed',
        alignment: 'center',
        maxWidth: 'wide'
      }
    })
  },

  // 7. Pricing Table
  {
    type: 'pricing',
    label: 'Fiyatlandırma Tablosu',
    category: 'Fiyatlandırma & Yorumlar',
    description: 'Öne çıkan popüler paket rozeti, fiyatlar ve madde madde özellik listesi.',
    iconName: 'CreditCard',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'pricing',
      badge: 'ŞEFFAF FİYATLAR',
      title: 'Bütçenize Uygun Basit Planlar',
      subtitle: 'Gizli ücret yok. İhtiyacınıza uygun paketi seçin ve hemen kullanmaya başlayın.',
      cards: [
        {
          id: 'p1',
          title: 'Başlangıç',
          price: '₺299',
          period: '/aylık',
          description: 'Kişisel projeler ve bireysel portföyler için ideal.',
          features: [
            '1 Web Sitesi',
            'Sürükle Bırak Editör',
            'Standart Şablonlar',
            'Topluluk Desteği'
          ],
          linkText: 'Başlangıç Seç',
          highlighted: false
        },
        {
          id: 'p2',
          title: 'Profesyonel',
          price: '₺699',
          period: '/aylık',
          description: 'Büyüyen işletmeler ve profesyonel içerik üreticileri için.',
          features: [
            'Sınırsız Web Sitesi',
            'Tüm Premium Şablonlar',
            'Temiz Kod Dışa Aktarma (HTML/CSS)',
            'Özel Alan Adı Desteği',
            '7/24 Öncelikli Destek'
          ],
          linkText: 'Pro ile Başla',
          highlighted: true
        },
        {
          id: 'p3',
          title: 'Kurumsal',
          price: '₺1.499',
          period: '/aylık',
          description: 'Ajanslar ve büyük ölçekli kurumsal ekipler için.',
          features: [
            'Sınırsız Ekip Üyesi',
            'Özel Bileşen Geliştirme',
            'API Entegrasyonu & Webhook',
            'Özel Müşteri Temsilcisi',
            '%99.9 Uptime Garantisi'
          ],
          linkText: 'İletişime Geç',
          highlighted: false
        }
      ],
      styles: {
        backgroundColor: '#0F172A',
        textColor: '#FFFFFF',
        accentColor: '#2563EB',
        paddingY: 'relaxed',
        alignment: 'center',
        maxWidth: 'wide'
      }
    })
  },

  // 8. Testimonials
  {
    type: 'testimonials',
    label: 'Müşteri Yorumları & Referans',
    category: 'Fiyatlandırma & Yorumlar',
    description: 'Müşteri alıntıları, avatarlar, isimler ve şirket bilgileri.',
    iconName: 'MessageSquareQuote',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'testimonials',
      badge: 'MUTLU MÜŞTERİLER',
      title: 'Kullanıcılarımız Bizim İçin Ne Diyor?',
      subtitle: 'Platformumuzla web sitelerini oluşturan yüzlerce profesyonelin gerçek deneyimleri.',
      cards: [
        {
          id: 't1',
          title: 'İnanılmaz Hızlı ve Kolay',
          description: 'Bir haftada bitiremeyeceğimiz kurumsal web sitemizi bu platform sayesinde sadece 2 saatte tamamlayıp yayına aldık.',
          author: 'Elif Yılmaz',
          role: 'Tasarım Direktörü, Nova Ajans',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
        },
        {
          id: 't2',
          title: 'Dışa Aktarılan Kod Çok Temiz',
          description: 'Görsel editörden aldığım HTML ve Tailwind çıktısını doğrudan üretim sunucuma entegre edebildim. Kod kalitesi mükemmel.',
          author: 'Mert Aksoy',
          role: 'Kıdemli Yazılım Mimarı',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
        },
        {
          id: 't3',
          title: 'Mobil Uyumluluk Harika',
          description: 'Sayfayı tasarlarken anında mobil görünümde kontrol edebilmek büyük bir konfor. Kesinlikle tavsiye ediyorum.',
          author: 'Selin Demir',
          role: 'E-Ticaret Danışmanı',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        }
      ],
      styles: {
        backgroundColor: '#1E293B',
        textColor: '#F8FAFC',
        accentColor: '#3B82F6',
        paddingY: 'relaxed',
        alignment: 'center',
        maxWidth: 'wide'
      }
    })
  },

  // 9. Gallery / Portfolio
  {
    type: 'gallery',
    label: 'Görsel Vitrini & Galeri',
    category: 'İçerik & Hikaye',
    description: 'Büyük görsel ızgarası ile portföy, ürün veya mekan fotoğraflarını sergileyin.',
    iconName: 'Image',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'gallery',
      badge: 'SEÇİLMİŞ ÇALIŞMALAR',
      title: 'En Son Tasarım ve Projelerimiz',
      subtitle: 'Detaylara gösterdiğimiz özeni yansıtan özel çalışmalarımızdan bir kesit.',
      cards: [
        {
          id: 'g1',
          title: 'Minimalist E-Ticaret Arayüzü',
          description: 'Moda ve yaşam tarzı markası için özel arayüz tasarımı',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'g2',
          title: 'Finansal Analiz Paneli',
          description: 'Yatırımcılar için gerçek zamanlı veri görselleştirme',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'g3',
          title: 'Mobil Sağlık Uygulaması',
          description: 'Kişisel egzersiz ve beslenme takip sistemi',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
        }
      ],
      styles: {
        backgroundColor: '#0F172A',
        textColor: '#FFFFFF',
        accentColor: '#2563EB',
        paddingY: 'relaxed',
        alignment: 'center',
        maxWidth: 'wide'
      }
    })
  },

  // 10. FAQ Section
  {
    type: 'faq',
    label: 'Sıkça Sorulan Sorular',
    category: 'İçerik & Hikaye',
    description: 'Ziyaretçilerinizin aklındaki soruları yanıtlayan modern soru-cevap bölümü.',
    iconName: 'HelpCircle',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'faq',
      badge: 'YARDIM & DESTEK',
      title: 'Sıkça Sorulan Sorular',
      subtitle: 'Platform hakkında en çok merak edilen soruların yanıtlarını derledik.',
      cards: [
        {
          id: 'f1',
          title: 'Kod yazma bilgisi gerekiyor mu?',
          description: 'Hayır, kesinlikle gerekmez. Görsel sürükle bırak araçlarımız ile teknik bilgiye sahip olmadan dakikalar içinde harika siteler oluşturabilirsiniz.'
        },
        {
          id: 'f2',
          title: 'Kendi alan adımı (domain) bağlayabilir miyim?',
          description: 'Evet. Profesyonel ve Kurumsal paketlerimizde kendi .com, .net veya dilediğiniz özel alan adınızı kolayca yönlendirebilirsiniz.'
        },
        {
          id: 'f3',
          title: 'Sayfamı HTML olarak indirebilir miyim?',
          description: 'Kesinlikle! Tek tıkla "Kodu Dışa Aktar" butonuna basarak temiz, optimize edilmiş HTML ve Tailwind CSS dosyalarınızı indirebilirsiniz.'
        },
        {
          id: 'f4',
          title: 'Sitem mobil cihazlarda düzgün görünecek mi?',
          description: 'Evet, hazırladığımız tüm bloklar ve şablonlar mobil cihazlar için %100 duyarlı (responsive) olarak tasarlanmıştır.'
        }
      ],
      styles: {
        backgroundColor: '#1E293B',
        textColor: '#FFFFFF',
        accentColor: '#3B82F6',
        paddingY: 'relaxed',
        alignment: 'center',
        maxWidth: 'medium'
      }
    })
  },

  // 11. CTA Banner
  {
    type: 'cta',
    label: 'Dönüşüm Çağrısı (CTA)',
    category: 'İletişim & Kapanış',
    description: 'Ziyaretçileri harekete geçiren yüksek kontrastlı eylem çağrısı bandı.',
    iconName: 'Megaphone',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'cta',
      badge: 'HEMEN BAŞLAYIN',
      title: 'Hayalinizdeki Web Sitesini Bugün İnşa Edin',
      subtitle: 'Kredi kartı gerekmez. Saniyeler içinde kaydolun ve ücretsiz olarak tasarlamaya başlayın.',
      primaryBtn: {
        text: 'Ücretsiz Hesap Oluştur',
        url: '#pricing',
        variant: 'solid'
      },
      secondaryBtn: {
        text: 'Bize Ulaşın',
        url: '#contact'
      },
      styles: {
        backgroundColor: '#1D4ED8',
        textColor: '#FFFFFF',
        accentColor: '#FFFFFF',
        paddingY: 'relaxed',
        alignment: 'center',
        maxWidth: 'wide'
      }
    })
  },

  // 12. Contact Form & Info
  {
    type: 'contact',
    label: 'İletişim Formu & Bilgiler',
    category: 'İletişim & Kapanış',
    description: 'Adres, e-posta, telefon bilgileri ve ziyaretçiler için iletişim formu.',
    iconName: 'Mail',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'contact',
      badge: 'İLETİŞİME GEÇİN',
      title: 'Bir Projeniz mi Var? Konuşalım.',
      subtitle: 'Sorularınız, iş ortaklığı veya özel projeleriniz için bize dilediğiniz zaman ulaşabilirsiniz.',
      cards: [
        {
          id: 'ct1',
          title: 'E-Posta Gönderin',
          description: 'destek@webstudio.com\nOrtalama 2 saatte yanıt veriyoruz.',
          icon: 'Mail'
        },
        {
          id: 'ct2',
          title: 'Telefon & WhatsApp',
          description: '+90 (212) 555 0199\nHafta içi 09:00 - 18:00',
          icon: 'Phone'
        },
        {
          id: 'ct3',
          title: 'Ofisimiz',
          description: 'Levent Maslak Cad. No: 42\nŞişli, İstanbul',
          icon: 'MapPin'
        }
      ],
      styles: {
        backgroundColor: '#0F172A',
        textColor: '#FFFFFF',
        accentColor: '#2563EB',
        paddingY: 'relaxed',
        alignment: 'center',
        maxWidth: 'wide'
      }
    })
  },

  // 13. Comprehensive Footer
  {
    type: 'footer',
    label: 'Alt Bilgi (Footer)',
    category: 'İletişim & Kapanış',
    description: 'Telif hakkı, sosyal medya bağlantıları ve sayfa linkleri içeren alt bilgi.',
    iconName: 'PanelBottom',
    createDefault: (): BlockData => ({
      id: generateId(),
      type: 'footer',
      brandName: 'WebStudio',
      title: 'WebStudio',
      content: 'Herkes için hızlı, modern ve görsel web tasarım platformu. Kod yazmadan profesyonel sonuçlar elde edin.',
      navLinks: [
        { id: 'fl1', label: 'Özellikler', href: '#features' },
        { id: 'fl2', label: 'Hakkımızda', href: '#about' },
        { id: 'fl3', label: 'Fiyatlandırma', href: '#pricing' },
        { id: 'fl4', label: 'Gizlilik Politikası', href: '#' },
        { id: 'fl5', label: 'Kullanım Koşulları', href: '#' }
      ],
      styles: {
        backgroundColor: '#090D16',
        textColor: '#94A3B8',
        accentColor: '#38BDF8',
        paddingY: 'normal',
        alignment: 'left',
        maxWidth: 'wide'
      }
    })
  }
];
