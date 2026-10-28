# 8/D Sınıfı Ödev & LGS Takip Portalı

8/D sınıfı öğrencileri için paylaşımlı ödev listesi, tamamlandı kontrolü ve LGS çalışma takip platformu.

## 🚀 GitHub Pages ile Tamamen Ücretsiz Canlıya Alma (Deploy)

Bu proje, kodlarınızı GitHub'a her gönderdiğinizde (**push**) otomatik olarak derlenip **GitHub Pages** üzerinde ücretsiz olarak yayınlanacak şekilde (`.github/workflows/deploy.yml`) yapılandırılmıştır.

### 1. Kodu GitHub'a Gönderme (İlk Kurulum)

Terminalinizde aşağıdaki komutları sırasıyla çalıştırın:

```bash
git init
git add .
git commit -m "8/D Ödev & LGS Takip Portalı İlk Dağıtım"
git branch -M main
git remote add origin https://github.com/<GITHUB-KULLANICI-ADINIZ>/<REPO-ADINIZ>.git
git push -u origin main
```

### 2. GitHub Pages'i Aktif Etme

1. GitHub'da oluşturduğunuz deponun **Settings** (Ayarlar) sekmesine gidin.
2. Sol menüden **Pages** seçeneğine tıklayın.
3. **Build and deployment > Source** ayarını **"GitHub Actions"** olarak seçin.
4. Birkaç saniye içinde GitHub Actions otomatik olarak çalışacak ve siteniz aşağıdaki adreste yayına girecektir:
   ```
   https://<GITHUB-KULLANICI-ADINIZ>.github.io/<REPO-ADINIZ>/
   ```

---

## 🗄️ GitHub NoSQL Bulut Veritabanı Entegrasyonu (Sıfır Maliyet)

Farklı dağıtımlarda (re-deploy) ve güncellemelerde verilerinizin kaybolmaması için sistemde iki katmanlı NoSQL kalıcılığı bulunur:

1. **GitHub Gist NoSQL Cloud Veritabanı:**
   - Uygulama içindeki **GitHub** butonuna tıklayın.
   - GitHub Personal Access Token (Gist yetkisi olan) girin.
   - "GitHub'a Kaydet & Eşitle" butonuna basın.
   - Ödevler doğrudan GitHub Gist üzerinde JSON formatında NoSQL dokümanı olarak saklanır. Yeni bir deploy yapılsa bile verileriniz GitHub bulutunda kalır.
2. **Depo İçi Statik NoSQL:**
   - `public/data/homework.json` dosyasında tüm haftalık ödevler statik olarak yer alır.
3. **Öğrenci Yerel İşaretlemeleri:**
   - Her öğrencinin hangi ödevi bitirdiği bilgisi kendi tarayıcısında (`localStorage`) saklanır, sunucu deploy edilse dahi öğrencilerin işaretlemeleri silinmez.

---

## 🛠️ Yerel Geliştirme

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın (Port 3000)
npm run dev

# Üretim için derleyin
npm run build
```
