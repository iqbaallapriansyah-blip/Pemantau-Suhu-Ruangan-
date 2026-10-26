# Pemantau-Suhu-Ruangan-
# Tugas Pemrograman Web: program sederhana berbasis HTML, CSS, dan JavaScript yang menerapkan percabangan dan perulangan.

# Nama: Mohammad Iqbal Apriansyah
# NIM: 25534073
# Kelas: 3D Teknik Informatika

Program ini mencatat suhu beberapa ruangan, lalu otomatis menentukan kategorinya (Dingin, Sejuk, Nyaman, Hangat, atau Panas), memberi saran, dan menghitung statistiknya. Program terdiri dari tiga file: index.html sebagai kerangka halaman, style.css untuk tampilan, dan script.js untuk logika. Ketiganya harus berada di satu folder.

Saat pengguna mengisi nama ruangan dan suhu lalu menekan Tambah, program memeriksa dulu apakah nama tidak kosong dan suhu berupa angka di antara 0 dan 50. Kalau valid, program menentukan kategorinya, menyimpan datanya, lalu memperbarui statistik, batang sebaran, dan tabel.

Percabangan ada di fungsi tentukanKategori, dengan enam kondisi if / else if / else. Pertama dicek apakah suhu tidak valid (di bawah 0 atau di atas 50). Setelah itu, di bawah 18 adalah Dingin, di bawah 22 Sejuk, di bawah 27 Nyaman, di bawah 32 Hangat, dan sisanya Panas. Kondisi dicek dari atas ke bawah dan berhenti di kondisi pertama yang benar. Contohnya, suhu 31 lolos dari semua kondisi sampai “di bawah 32”, jadi hasilnya Hangat. Tanda < dipakai agar suhu desimal seperti 17,9 tidak terlewat di antara dua kategori.

Perulangan for dipakai di tiga tempat:

hitungStatistik: menghitung total, rata-rata, suhu tertinggi, dan terendah.
tampilkanTabel: membuat satu baris tabel untuk setiap ruangan.
tampilkanDistribusi: membuat lima baris batang sebaran.

Perulangan while dipakai di hitungDistribusi untuk menghitung jumlah ruangan di tiap kategori. Perulangan berjalan selama nomor data masih lebih kecil dari jumlah data, dan baris i++ wajib ada agar perulangan berhenti. Tanpa itu, program macet karena berputar tanpa akhir.
