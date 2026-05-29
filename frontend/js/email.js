document.addEventListener("DOMContentLoaded", () => {

    const sendBtn = document.getElementById("send-btn");
    const emailInput = document.getElementById("email");

    sendBtn.addEventListener("click", async () => {

        const recipientEmail = emailInput.value;

        if (!recipientEmail) {
            alert("Please enter an email address.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: recipientEmail
                })
            });


            if (response.ok) {
                const data = await response.json();
                alert("Email sent successfully!");
                console.log("Server responded:", data);
            } else {
                alert("Failed to send email. Check console for details.");
                console.error("Server error:", response.statusText);
            }
        } catch (error) {
            console.error("Error connecting to backend:", error);
            alert("Could not connect to the backend server.");
        }
    });
});