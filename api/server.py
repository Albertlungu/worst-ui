from flask import Flask, request
import flask_cors

from src.email.email_request import send_message, EMAIL_CONTENT

app = Flask("worst-ui")
flask_cors.CORS(app)

@app.route("/api/send", methods=["POST"])
def send():
    content = request.get_json()
    recipient = content.get("email")
    send_message(content=EMAIL_CONTENT,
                 subject="Your Verification Code",
                 sender="albert.lungu.2010@gmail.com",
                 recipient=recipient
                 )
if __name__ == "__main__":
    app.run(debug=True)