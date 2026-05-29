document.addEventListener("DOMContentLoaded", () => {
    const verificationInput = document.getElementById("verification");
    const continueBtn = document.getElementById("continue-btn");

    continueBtn.addEventListener("click", async () => {

        const verification = verificationInput.value;

        if (!verification) {
            alert("Please enter your verification code!")
            return;
        }

        const response = await fetch("http://127.0.0.1:5000/api/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    verification: verification
                })
        });

        const data = await response.json()
        if (data.verification === "success") {
            alert("Please proceed! Verified!");
            return;
        }

        alert("Incorrect verification code.");

    })
})