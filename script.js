// ===== Data =====
// Semua data ruangan disimpan di array ini. Tiap elemen: { ruangan, suhu, kategori }
const daftarRuangan = [];

// Urutan kategori untuk bagian "Sebaran kategori suhu"
const urutanKategori = [
  { kode: "dingin", nama: "Dingin" },
  { kode: "sejuk", nama: "Sejuk" },
  { kode: "nyaman", nama: "Nyaman" },
  { kode: "hangat", nama: "Hangat" },
  { kode: "panas", nama: "Panas" }
];

// ===== Elemen HTML =====
const formSuhu = document.getElementById("form-suhu");
const inputRuangan = document.getElementById("input-ruangan");
const inputSuhu = document.getElementById("input-suhu");
const elemenPesan = document.getElementById("pesan");
const tombolHapus = document.getElementById("tombol-hapus");
const isiTabel = document.getElementById("isi-tabel");
const elemenDistribusi = document.getElementById("distribusi");

// ===== PERCABANGAN =====
// Menentukan kategori dari suhu ruangan (satuan °C). Ada 6 kondisi:
// 1 untuk suhu tidak valid dan 5 untuk kategori dingin sampai panas.
function tentukanKategori(suhu) {
  if (suhu < 0 || suhu > 50) {
    return { kode: "tidak-valid", nama: "Tidak valid", saran: "Suhu di luar rentang 0 sampai 50 °C." };
  } else if (suhu < 18) {
    return { kode: "dingin", nama: "Dingin", saran: "Kurangi pendingin atau tambah pemanas." };
  } else if (suhu < 22) {
    return { kode: "sejuk", nama: "Sejuk", saran: "Masih nyaman, cukup pakai pakaian hangat." };
  } else if (suhu < 27) {
    return { kode: "nyaman", nama: "Nyaman", saran: "Pertahankan suhu ruangan." };
  } else if (suhu < 32) {
    return { kode: "hangat", nama: "Hangat", saran: "Nyalakan kipas atau buka ventilasi." };
  } else {
    return { kode: "panas", nama: "Panas", saran: "Nyalakan AC dan periksa ventilasi." };
  }
}

// ===== PERULANGAN FOR =====
// Menghitung jumlah, rata-rata, suhu tertinggi, dan suhu terendah.
function hitungStatistik() {
  if (daftarRuangan.length === 0) {
    return null;
  }

  let total = 0;
  let tertinggi = daftarRuangan[0].suhu;
  let terendah = daftarRuangan[0].suhu;

  for (let i = 0; i < daftarRuangan.length; i++) {
    const suhu = daftarRuangan[i].suhu;
    total += suhu;

    if (suhu > tertinggi) {
      tertinggi = suhu;
    }
    if (suhu < terendah) {
      terendah = suhu;
    }
  }

  return {
    jumlah: daftarRuangan.length,
    rataRata: total / daftarRuangan.length,
    tertinggi: tertinggi,
    terendah: terendah
  };
}

// ===== PERULANGAN WHILE =====
// Menghitung berapa ruangan untuk tiap kategori suhu.
function hitungDistribusi() {
  const hitungan = { dingin: 0, sejuk: 0, nyaman: 0, hangat: 0, panas: 0 };

  let i = 0;
  while (i < daftarRuangan.length) {
    const kode = daftarRuangan[i].kategori.kode;
    hitungan[kode] = hitungan[kode] + 1;
    i++;
  }

  return hitungan;
}

// ===== Menampilkan hasil ke halaman =====
function tampilkanPesan(teks, galat) {
  elemenPesan.textContent = teks;
  elemenPesan.classList.toggle("galat", galat);
}

function tampilkanStatistik() {
  const statistik = hitungStatistik();

  if (statistik === null) {
    document.getElementById("stat-jumlah").textContent = "-";
    document.getElementById("stat-rata").textContent = "-";
    document.getElementById("stat-tertinggi").textContent = "-";
    document.getElementById("stat-terendah").textContent = "-";
    return;
  }

  document.getElementById("stat-jumlah").textContent = statistik.jumlah;
  document.getElementById("stat-rata").textContent = statistik.rataRata.toFixed(1) + " °C";
  document.getElementById("stat-tertinggi").textContent = statistik.tertinggi + " °C";
  document.getElementById("stat-terendah").textContent = statistik.terendah + " °C";
}

