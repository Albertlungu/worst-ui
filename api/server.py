from flask import Flask, request, jsonify
from flask_cors import CORS

import src.email_request as email_request
from src.email_request import send_message, generate_code

app = Flask("worst-ui")
CORS(app)


@app.route("/api/send", methods=["POST"])
def send():
    data = request.get_json(silent=True) or {}
    recipient = data.get("email")
    if not recipient:
        return jsonify({"ok": False, "error": "missing recipient email"}), 400

    code = generate_code()
    content = f"Your verification code is:\n{code}"
    email_request.TARGET = code

    try:
        send_message(
            content=content,
            subject="Your Verification Code",
            sender="albert.lungu.2010@gmail.com",
            recipient=recipient,
        )
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

    return jsonify({"ok": True}), 200

@app.route("/api/verify", methods=["GET", "POST"])
def verify():
    data = request.get_json(silent=True) or {}
    payload = data.get("verification")
    if not payload:
        return jsonify({"ok": False, "error": "missing user-inputted verification code"}), 400

    if payload == email_request.TARGET:
        return jsonify({"verification": "success"}), 200

    return jsonify({"verification": "failed"}), 401



if __name__ == "__main__":
    app.run(debug=True)