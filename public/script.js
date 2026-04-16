// =====================================
// PAGE LOAD (SLIDERS + SUMMARY)
// =====================================
document.addEventListener("DOMContentLoaded", function () {

    // ===== SLIDER DISPLAY =====
    const amount = document.getElementById("amount");
    const duration = document.getElementById("duration");

    const amountVal = document.getElementById("amountVal");
    const durationVal = document.getElementById("durationVal");

    if (amount && duration) {
        // show default values
        amountVal.innerText = "$" + amount.value;
        durationVal.innerText = duration.value + " days";

        // update live
        amount.addEventListener("input", function () {
            amountVal.innerText = "$" + this.value;
        });

        duration.addEventListener("input", function () {
            durationVal.innerText = this.value + " days";
        });
    }

    // ===== SUMMARY PAGE =====
    const summary = document.getElementById("summary");
    if (summary) {
        summary.innerHTML = `
            <h3>Confirm Your Application</h3>
            <p><strong>Amount:</strong> $${localStorage.getItem("amount")}</p>
            <p><strong>Duration:</strong> ${localStorage.getItem("duration")} days</p>
            <p><strong>Reason:</strong> ${localStorage.getItem("reason")}</p>
            <p><strong>Name:</strong> ${localStorage.getItem("fname")} ${localStorage.getItem("lname")}</p>
            <p><strong>Phone:</strong> ${localStorage.getItem("phone")}</p>
            <p><strong>Next of Kin:</strong> ${localStorage.getItem("kfname")}</p>
        `;
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
        alert("Please fill all required fields");
        return;
    }

    // save data
    localStorage.setItem("amount", amount);
    localStorage.setItem("duration", duration);
    localStorage.setItem("reason", reason);

    // go next
    window.location.href = "step2.html";
}


// =====================================
// STEP 2 → STEP 3
// =====================================
function nextStep2() {
    const fname = document.getElementById("fname").value.trim();
    const sname = document.getElementById("sname").value.trim(); // optional
    const lname = document.getElementById("lname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email")?.value.trim();

    // required fields
    if (!fname || !lname || !phone) {
        alert("Please fill all required fields");
        return;
    }

    // name validation
    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(fname)) {
        alert("First name must contain letters only");
        return;
    }

    if (lname && !nameRegex.test(lname)) {
        alert("Last name must contain letters only");
        return;
    }

    if (sname && !nameRegex.test(sname)) {
        alert("Surname must contain letters only");
        return;
    }

    // phone validation
    if (!phone.startsWith("+263") || phone.length < 10 || phone.length > 13) {
        alert("Enter valid Zimbabwe phone number");
        return;
    }

    // save data
    localStorage.setItem("fname", fname);
    localStorage.setItem("sname", sname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);

    // go next
    window.location.href = "step3.html";
}


// =====================================
// STEP 3 → STEP 4 (NEXT OF KIN)
// =====================================
function nextStep3() {
    const kfname = document.getElementById("kfname").value.trim();
    const klname = document.getElementById("klname").value.trim();
    const kphone = document.getElementById("kphone").value.trim();
    const province = document.getElementById("province").value;

    if (!kfname || !klname || !kphone || !province) {
        alert("Please fill all required fields");
        return;
    }

    // save data
    localStorage.setItem("kfname", kfname);
    localStorage.setItem("klname", klname);
    localStorage.setItem("kphone", kphone);
    localStorage.setItem("province", province);

    window.location.href = "step4.html";
}

// =====================================
// FINAL SUBMIT
// =====================================
function submitApp() {
    alert("Application Submitted Successfully");

    // clear data
    localStorage.clear();

    // go back to start
    window.location.href = "index.html";
}

function startProcessing() {
    // optional: show instant feedback
    alert("Processing your application...");

    // redirect to processing page
    window.location.href = "processing.html";
}

function finish() {
    localStorage.clear();
    window.location.href = "index.html";
}

window.onload = function () {
    if (document.getElementById("amount")) {
        document.getElementById("amount").innerText = localStorage.getItem("amount");
        document.getElementById("duration").innerText = localStorage.getItem("duration") + " days";
        document.getElementById("reason").innerText = localStorage.getItem("reason");

        document.getElementById("name").innerText =
            localStorage.getItem("fname") + " " + localStorage.getItem("lname");

        document.getElementById("phone").innerText = localStorage.getItem("phone");

        document.getElementById("kin").innerText =
            localStorage.getItem("kfname") + " " + localStorage.getItem("klname");
    }
};