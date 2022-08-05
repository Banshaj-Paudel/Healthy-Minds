from distutils import extension
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import base64
import io
from PIL import Image
import random


app = FastAPI()


class ImageModel(BaseModel):
    base64str: str


class ResponseModel(BaseModel):
    status: str
    message: str
    dementiaType: str
    probability: float


def image_generator(base64string):
    base64_utf_enc = base64string.encode('utf-8')
    base64bytes = base64.b64decode(base64_utf_enc)
    bytes_object = io.BytesIO(base64bytes)
    image = Image.open(bytes_object)
    return image


def predict(image):
    dis_status = random.choice(["Risk", "No Risk"])
    probability = random.uniform(0.5, 1)
    dementiaType = random.choice(
        ["No Dementia", "Very Mild Dementia", "Mild Dementia", "Moderate Dementia"])
    return {
        "status": "success",
        "message": dis_status,
        "dementiaType": dementiaType,
        "probability": probability,
    }


@app.get("/")
async def index():
    return {"message": "Samosa"}


@app.post("/api/v1/predict", response_model=ResponseModel)
def get_predictionbase64(img: ImageModel):
    # Load the image
    image = image_generator(img.base64str)
    # Make Prediction
    prediction = predict(image)
    return prediction


def start():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == '__main__':
    start()
