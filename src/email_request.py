import smtplib
from email.message import EmailMessage
import random
import string

TARGET = ""

def generate_code():

    characters = string.ascii_lowercase + string.digits
    code = ''.join(random.choices(characters, k=6))

    return code

def send_message(
    content: str, subject: str, sender: str, recipient: str
) -> EmailMessage:
    msg = EmailMessage()
    msg.set_content(content)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("albert.lungu.2010@gmail.com", "rndbdtpsvujjkocc")
            server.send_message(msg)
        print("Check your inbox")
    except Exception as e:
        print(f"Error: {e}")


def main():
    send_message(
        content="this is a test",
        subject="this is a test",
        sender="albert.lungu.2010@gmail.com",
        recipient="mwu2@ocdsb.ca",
    )


if __name__ == "__main__":
    main()
