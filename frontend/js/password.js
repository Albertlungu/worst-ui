window.isVerified = false;

document.addEventListener("DOMContentLoaded", () => {
    const verificationInput = document.getElementById("verification");

    // Poll the backend every 500ms to check if the code is correct
    setInterval(async () => {
        if (window.isVerified) return; // Stop checking if already correct

        const verification = verificationInput.value;
        if (!verification) return;

        try {
            const response = await fetch("http://127.0.0.1:5000/api/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    verification: verification
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.verification === "success") {
                    window.isVerified = true;
                    console.log("Verified! Moving turned on.");
                }
            }
        } catch (error) {
            // Ignore network errors during polling
        }
    }, 500);
});
