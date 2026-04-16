// SLIDER DISPLAY
if (document.getElementById("amount")) {
    let amount = document.getElementById("amount");
    let duration = document.getElementById("duration");

    amount.oninput = () => {
        document.getElementById("amountVal").innerText = "$" + amount.value;
    };

    duration.oninput = () => {
        document.getElementById("durationVal").innerText = duration.value + " days";
    };
}

// STEP 1 VALIDATION
function nextStep1() {
    let reason = document.getElementById("reason").value;

    if (reason === "") {
        alert("Please fill all required fields");
        return;
    }

    localStorage.setItem("amount", amount.value);
    localStorage.setItem("duration", duration.value);
    localStorage.setItem("reason", reason);

    location.href = "step2.html";
}

function nextStep2() {
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // validation
    if (!fname || !lname || !phone) {
        alert("Please fill all required fields");
        return;
    }

    // name validation (letters only)
    const nameRegex = /^[A-Za-z]+$/;
    // First name must be letters
if (!nameRegex.test(fname)) {
    alert("First name must contain letters only");
    return;
}

// Last name only validate if filled (optional)
if (lname && !nameRegex.test(lname)) {
    alert("Last name must contain letters only");
    return;
}

    // phone validation
    if (!phone.startsWith("+263") || phone.length < 10 || phone.length > 13) {
    alert("Enter valid Zimbabwe phone number");
    return;
} {
     

    // go to next page
    window.location.href = "step3.html";
}

// STEP 3 VALIDATION
function nextStep3() {
    let kfname = document.getElementById("kfname").value;

    if (kfname === "") {
        alert("Fill all required fields");
        return;
    }

    localStorage.setItem("kfname", kfname);

    location.href = "step4.html";
}

// STEP 4 SUMMARY
if (document.getElementById("summary")) {
    document.getElementById("summary").innerHTML = `
        <p>Amount: $${localStorage.getItem("amount")}</p>
        <p>Duration: ${localStorage.getItem("duration")} days</p>
        <p>Name: ${localStorage.getItem("fname")} ${localStorage.getItem("lname")}</p>
    `;
}

// FINAL SUBMIT
function submitApp() {
    alert("Application Submitted");
    localStorage.clear();
    location.href = "index.html";
}