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

// STEP 2 VALIDATION
function nextStep2() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let phone = document.getElementById("phone").value;

    let nameRegex = /^[A-Za-z]+$/;

    if (!fname.match(nameRegex) || !lname.match(nameRegex)) {
        alert("Names must be letters only");
        return;
    }

    if (phone.length > 13) {
        alert("Invalid phone number");
        return;
    }

    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("phone", phone);

    location.href = "step3.html";
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