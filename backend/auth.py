from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import sqlite3
import os
from dotenv import load_dotenv
import hashlib
import secrets
from datetime import datetime, timedelta
import json

# Load environment variables
load_dotenv()

# Database connection parameters - using SQLite
DB_PATH = os.getenv("DB_PATH", "auth.db")

# Create FastAPI app
app = FastAPI(title="Authentication API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    software_background: Optional[str] = None
    hardware_background: Optional[str] = None

class SigninRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    software_background: Optional[str] = None
    hardware_background: Optional[str] = None
    created_at: datetime

def get_db_connection():
    """Create a database connection"""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row  # This allows us to access columns by name
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        raise HTTPException(status_code=500, detail="Database connection error")

def hash_password(password: str) -> str:
    """Hash a password using SHA-256 with salt"""
    salt = secrets.token_hex(16)
    hashed = hashlib.sha256((password + salt).encode()).hexdigest()
    return f"{salt}${hashed}"

def verify_password(password: str, stored_hash: str) -> bool:
    """Verify a password against its hash"""
    try:
        salt, stored_hash_value = stored_hash.split('$')
        computed_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        return computed_hash == stored_hash_value
    except:
        return False

@app.post("/auth/signup", response_model=UserResponse)
async def signup(request: SignupRequest):
    """Register a new user"""
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if user already exists
        cursor.execute("SELECT id FROM users WHERE email = ?", (request.email,))
        existing_user = cursor.fetchone()

        if existing_user:
            raise HTTPException(status_code=400, detail="User with this email already exists")

        # Hash the password
        password_hash = hash_password(request.password)

        # Insert the new user
        cursor.execute("""
            INSERT INTO users (name, email, password_hash, software_background, hardware_background)
            VALUES (?, ?, ?, ?, ?)
        """, (request.name, request.email, password_hash, request.software_background, request.hardware_background))

        user_id = cursor.lastrowid
        conn.commit()

        # Get the inserted user data
        cursor.execute("""
            SELECT id, name, email, software_background, hardware_background, created_at
            FROM users WHERE id = ?
        """, (user_id,))
        user_data = cursor.fetchone()

        # Create a session token for the new user
        token = secrets.token_urlsafe(32)
        expires_at = datetime.utcnow() + timedelta(days=30)  # Token expires in 30 days

        cursor.execute("""
            INSERT INTO sessions (user_id, token, expires_at)
            VALUES (?, ?, ?)
        """, (user_data['id'], token, expires_at))

        conn.commit()

        # Return user data with session token in headers
        response_data = UserResponse(
            id=user_data['id'],
            name=user_data['name'],
            email=user_data['email'],
            software_background=user_data['software_background'],
            hardware_background=user_data['hardware_background'],
            created_at=user_data['created_at']
        )

        return response_data

    except HTTPException:
        raise
    except Exception as e:
        if conn:
            conn.rollback()
        print(f"Signup error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during signup")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.post("/auth/signin", response_model=UserResponse)
async def signin(request: SigninRequest):
    """Sign in an existing user"""
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Find the user by email
        cursor.execute("SELECT id, name, email, password_hash, software_background, hardware_background, created_at FROM users WHERE email = ?", (request.email,))
        user_data = cursor.fetchone()

        if not user_data:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        # Verify the password
        if not verify_password(request.password, user_data['password_hash']):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        # Create a new session
        token = secrets.token_urlsafe(32)
        expires_at = datetime.utcnow() + timedelta(days=30)  # Token expires in 30 days

        cursor.execute("""
            INSERT INTO sessions (user_id, token, expires_at)
            VALUES (?, ?, ?)
        """, (user_data['id'], token, expires_at))

        conn.commit()

        # Return user data
        response_data = UserResponse(
            id=user_data['id'],
            name=user_data['name'],
            email=user_data['email'],
            software_background=user_data['software_background'],
            hardware_background=user_data['hardware_background'],
            created_at=user_data['created_at']
        )

        return response_data

    except HTTPException:
        raise
    except Exception as e:
        if conn:
            conn.rollback()
        print(f"Signin error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during signin")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.post("/auth/signout")
async def signout(token: str):
    """Sign out a user by invalidating their session"""
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Find the session
        cursor.execute("SELECT id FROM sessions WHERE token = ? AND is_active = TRUE", (token,))
        session_data = cursor.fetchone()

        if not session_data:
            raise HTTPException(status_code=401, detail="Invalid session token")

        # Invalidate the session
        cursor.execute("UPDATE sessions SET is_active = FALSE WHERE id = ?", (session_data['id'],))
        conn.commit()

        return {"message": "Successfully signed out"}

    except HTTPException:
        raise
    except Exception as e:
        if conn:
            conn.rollback()
        print(f"Signout error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during signout")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user(token: str):
    """Get the current authenticated user's information"""
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Find the session
        cursor.execute("""
            SELECT users.id, users.name, users.email, users.software_background,
                   users.hardware_background, users.created_at
            FROM sessions
            JOIN users ON sessions.user_id = users.id
            WHERE sessions.token = ? AND sessions.is_active = TRUE
            AND sessions.expires_at > ?
        """, (token, datetime.utcnow()))

        user_data = cursor.fetchone()

        if not user_data:
            raise HTTPException(status_code=401, detail="Invalid or expired session token")

        # Return user data
        response_data = UserResponse(
            id=user_data['id'],
            name=user_data['name'],
            email=user_data['email'],
            software_background=user_data['software_background'],
            hardware_background=user_data['hardware_background'],
            created_at=user_data['created_at']
        )

        return response_data

    except HTTPException:
        raise
    except Exception as e:
        print(f"Get user error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching user data")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)