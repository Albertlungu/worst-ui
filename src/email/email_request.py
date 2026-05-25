import smtplib
from email.message import EmailMessage


def setup_message(
    content: str, subject: str, sender: str, recipient: str
) -> EmailMessage:
    msg = EmailMessage()
    msg.set_content(content)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient

    return msg


def send_message(message: EmailMessage):
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("albert.lungu.2010@gmail.com", "rndbdtpsvujjkocc")
            server.send_message(message)
        print("Check your inbox")
    except Exception as e:
        print(f"Error: {e}")


def main():
    message = setup_message(
        content="this is a test",
        subject="this is a test",
        sender="albert.lungu.2010@gmail.com",
        recipient="mwu2@ocdsb.ca",
    )
    send_message(message)


if __name__ == "__main__":
    main()
