import os

import psycopg
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Konfiguracja z zmiennych środowiskowych. Wartości domyślne pasują do naszej sieci.
DB_HOST = os.getenv("DB_HOST", "todo-db")
DB_NAME = os.getenv("DB_NAME", "todo")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")


def get_conn():
    return psycopg.connect(
        host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD
    )


app = FastAPI()

# Przeglądarka otwiera frontend na innym porcie, więc bez CORS zablokuje odpowiedzi.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #["http://localhost:8080"]
    allow_methods=["*"],
    allow_headers=["*"],
)


class TodoIn(BaseModel):
    title: str


class TodoPatch(BaseModel):
    done: bool


def row_to_dict(row):
    return {"id": row[0], "title": row[1], "done": row[2]}


@app.get("/todos")
def list_todos():
    with get_conn() as conn, conn.cursor() as cur:
        cur.execute("SELECT id, title, done FROM todos ORDER BY id")
        return [row_to_dict(r) for r in cur.fetchall()]


@app.post("/todos", status_code=201)
def create_todo(todo: TodoIn):
    with get_conn() as conn, conn.cursor() as cur:
        cur.execute(
            "INSERT INTO todos (title) VALUES (%s) RETURNING id, title, done",
            (todo.title,),
        )
        return row_to_dict(cur.fetchone())


@app.patch("/todos/{todo_id}")
def update_todo(todo_id: int, body: TodoPatch):
    with get_conn() as conn, conn.cursor() as cur:
        cur.execute(
            "UPDATE todos SET done = %s WHERE id = %s RETURNING id, title, done",
            (body.done, todo_id),
        )
        row = cur.fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Nie ma takiego zadania")
    return row_to_dict(row)


@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int):
    with get_conn() as conn, conn.cursor() as cur:
        cur.execute("DELETE FROM todos WHERE id = %s", (todo_id,))
        deleted = cur.rowcount
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Nie ma takiego zadania")
    return Response(status_code=204)