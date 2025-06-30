# Smart Student Card Management System

Bu proje, üniversite öğrencileri için kart bakiyesi yönetimi, boş sınıf sorgulama, yemek menüsü ve ders programı gibi özellikleri tek bir sistem üzerinden sunmayı amaçlamaktadır.

## 📌 Assignment 2 – Use Case Implementation

### ✅ Uygulanan Kullanım Durumu:
**Kart Bakiye Görüntüleme ve Yükleme**

Öğrenci, kart bakiyesini görüntüleyebilir ve bakiye yükleme işlemi gerçekleştirebilir.

### 🔧 Kullanılan Design Pattern'lar:

- **Proxy Pattern**  
  - Amaç: Bakiye yükleme işleminden önce kullanıcı ve limit kontrolü yapmak  
  - Uygulama: Middleware ile yükleme kontrolü yapılmaktadır  

- **Adapter Pattern**  
  - Amaç: Harici bir ödeme sisteminden gelen veriyi projeye uygun hale getirmek  
  - Uygulama: Mock servis çıktısı adaptör aracılığıyla çevrilmektedir  

### 🧱 Mimaride Kullanılan Yapılar:
- React frontend (📁 `frontend/`)
- Node.js + Express backend (📁 `src/`)
- RESTful API yapısı
- MySQL veritabanı (önerilen)
