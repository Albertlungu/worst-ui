from flask import Flask, request, jsonify
import flask_cors

from src.email.email_request import send_message, generate_code

app = Flask("worst-ui")
flask_cors.CORS(app)


@app.route("/api/send", methods=["POST"])
def send():
    data = request.get_json(silent=True) or {}
    recipient = data.get("email")
    if not recipient:
        return jsonify({"ok": False, "error": "missing recipient email"}), 400

    # Generate a fresh verification code per request
    code = generate_code()
    content = f"Your verification code is:\n{code}"

    try:
        send_message(
            content=content,
            subject="Your Verification Code",
            sender="albert.lungu.2010@gmail.com",
            recipient=recipient,
        )
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

    return jsonify({"ok": True, "code": code}), 200


if __name__ == "__main__":
    app.run(debug=True)