from fastapi import APIRouter, HTTPException
from .models import WaitlistEntry, WaitlistResponse
from .database import db
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from .config import settings

router = APIRouter()

@router.post("/waitlist", response_model=WaitlistResponse)
async def join_waitlist(entry: WaitlistEntry):
    # Check if email already exists
    existing = await db.waitlist.find_one({"email": entry.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Save to database
    await db.waitlist.insert_one(entry.dict())

    # Send confirmation email
    try:
        msg = MIMEMultipart()
        msg['From'] = settings.EMAIL_USER
        msg['To'] = entry.email
        msg['Subject'] = "Welcome to IGES AI Waitlist"

        html = """
        <h1>Welcome to IGES AI!</h1>
        <p>Thank you for joining our waitlist. We'll keep you updated on our progress.</p>
        <p>Best regards,<br>IGES AI Team</p>
        """
        msg.attach(MIMEText(html, 'html'))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(settings.EMAIL_USER, settings.EMAIL_PASSWORD)
            server.send_message(msg)

    except Exception as e:
        print(f"Error sending email: {e}")
        # Continue even if email fails

    return WaitlistResponse(message="Successfully joined waitlist")
