console.log("=== FILE SCRIPT.JS BERHASIL TERHUBUNG ===");

const daftarMataKuliah = [
  { kode: "14823372", nama: "STATISTIKA DAN PROBABILITAS", sks: 2, nilaiAngka: 6, nilaiHuruf: "B" },
  { kode: "14823393", nama: "INTERAKSI MANUSIA KOMPUTER", sks: 3, nilaiAngka: 10.5, nilaiHuruf: "AB" },
  { kode: "14823333", nama: "ALGORITMA DAN STRUKTUR DATA", sks: 3, nilaiAngka: 10.5, nilaiHuruf: "AB" },
  { kode: "14823313", nama: "SISTEM BASIS DATA", sks: 3, nilaiAngka: 9, nilaiHuruf: "B" },
  { kode: "14823274", nama: "PEMROGRAMAN BERORIENTASI OBJEK", sks: 4, nilaiAngka: 16, nilaiHuruf: "A" },
  { kode: "14823192", nama: "ARSITEKTUR DAN ORGANISASI KOMPUTER", sks: 2, nilaiAngka: 7, nilaiHuruf: "AB" },
  { kode: "14823153", nama: "TEKNOLOGI INFORMASI DAN APLIKASI BISNIS BERKEMBANG", sks: 3, nilaiAngka: 10.5, nilaiHuruf: "AB" },
  { kode: "14823532", nama: "BAHASA INGGRIS", sks: 4, nilaiAngka: 8, nilaiHuruf: "A" },
  { kode: "14823362", nama: "KALKULUS", sks: 2, nilaiAngka: 7, nilaiHuruf: "AB" },
  { kode: "14823352", nama: "MATEMATIKA DISKRIT", sks: 2, nilaiAngka: 6, nilaiHuruf: "AB" },
  { kode: "14823342", nama: "ALJABAR LINIER", sks: 2, nilaiAngka: 6, nilaiHuruf: "AB" },
  { kode: "14823323", nama: "DASAR PEMROGRAMAN", sks: 3, nilaiAngka: 9, nilaiHuruf: "B" },
  { kode: "14823202", nama: "SISTEM OPERASI", sks: 2, nilaiAngka: 6, nilaiHuruf: "B" },
  { kode: "14823274", nama: "KONSEP DAN FONDASI SISTEM INFORMASI", sks: 3, nilaiAngka: 10.5, nilaiHuruf: "B" },
  { kode: "14823012", nama: "ETIKA PENGEMBANGAN TEKNOLOGI SIBER", sks: 4, nilaiAngka: 8, nilaiHuruf: "A" }
];


const tabelNilai = document.querySelector("#tabelNilai");
const totalSKSEl = document.querySelector("#totalSKS");
const totalNilaiAngkaEl = document.querySelector("#totalNilaiAngka");
const inputCariMK = document.querySelector("#inputCariMK");
const btnFilterA = document.querySelector("#btnFilterA");
const btnResetFilter = document.querySelector("#btnResetFilter");

const formUbahNilai = document.querySelector("#formUbahNilai");
const selectMK = document.querySelector("#selectMK");
const inputNilaiAngka = document.querySelector("#inputNilaiAngka");
const selectNilaiHuruf = document.querySelector("#selectNilaiHuruf");
const pesanForm = document.querySelector("#pesanForm");

function dapatkanBadgeClass(huruf) {
  if (huruf === "A" || huruf === "AB") {
    return "badge bg-primary";
  } else if (huruf === "B" || huruf === "BC") {
    return "badge bg-success";
  } else {
    return "badge bg-warning text-dark";
  }
}

function renderTabel(data) {
  tabelNilai.innerHTML = "";

  if (data.length === 0) {
    const trKosong = document.createElement("tr");
    trKosong.innerHTML = `<td colspan="6" class="text-muted">Mata kuliah tidak ditemukan.</td>`;
    tabelNilai.append(trKosong);
    return;
  }

  data.forEach((mk, index) => {
    const tr = document.createElement("tr");

    const tdNo = document.createElement("td");
    tdNo.textContent = index + 1;

    const tdKode = document.createElement("td");
    tdKode.textContent = mk.kode;

    const tdNama = document.createElement("td");
    tdNama.textContent = mk.nama;

    const tdSks = document.createElement("td");
    tdSks.textContent = mk.sks;

    const tdNilaiAngka = document.createElement("td");
    tdNilaiAngka.textContent = mk.nilaiAngka;

    const tdNilaiHuruf = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = dapatkanBadgeClass(mk.nilaiHuruf);
    badge.textContent = mk.nilaiHuruf;
    tdNilaiHuruf.append(badge);

    tr.append(tdNo, tdKode, tdNama, tdSks, tdNilaiAngka, tdNilaiHuruf);

    tr.addEventListener("click", () => {
      tr.classList.toggle("sorot-item");
    });

    tabelNilai.append(tr);
  });

  hitungTotal(data);
}

