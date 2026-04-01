# Bütçe Kontrol

Türkçe bir kişisel bütçe takip uygulaması. Vite + React ile hazırlandı. Arayüzde mobil ve masaüstü uyumlu navigasyon, kartlar, grafikler ve işlem yönetimi bulunuyor.

## Özellikler

- Ana sayfada arka plan görseli + çarpıcı overlay
- Finans verilerini kategori bazlı gruplayabilme
- Gelir / gider işlemlerini ekleme, düzenleme, silme
- Dashboard özet kartları ve grafik görselleri
- Kategori yönetimi (ekle, düzenle, sil)
- Responsive tasarım (mobil ve masaüstü)
- Temiz ve modern tasarım (CSS değişkenleri, modüler stil)

## Geliştirme

1. Depoyu klonla

```bash
git clone <repo-url>
cd budget-app
```

2. Bağımlılıkları yükle

```bash
npm install
```

3. Geliştirme sunucusunu başlat

```bash
npm run dev
```

4. Tarayıcıda aç

`http://localhost:5173`

## Üretime hazırlık

```bash
npm run build
npm run preview
```

## Proje yapısı

- `src/main.jsx`: React uygulamasını başlatır
- `src/App.jsx`: Router ve sayfa yönlendirmesi
- `src/components`: yeniden kullanılabilir UI bileşenleri
- `src/pages`: sayfa düzeyinde bileşenler (Home, Dashboard, Transactions, Categories)
- `src/styles/theme.css`: global tema değişkenleri ve body arka planı
- `public/img/background.png`: ana arka plan görseli

## Özelleştirme

- `src/styles/theme.css` içinde renk ve tipografi değişkenleri
- `src/pages/Home/Home.module.css` içinde hero overlay opaklık ayarı
- `src/api` içinde veri katmanı (Supabase veya yerel mock API)

## Lisans

MIT

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
