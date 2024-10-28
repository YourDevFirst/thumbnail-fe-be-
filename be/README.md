# 📸 YouTube Thumbnail Analyzer - Backend

This is the backend for the **YouTube Thumbnail Analyzer** project, built with FastAPI. It provides an API for uploading YouTube thumbnails, analyzing them with Groq Cloud, and storing feedback in a MySQL database.

## 🚀 Features

- **Image Upload & Analysis**: Receives image files and sends them for analysis with Groq Cloud.
- **Database Storage**: Stores feedback on each thumbnail in a MySQL database.
- **REST API**: Provides endpoints for seamless front-backend integration.
- **Dockerized Deployment**: Uses Docker for easy containerization.

## 🛠️ Tech Stack

- **FastAPI** - Backend framework.
- **MySQL** - Relational database for storing feedback.
- **Groq Cloud** - AI service for analyzing thumbnails.
- **Docker** - Containerization for consistent deployment.

## 📂 Project Structure

backend/ ├── app/ │ ├── init.py │ ├── main.py # Entry point for FastAPI app │ ├── routes/ # API routes │ │ └── analyze.py # Image analysis route │ ├── db/ │ │ └── database.py # Database connection setup │ └── models/ │ └── feedback.py # Database model for feedback ├── uploads/ # Directory for storing uploaded images ├── Dockerfile # Docker instructions for FastAPI app ├── requirements.txt # Python dependencies └── .env # Environment variables for database config

## 📦 Installation

### Prerequisites

- **Python 3.9+**
- **MySQL** (or Docker)
- **Docker & Docker Compose** (for containerized setup)

### 1. Clone the Repository

```bash
git clone https://github.com/YourDevFirst/thumbnail-fe-be-
cd be
```
### 2. Set Up Environment Variables
## Create a .env file in the root directory with the following details:

MYSQL_HOST=localhost
MYSQL_USER=admin
MYSQL_PASSWORD=your_password
MYSQL_DB=thumbnail_analyzer
GROQ_API_KEY=your_groq_api_key


### 3. Install Dependencies
Use a virtual environment

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

### 4. Set Up MySQL Database
Set up a MySQL database with the necessary tables:

CREATE DATABASE thumbnail_analyzer;
USE thumbnail_analyzer;

CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_path VARCHAR(255),
    score INT,
    comment TEXT,
    created_at DATETIME
);

# Running the Application

Local Development
Start FastAPI:

bash
Copy code
uvicorn app.main:app --reload
Access the API Documentation:

Visit http://localhost:8000/docs for interactive API documentation.

Dockerized Setup
Build and Run with Docker Compose:

bash
Copy code
docker-compose up --build
Access the API:

The API will be accessible at http://localhost:8000.

📋 API Endpoints
POST /analyze: Receives an image, analyzes it with Groq Cloud, and returns feedback.