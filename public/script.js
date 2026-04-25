// =====================================
// PAGE LOAD (SLIDERS + SUMMARY)
// =====================================
document.addEventListener("DOMContentLoaded", function () {

    // ===== SLIDER DISPLAY =====
    const amount = document.getElementById("amount");
const duration = document.getElementById("duration");

const amountVal = document.getElementById("amountVal");
const durationVal = document.getElementById("durationVal");

// ✅ ONLY RUN IF ELEMENTS EXIST
if (amount !== null && amountVal !== null) {

    amountVal.innerText = "$ " + amount.value;

    amount.addEventListener("input", function () {
        amountVal.innerText = "$ " + this.value;
        updateLoan();
    });
}

if (duration !== null && durationVal !== null) {

    durationVal.innerText = duration.value + " days";

    duration.addEventListener("input", function () {
        durationVal.innerText = this.value + " days";
    });
}

    // ===== LOAN CALCULATOR (10%) =====
    function updateLoan() {
        const repayment = document.getElementById("repayment");
        if (!amount || !repayment) return;

        const amt = parseFloat(amount.value);
        const total = amt + (amt * 0.10);

        repayment.innerText = "Total repayment: $" + total.toFixed(2);
    }

    updateLoan();

    // ===== SUMMARY PAGE (STEP 4) =====
    if (document.getElementById("name")) {
        document.getElementById("amount").innerText = localStorage.getItem("amount");
        document.getElementById("duration").innerText = localStorage.getItem("duration") + " days";
        document.getElementById("reason").innerText = localStorage.getItem("reason");

        document.getElementById("name").innerText =
            localStorage.getItem("fname") + " " + localStorage.getItem("lname");

        document.getElementById("phone").innerText = localStorage.getItem("phone");

        document.getElementById("kin").innerText =
            localStorage.getItem("kfname") + " (" + localStorage.getItem("kphone") + ")";
    }

});


// =====================================
// STEP 1 → STEP 2
// =====================================
function nextStep1() {
    const amount = document.getElementById("amount").value;
    const duration = document.getElementById("duration").value;
    const reason = document.getElementById("reason").value.trim();

    if (!reason) {
        showError("Please fill all required fields");
        return;
    }

    localStorage.setItem("amount", amount);
    localStorage.setItem("duration", duration);
    localStorage.setItem("reason", reason);

    showLoaderAndGo("step2.html"); 
}

// =====================================
// STEP 2 → STEP 3
// =====================================
function nextStep2() {
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!fname || !lname || !phone) {
        showError("Please fill all required fields");
        return;
    }

    if (!phone.startsWith("+263") || phone.length < 10 || phone.length > 13) {
        showError("Enter valid Zimbabwe phone number");
        return;
    }

    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("phone", phone);

    showLoaderAndGo("step3.html");
}


// =====================================
// STEP 3 → STEP 4
// =====================================
function nextStep3() {
    const kfname = document.getElementById("kfname").value.trim();
    const klname = document.getElementById("klname").value.trim();
    const kphone = document.getElementById("kphone").value.trim();
    const province = document.getElementById("province").value;

    if (!kfname || !klname || !kphone || province === "Select Province") {
        showError("Please fill all required fields");
        return;
    }

    localStorage.setItem("kfname", kfname);
    localStorage.setItem("klname", klname);
    localStorage.setItem("kphone", kphone);
    localStorage.setItem("province", province);
}


// =====================================
// STEP 4 → STEP 5
// =====================================
function nextStep4() {
    document.getElementById("pageLoader").style.display = "block";

    setTimeout(() => {
        window.location.href = "step5.html";
    }, 800);
}


// =====================================
// ERROR HANDLER
// =====================================
function showError(msg) {
    let box = document.getElementById("errorBox");

    if (!box) {
        box = document.createElement("div");
        box.id = "errorBox";
        box.style.color = "red";
        box.style.marginTop = "10px";
        box.style.textAlign = "center";
        document.querySelector(".container").appendChild(box);
    }

    box.innerText = msg;
}


// =====================================
// GLOBAL LOADER NAVIGATION
// =====================================
function showLoaderAndGo(url) {
    const loader = document.getElementById("pageLoader");
    if (loader) loader.style.display = "block";

    setTimeout(() => {
        window.location.href = url;
    }, 800);
}