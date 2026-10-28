# PT Ikhtiyar Karya Putra

Website company profile responsif, menggunakan HTML, CSS, dan JavaScript murni. Tidak memerlukan npm, dependensi aplikasi, atau proses build.

## Menjalankan

Dari direktori repositori:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Buka server pada port 8000 menggunakan browser. `index.html` juga dapat dibuka langsung; fitur salin menggunakan pemilihan teks sebagai cadangan jika Clipboard API tidak tersedia.

## Halaman

- `index.html` — Home, ringkasan perusahaan, layanan, konsep portofolio, dan alur kerja.
- `about.html` — About Us, nilai, visi, dan misi.
- `services.html` — Services, lingkup layanan dan FAQ.
- `projects.html` — Projects, filter kategori dan dialog detail konsep proyek.
- `contact.html` — Contact, validasi formulir, ringkasan pesan, salin dan unduh `.txt`.

## Menyesuaikan konten

- Isi **kontak resmi yang terverifikasi** di `assets/site-config.js`. Email dan telepon akan menjadi tautan yang dapat digunakan. Jika email resmi tersedia, hasil formulir juga menampilkan tombol untuk membuka aplikasi email dengan pesan yang telah disiapkan. Ini tidak mengirim email secara otomatis.
- Kontak, riwayat perusahaan, sertifikasi, statistik, dan daftar proyek aktual belum diberikan. Website tidak mencantumkan data tersebut sebagai fakta. Tinjau deskripsi layanan, visi, dan misi bersama perusahaan sebelum publikasi.
- Semua proyek ditandai **konsep ilustratif**, bukan rekam jejak perusahaan. Ganti kartu pada `index.html` dan `projects.html`, serta data dialog pada objek `projects` di `assets/main.js`, dengan data dan foto proyek yang telah mendapat izin publikasi.
- Logo merupakan wordmark dan simbol sementara yang dibuat untuk website ini; ganti jika logo resmi sudah tersedia.
- Warna, jarak, dan breakpoint ada di `assets/styles.css`. Font dan gambar tersedia lokal; tidak ada permintaan aset eksternal.
- Header dan footer adalah HTML statis pada setiap halaman. Perbarui kelimanya bila navigasi atau informasi bersama berubah.

## Formulir kontak

Formulir memvalidasi nama, email, layanan, deskripsi minimal 20 karakter, serta persetujuan pengguna. Nomor telepon bersifat opsional. Data tidak dikirim ke server, tidak disimpan dalam localStorage, dan hanya dipakai di browser untuk membuat ringkasan. Pengguna dapat menyalin atau mengunduh ringkasan tersebut. Mengubah isian menyembunyikan hasil sebelumnya agar ringkasan tidak kedaluwarsa.

Untuk menerima pesan langsung, integrasikan endpoint formulir yang benar-benar disiapkan dan tinjau kebijakan privasi. Jangan menaruh API key atau rahasia di JavaScript frontend.

## Publikasi

Unggah kelima berkas HTML dan direktori `assets/` ke layanan hosting statis. Pastikan `index.html` menjadi halaman awal. Tidak ada langkah build. Gunakan HTTPS agar Clipboard API tersedia; fallback pemilihan teks tetap ada.

## Aset dan atribusi

Lihat [ASSETS.md](ASSETS.md). Foto digunakan sebagai ilustrasi, bukan dokumentasi proyek perusahaan. Font Manrope disertai lisensi SIL Open Font License.
