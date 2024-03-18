
# Importing the required libraries
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from io import BytesIO
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel

app = FastAPI()  #creating the app



#to allow the frontend to access the backend CORS is used
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and processor
processor = TrOCRProcessor.from_pretrained('microsoft/trocr-large-handwritten')
model = VisionEncoderDecoderModel.from_pretrained('microsoft/trocr-large-handwritten')

# Prediction function for handwriting recognition
def predict(image):
    # Predict the image using the model
    pixel_values = processor(images=image, return_tensors="pt").pixel_values
    generated_ids = model.generate(pixel_values)
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    return generated_text

@app.get("/")
def read_root():
    return {"message": "The Endpoint is working and implemented by @atharva-malode in fast api"}


@app.post("/extract_text")
async def extract_text(image: UploadFile = File(...)):
    try:
        # Read the uploaded image
        image_bytes = await image.read()
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        
        # Predict text using the model
        predicted_text = predict(image)
        
        return {"extracted_text": predicted_text}
       
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})