function renderSelectOption() {
  selectMK.innerHTML = `<option value="">-- Pilih Mata Kuliah --</option>`;
  daftarMataKuliah.forEach(mk => {
    const option = document.createElement("option");
    option.value = mk.kode;
    option.textContent = `${mk.kode} - ${mk.nama}`;
    selectMK.append(option);
  });
}

function hitungTotal(data) {
  const totSKS = data.reduce((acc, curr) => acc + curr.sks, 0);
  const totNilai = data.reduce((acc, curr) => acc + curr.nilaiAngka, 0);
  if (totalSKSEl) totalSKSEl.textContent = totSKS;
  if (totalNilaiAngkaEl) totalNilaiAngkaEl.textContent = totNilai;
}

if (inputCariMK) {
  inputCariMK.addEventListener("input", (e) => {
    const kataKunci = e.target.value.toLowerCase().trim();
    const hasilFilter = daftarMataKuliah.filter(mk => 
      mk.nama.toLowerCase().includes(kataKunci) || 
      mk.kode.toLowerCase().includes(kataKunci)
    );
    renderTabel(hasilFilter);
  });
}

if (btnFilterA) {
  btnFilterA.addEventListener("click", () => {
    const hasilA = daftarMataKuliah.filter(mk => mk.nilaiHuruf === "A" || mk.nilaiHuruf === "AB");
    renderTabel(hasilA);
    if (btnResetFilter) btnResetFilter.classList.remove("d-none");
  });
}

if (btnResetFilter) {
  btnResetFilter.addEventListener("click", () => {
    renderTabel(daftarMataKuliah);
    if (inputCariMK) inputCariMK.value = "";
    btnResetFilter.classList.add("d-none");
  });
}

if (selectMK) {
  selectMK.addEventListener("change", (e) => {
    const kodePilihan = e.target.value;
    const mkDipilih = daftarMataKuliah.find(mk => mk.kode === kodePilihan);

    if (mkDipilih) {
      inputNilaiAngka.value = mkDipilih.nilaiAngka;
      selectNilaiHuruf.value = mkDipilih.nilaiHuruf;
    } else {
      inputNilaiAngka.value = "";
      selectNilaiHuruf.value = "";
    }
  });
}

if (formUbahNilai) {
  formUbahNilai.addEventListener("submit", (e) => {
    e.preventDefault();

    const kodeMK = selectMK.value;
    const nilaiAngkaBaru = parseFloat(inputNilaiAngka.value);
    const nilaiHurufBaru = selectNilaiHuruf.value;

    if (!kodeMK) {
      pesanForm.textContent = "Silakan pilih mata kuliah yang ingin diubah!";
      pesanForm.className = "text-error";
      return;
    }

    if (isNaN(nilaiAngkaBaru) || nilaiAngkaBaru < 0) {
      pesanForm.textContent = "Nilai angka harus diisi dengan angka yang valid!";
      pesanForm.className = "text-error";
      return;
    }

    if (!nilaiHurufBaru) {
      pesanForm.textContent = "Silakan pilih nilai huruf baru!";
      pesanForm.className = "text-error";
      return;
    }

    const targetMK = daftarMataKuliah.find(mk => mk.kode === kodeMK);
    if (targetMK) {
      targetMK.nilaiAngka = nilaiAngkaBaru;
      targetMK.nilaiHuruf = nilaiHurufBaru;

      renderTabel(daftarMataKuliah);

      pesanForm.textContent = `Nilai ${targetMK.nama} berhasil diperbarui!`;
      pesanForm.className = "text-sukses";

      formUbahNilai.reset();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabel(daftarMataKuliah);
  renderSelectOption();
});
