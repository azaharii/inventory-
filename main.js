// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

// CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBMSsNz6Dgss5vr8vlPbDdKgwOIn3dMBik",
  authDomain: "insancemerlang2025.firebaseapp.com",
  projectId: "insancemerlang2025",
  storageBucket: "insancemerlang2025.firebasestorage.app",
  messagingSenderId: "900746896855",
  appId: "1:900746896855:web:20cfd37822398ef034d792"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const barangCollection = collection(db, "barang")

// ================= TAMBAH BARANG =================
export async function tambahBarang() {
  const namaBarang = document.getElementById('namaBarang').value
  const harga = document.getElementById('harga').value
  const stok = document.getElementById('stok').value

  await addDoc(barangCollection, {
    namaBarang: namaBarang,
    harga: harga,
    stok: stok,
  })

  window.location.href = 'daftar.html'
}

// ================= DAFTAR BARANG =================
export async function daftarBarang() {

  const snapshot = await getDocs(barangCollection)
  const tabel = document.getElementById('tabelData')

  tabel.innerHTML = ""

  snapshot.forEach((item) => {

    const data = item.data()
    const id = item.id

    const baris = document.createElement("tr")
    
     const noUrut = document.createElement("td")
  noUrut.textContent = tabel.rows.length + 1

    const namaBarang = document.createElement("td")
    namaBarang.textContent = data.namaBarang

    const harga = document.createElement("td")
    harga.textContent = data.harga

    const stok = document.createElement("td")
    stok.textContent = data.stok

    const kolomAksi = document.createElement('td')

    const tombolEdit = document.createElement('a')
    tombolEdit.textContent = 'Edit'
    tombolEdit.href = 'edit.html?id=' + id
    tombolEdit.className = 'button edit'

    const tombolHapus = document.createElement('button')
    tombolHapus.textContent = 'Hapus'
    tombolHapus.className = 'button delete'
    tombolHapus.onclick = async () => {
      await hapusBarang(id)
    }

    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)

    // 
    baris.appendChild(noUrut)
    baris.appendChild(namaBarang)
    baris.appendChild(harga)
    baris.appendChild(stok)
    baris.appendChild(kolomAksi)

    tabel.appendChild(baris)
  })
}

// ================= HAPUS BARANG =================
export async function hapusBarang(id) {
  await deleteDoc(doc(db, "barang", id))
  alert("Data berhasil dihapus")
  daftarBarang()
}