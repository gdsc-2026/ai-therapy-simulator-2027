from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def default_endpoint():
    return {"You": "Loser"}