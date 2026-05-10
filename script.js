let balance = parseInt(localStorage.getItem('nc_balance')) || 0;
let energy = parseInt(localStorage.getItem('nc_energy')) || 1000;

document.getElementById('balance').innerText = balance;
document.getElementById('energy-val').innerText = energy;

function handleTap() {
    if (energy > 0) {
        balance += 1;
        energy -= 1;
        updateDisplay();
        saveData();
    } else {
        alert("Energy শেষ! কিছুক্ষণ অপেক্ষা করুন।");
    }
}

function updateDisplay() {
    document.getElementById('balance').innerText = balance;
    document.getElementById('energy-val').innerText = energy;
    document.getElementById('energy-fill').style.width = (energy / 10) + "%";
}

function saveData() {
    localStorage.setItem('nc_balance', balance);
    localStorage.setItem('nc_energy', energy);
}

// এনার্জি রিফিল করার লজিক (প্রতি ৩ সেকেন্ডে ১ করে বাড়বে)
setInterval(() => {
    if (energy < 1000) {
        energy += 1;
        updateDisplay();
        saveData();
    }
}, 3000);

// কয়েনে ক্লিক ইভেন্ট সেট করা
document.getElementById('coin').addEventListener('click', handleTap);
