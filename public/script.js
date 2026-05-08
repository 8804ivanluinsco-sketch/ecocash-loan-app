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
        // Changed to KES for consistency with Step 3
        amountVal.innerText = "KES " + amount.value;

        amount.addEventListener("input", function () {
            amountVal.innerText = "KES " + this.value;
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

        repayment.innerText = "Total repayment: KES " + total.toFixed(2);
    }

    updateLoan();

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

        showLoaderAndGo("step1.html"); // Fixed from step1.html
    }

    // =====================================
    // STEP 2 → STEP 3 (Updated with ID Number & Kenya Phone)
    // =====================================
    function nextStep2() {
        const fname = document.getElementById("fname").value.trim();
        const lname = document.getElementById("lname").value.trim();
        const idNumber = document.getElementById("idNumber").value.trim(); // 👈 Added
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();

        const nameRegex = /^[A-Za-z]+$/;
        const kenyaPhoneRegex = /^\+254[17][0-9]{8}$/; // 👈 Updated to Kenya
        const idRegex = /^[0-9]+$/; // 👈 Numeric Only

        if (!fname || !lname || !idNumber || !phone || !email) {
            showError("Please fill all required fields");
            return;
        }

        if (!idRegex.test(idNumber)) {
            showError("ID Number must contain only numbers");
            return;
        }

        if (!kenyaPhoneRegex.test(phone)) {
            showError("Enter valid Kenyan phone (+254XXXXXXXXX)");
            return;
        }

        localStorage.setItem("fname", fname);
        localStorage.setItem("lname", lname);
        localStorage.setItem("fullName", fname + " " + lname);
        localStorage.setItem("idNumber", idNumber);
        localStorage.setItem("phone", phone);
        localStorage.setItem("email", email);

        showLoaderAndGo("step3.html");
    }

    // =====================================
    // STEP 3 → STEP 4 (Updated for Kin 1, Kin 2, and Income)
    // =====================================
    function nextStep3() {
        const name1 = document.getElementById("kinName1").value.trim();
        const phone1 = document.getElementById("kinPhone1").value.trim();
        const name2 = document.getElementById("kinName2").value.trim();
        const phone2 = document.getElementById("kinPhone2").value.trim();
        const income = document.getElementById("monthlyIncome").value;

        const nameRegex = /^[A-Za-z\s]+$/;
        const kenyaPhoneRegex = /^\+254[17][0-9]{8}$/;

        if (!name1 || !phone1 || !name2 || !phone2 || !income) {
            showError("Please fill all required fields");
            return;
        }

        if (!nameRegex.test(name1) || !nameRegex.test(name2)) {
            showError("Next of Kin names must contain only letters");
            return;
        }

        if (!kenyaPhoneRegex.test(phone1) || !kenyaPhoneRegex.test(phone2)) {
            showError("Enter valid Kenyan numbers (+254...) for both contacts");
            return;
        }

        // SAVE ALL DATA
        localStorage.setItem("kinName1", name1);
        localStorage.setItem("kinPhone1", phone1);
        localStorage.setItem("kinName2", name2);
        localStorage.setItem("kinPhone2", phone2);
        localStorage.setItem("monthlyIncome", income);

        showLoaderAndGo("step4.html");
    }

    // =====================================
    // STEP 4 → STEP 5
    // =====================================
    function nextStep4() {
    window.location.href = "step5.html"; // Skips the extra loading bar
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
        box.style.display = "block";
    }

    // =====================================
    // GLOBAL LOADER NAVIGATION
    // =====================================
    function showLoaderAndGo(url) {
        const loader = document.getElementById("pageLoader");
        if (loader) loader.style.display = "block";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);
    }

    // EXPOSE TO WINDOW
    window.nextStep1 = nextStep1;
    window.nextStep2 = nextStep2;
    window.nextStep3 = nextStep3;
    window.nextStep4 = nextStep4;

    document.body.classList.add("loaded");
});