// Memakai perulangan for untuk membuat satu baris tabel per ruangan.
function tampilkanTabel() {
  isiTabel.innerHTML = "";

  if (daftarRuangan.length === 0) {
    const baris = document.createElement("tr");
    const sel = document.createElement("td");
    sel.colSpan = 5;
    sel.className = "kosong";
    sel.textContent = "Belum ada data. Isi formulir di atas untuk menambah suhu ruangan.";
    baris.appendChild(sel);
    isiTabel.appendChild(baris);
    return;
  }

  for (let i = 0; i < daftarRuangan.length; i++) {
    const data = daftarRuangan[i];
    const baris = document.createElement("tr");

    const selNo = document.createElement("td");
    selNo.textContent = i + 1;

    const selRuangan = document.createElement("td");
    selRuangan.textContent = data.ruangan;

    const selSuhu = document.createElement("td");
    selSuhu.textContent = data.suhu + " °C";

    const selKategori = document.createElement("td");
    const lencana = document.createElement("span");
    lencana.className = "lencana kat-" + data.kategori.kode;
    lencana.textContent = data.kategori.nama;
    selKategori.appendChild(lencana);

    const selSaran = document.createElement("td");
    selSaran.textContent = data.kategori.saran;

    baris.appendChild(selNo);
    baris.appendChild(selRuangan);
    baris.appendChild(selSuhu);
    baris.appendChild(selKategori);
    baris.appendChild(selSaran);
    isiTabel.appendChild(baris);
  }
}

// Memakai perulangan for untuk membuat 5 baris batang (dingin sampai panas).
function tampilkanDistribusi() {
  const hitungan = hitungDistribusi();
  elemenDistribusi.innerHTML = "";

  for (let i = 0; i < urutanKategori.length; i++) {
    const kode = urutanKategori[i].kode;
    const jumlah = hitungan[kode];

    let persen = 0;
    if (daftarRuangan.length > 0) {
      persen = (jumlah / daftarRuangan.length) * 100;
    }

    const baris = document.createElement("div");
    baris.className = "baris-distribusi";

    const label = document.createElement("span");
    label.textContent = urutanKategori[i].nama;

    const jalur = document.createElement("div");
    jalur.className = "jalur";
    const isi = document.createElement("div");
    isi.className = "isi-jalur kat-" + kode;
    isi.style.width = persen + "%";
    jalur.appendChild(isi);

    const angka = document.createElement("span");
    angka.className = "jumlah-distribusi";
    angka.textContent = jumlah;

    baris.appendChild(label);
    baris.appendChild(jalur);
    baris.appendChild(angka);
    elemenDistribusi.appendChild(baris);
  }
}

function perbaruiTampilan() {
  tampilkanStatistik();
  tampilkanDistribusi();
  tampilkanTabel();
}

// ===== Event =====
formSuhu.addEventListener("submit", function (event) {
  event.preventDefault();

  const ruangan = inputRuangan.value.trim();
  const teksSuhu = inputSuhu.value.trim();
  const suhu = Number(teksSuhu);

  if (ruangan === "") {
    tampilkanPesan("Nama ruangan tidak boleh kosong.", true);
    return;
  }

  if (teksSuhu === "" || !Number.isFinite(suhu)) {
    tampilkanPesan("Suhu harus diisi dengan angka.", true);
    return;
  }

  const kategori = tentukanKategori(suhu);

  if (kategori.kode === "tidak-valid") {
    tampilkanPesan("Suhu harus berada di antara 0 dan 50 °C.", true);
    return;
  }

  daftarRuangan.push({ ruangan: ruangan, suhu: suhu, kategori: kategori });
  tampilkanPesan(ruangan + " (" + suhu + " °C) termasuk kategori " + kategori.nama + ".", false);

  formSuhu.reset();
  inputRuangan.focus();
  perbaruiTampilan();
});

tombolHapus.addEventListener("click", function () {
  daftarRuangan.length = 0;
  tampilkanPesan("Semua data dihapus.", false);
  perbaruiTampilan();
});

// Tampilan awal saat halaman dibuka
perbaruiTampilan();
