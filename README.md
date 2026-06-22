# 🎨 UI Palette - Modern Renk Paleti Yönetim Uygulaması

UI Palette, web geliştiricileri ve UI/UX tasarımcıları için geliştirilmiş, minimalist tasarıma sahip, dinamik ve kullanıcı dostu bir renk paleti oluşturma, listeleme ve yönetim platformudur. Proje, modern web standartları ve performans optimizasyonları göz önünde bulundurularak bir Bilgisayar Mühendisliği dönem projesi olarak geliştirilmiştir.

---

## 🚀 Canlı Önizleme
Uygulamanın yayındaki canlı haline aşağıdaki bağlantıdan erişebilirsiniz:
👉 deluxe-sprinkles-b5c084.netlify.app

---

## 🛠️ Teknik Mimari ve Teknolojiler

Proje, güncel frontend mimarilerine ve katı tip/konfigürasyon kurallarına uygun olarak inşa edilmiştir:

* **Kütüphane / Framework:** React 19 (En güncel sürüm, performans odaklı render motoru)
* **Derleyici ve Paketleyici:** Vite (Hızlı hot-reload ve optimize edilmiş build çıktısı için)
* **Stil Yönetimi (UI):** Tailwind CSS v4 (Katı konfigürasyon kurallarına sahip, modern ve performanslı CSS mimarisi)
* **Veri Yönetimi (State Management):** React Context API (Global bildirim ve palet durum yönetimi)
* **Yerel Veri Tabanı (Storage):** IndexedDB (Kullanıcı paletlerinin tarayıcı kapansa dahi kalıcı olarak hafızada tutulması için asenkron yerel veri tabanı mimarisi)

---

## 💡 Öne Çıkan Özellikler

* **Canlı Listeleme ve Arama:** Ana sayfada dinamik grid yapısı ile paletlerin listelenmesi ve arama çubuğu üzerinden anlık (real-time) filtreleme mimarisi.
* **Kalıcı Hafıza:** `usePalettes` özel hook'u vasıtasıyla IndexedDB entegrasyonu ve verilerin tarayıcıda güvenle saklanması.
* **Tek Tıkla Kopyalama:** Paletteki herhangi bir renge tıklandığında HEX kodunun panoya otomatik kopyalanması.
* **Global Bildirim (Toast Notification):** Kopyalama ve yönetim işlemlerinde ekranın sağ alt köşesinde beliren asenkron bildirim sistemi.

---

## 💻 Yerel Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. Projeyi bilgisayarınıza indirin veya klonlayın.
2. Terminalde proje kök dizinine (`ui-palette`) geçiş yapın:
   ```bash
   cd ui-palette
   
1.Gerekli bağımlılıkları yükleyin:   

```bash
npm install
````

2.Projeyi lokal sunucuda başlatın:

```bash
npm run dev
````

Tarayıcınızda http://localhost:5173/ adresine giderek uygulamayı test edin.




