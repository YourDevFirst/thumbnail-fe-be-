from app.db.database import get_db_connection
import datetime

def save_feedback(image_path: str, score: int, comment: str):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        query = "INSERT INTO feedback (image_path, score, comment, created_at) VALUES (%s, %s, %s, %s)"
        values = (image_path, score, comment, datetime.datetime.now())
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()