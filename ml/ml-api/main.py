# tensorflow imports
import random
from PIL import Image
import io
import base64
from pydantic import BaseModel
from fastapi import FastAPI
import uvicorn
# import tensorflow as tf
# from tensorflow.keras.preprocessing import image
# import numpy as np
# from tensorflow.keras.models import load_model
import uuid


# model = load_model('alzheimers_model')
# type_labels = ["No Dementia", "Very Mild Dementia",
#                "Mild Dementia", "Moderate Dementia"]


# def model_predict(img_path, model):
#     print(img_path)
#     img = image.load_img(img_path, target_size=(176, 176))

#     # Preprocessing the image
#     x = image.img_to_array(img)
#     x = np.expand_dims(x, axis=0)
#     # Making Predictions
#     preds = model.predict(x)
#     preds = np.argmax(preds, axis=1)
#     return preds


app = FastAPI()


class ImageModel(BaseModel):
    base64str: str


class ResponseModel(BaseModel):
    status: str
    message: str
    probability: float


def image_generator(base64string):
    base64_utf_enc = base64string.encode("utf-8")
    base64bytes = base64.b64decode(base64_utf_enc)
    bytes_object = io.BytesIO(base64bytes)
    image = Image.open(bytes_object)
    return image


def predict(image):
    dis_status = random.choice(["Risk", "No Risk"])
    probability = random.uniform(0.5, 1)
    return {
        "status": "success",
        "message": dis_status,
        "probability": probability,
    }


@app.get("/")
async def index():
    return {"message": "Samosa"}


@app.post("/api/v1/predict", response_model=ResponseModel)
def get_predictionbase64(img: ImageModel):
    # Load the image
    image = image_generator(img.base64str)
    file_path = f"./{str(uuid.uuid4())}.png"
    image.save(file_path)

    # Make Prediction
    # preds = model_predict(file_path, model)
    # print(preds)
    # return resp
    prediction = predict(image)
    return prediction


def start():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    start()
