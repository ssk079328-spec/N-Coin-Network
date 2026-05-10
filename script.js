const firebaseConfig = {
  apiKey: "AIzaSyC41I2WBCSCBwlaefkwUvi3pp1P7DMk5tc",
  authDomain: "n-coin-network.firebaseapp.com",
  projectId: "n-coin-network",
  storageBucket: "n-coin-network.firebasestorage.app",
  messagingSenderId: "158229008238",
  appId: "1:158229008238:web:90dfd68d6c56a8cb32bb7f",
  databaseURL: "https://n-coin-network-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// User setup
let userId = localStorage.getItem('nc_user') || "user_" + Math.floor(Math.random() * 1000000);
localStorage.setItem('nc_user', userId);

let balance = 0;
let energy = 1000;

// Load Data
db.ref('users/' + userId).on('value', (snap) => {
    if(snap.exists()){
        balance = snap.val().balance || 0;
        energy = snap.val().energy || 1000;
        updateUI();
    } else {
        db.ref('users/' + userId).set({balance: 0, energy: 1000});
    }
});

function handleTap() {
    if (energy > 0) {
        balance += 1;
        energy -= 1;
        updateUI();
        syncData();
    }
}

function syncData() {
    db.ref('users/' + userId).update({ balance: balance, energy: energy });
}

function updateUI() {
    document.getElementById('balance').innerText = balance;
    document.getElementById('energy-val').innerText = energy;
    document.getElementById('energy-fill').style.width = (energy / 10) + "%";
}

// Navigation Logic
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId + '-page').classList.add('active');
}

function watchAd() {
    window.open('YOUR_MONETAG_DIRECT_LINK', '_blank'); // আপনার মনিটেগ লিঙ্ক দিন
    balance += 500;
    syncData();
    alert("Bonus Added!");
}

function requestWithdraw() {
    let num = document.getElementById('wallet-num').value;
    if(balance < 50000) return alert("ব্যালেন্স পর্যাপ্ত নয়!");
    db.ref('withdrawals/').push({ userId, num, amount: balance });
    alert("অনুরোধ পাঠানো হয়েছে!");
}

document.getElementById('coin').addEventListener('click', handleTap);
setInterval(() => { if(energy < 1000){ energy += 5; updateUI(); } }, 5000);
