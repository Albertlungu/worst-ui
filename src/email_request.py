import os
import random
import smtplib
import string
from email.message import EmailMessage

DEBUG_MODE = False
HARDCODED_CODE = "aaaaaa"
TARGET = "aaaaaa" if DEBUG_MODE else ""


def generate_code() -> str:
    """
    Generates a 6-character randomized lowercase alphanumeric code to be used for validation.
    If DEBUG_MODE is toggled to True, it instead returns the HARDCODED_CODE to make testing easier.

    Args:
        None

    Returns:
        str: A 6-character verification code.
    """
    if DEBUG_MODE:
        return HARDCODED_CODE

    characters = string.ascii_lowercase + string.digits
    code = "".join(random.choices(characters, k=6))

    return code


def send_message(content: str, subject: str, sender: str, recipient: str) -> None:
    """
    Given the content, a subject, a sender, and a recipient, uses the python smtplib to send an email
    to the recipient.

    Args:
        content (str): The content of the message.
        subject (str): The subject field.
        sender (str): The sending email of the message.
        recipient (str): The recipient email of the message.

    Returns:
        None
    """
    msg = EmailMessage()
    msg.set_content(content)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("albert.lungu.2010@gmail.com", "djtfzwevrdujczcu")
            server.send_message(msg)
        print("Check your inbox")
    except Exception as e:
        print(f"Error: {e}")


def main() -> None:
    """
    Serves as the main entry point to directly test the send_message function locally
    without using the Flask server interface.

    Args:
        None

    Returns:
        None
    """
    send_message(
        content="this is a test",
        subject="this is a test",
        sender="albert.lungu.2010@gmail.com",
        recipient="mwu2@ocdsb.ca",
    )


if __name__ == "__main__":
    main()
