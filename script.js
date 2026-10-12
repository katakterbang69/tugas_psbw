$(function () {
  console.log("=== DOM & jQuery BERHASIL DIMUAT ===");

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
  ]

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
    const $tabelNilai = $(tabelNilai);$tabelNilai.empty();

    if (data.length === 0) {
      $tabelNilai.append(`<tr><td colspan="6" class="text-muted">Mata kuliah tidak ditemukan.</td></tr>`);
      hitungTotal(data);
      return;
    }

    data.forEach((mk, index) => {
      const badgeClass = dapatkanBadgeClass(mk.nilaiHuruf);
      const rowHtml = `
        <tr>
          <td>${index + 1}</td>
          <td>${mk.kode}</td>
          <td>${mk.nama}</td>
          <td>${mk.sks}</td>
          <td>${mk.nilaiAngka}</td>
          <td><span class="${badgeClass}">${mk.nilaiHuruf}</span></td>
        </tr>
      `;
      
      const $tr =$(rowHtml);
      
      $tr.on("click", function () {
        $(this).toggleClass("sorot-item");
      });

      $tabelNilai.append($tr);
    });

    hitungTotal(data);
  }

  function renderSelectOption() {
    const $selectMK = $(selectMK);$selectMK.html(`<option value="">-- Pilih Mata Kuliah --</option>`);
    daftarMataKuliah.forEach(mk => {
      $selectMK.append(`<option value="${mk.kode}">${mk.kode} - ${mk.nama}</option>`);
    });
  }

  function hitungTotal(data) {
    const totSKS = data.reduce((acc, curr) => acc + curr.sks, 0);
    const totNilai = data.reduce((acc, curr) => acc + curr.nilaiAngka, 0);
    if (totalSKSEl) totalSKSEl.textContent = totSKS;
    if (totalNilaiAngkaEl) totalNilaiAngkaEl.textContent = totNilai;
  }
  if (inputCariMK) {
    $(inputCariMK).on("keyup", function () {
      const kataKunci = $(this).val().toLowerCase().trim();
      const hasilFilter = daftarMataKuliah.filter(mk => 
        mk.nama.toLowerCase().includes(kataKunci) || 
        mk.kode.toLowerCase().includes(kataKunci)
      );
      renderTabel(hasilFilter);
    });
  }

  if (btnFilterA) {
    $(btnFilterA).on("click", function () {
      const hasilA = daftarMataKuliah.filter(mk => mk.nilaiHuruf === "A" || mk.nilaiHuruf === "AB");
      renderTabel(hasilA);
      if (btnResetFilter) $(btnResetFilter).removeClass("d-none");
    });
  }
  if (btnResetFilter) {
    $(btnResetFilter).on("click", function () {
      renderTabel(daftarMataKuliah);
      if (inputCariMK) inputCariMK.value = "";
      $(this).addClass("d-none");
    });
  }

  if (selectMK) {
    $(selectMK).on("change", function () {
      const kodePilihan = $(this).val();
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
    $(formUbahNilai).on("submit", function (e) {
      e.preventDefault();

      const kodeMK = selectMK.value;
      const nilaiAngkaBaru = parseFloat(inputNilaiAngka.value);
      const nilaiHurufBaru = selectNilaiHuruf.value;
      const $pesanForm =$("#pesanForm");

      if (!kodeMK) {
        $pesanForm.text("Silakan pilih mata kuliah yang ingin diubah!")
                  .attr("class", "text-error")
                  .show()
                  .hide().fadeIn(300);
        return;
      }

      if (isNaN(nilaiAngkaBaru) || nilaiAngkaBaru < 0) {
        $pesanForm.text("Nilai angka harus diisi dengan angka yang valid!")
                  .attr("class", "text-error")
                  .show()
                  .hide().fadeIn(300);
        return;
      }

      // Validasi 3: Nilai huruf belum dipilih
      if (!nilaiHurufBaru) {
        $pesanForm.text("Silakan pilih nilai huruf baru!")
                  .attr("class", "text-error")
                  .show()
                  .hide().fadeIn(300);
        return; 
      }
      const targetMK = daftarMataKuliah.find(mk => mk.kode === kodeMK);
      if (targetMK) {
        targetMK.nilaiAngka = nilaiAngkaBaru;
        targetMK.nilaiHuruf = nilaiHurufBaru;
        renderTabel(daftarMataKuliah);

        // Pesan sukses
        $pesanForm.text(`Nilai ${targetMK.nama} berhasil diperbarui!`)
                  .attr("class", "text-sukses")
                  .show()
                  .hide().fadeIn(300)
                  .delay(3000)
                  .fadeOut(500);

        this.reset();
      }
    });
  }

  // Inisialisasi awal saat halaman dimuat
  renderTabel(daftarMataKuliah);
  renderSelectOption();

});