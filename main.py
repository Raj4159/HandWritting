from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image
import requests

# Load the model and processor
processor = TrOCRProcessor.from_pretrained('microsoft/trocr-large-handwritten')
model = VisionEncoderDecoderModel.from_pretrained('microsoft/trocr-large-handwritten')

# Prediction function for handwriting recognition
def predict(image):
    # Open the image if it's a file path
    if isinstance(image, str):
        image = Image.open(image).convert("RGB")
    
    # Predict the image using the model
    pixel_values = processor(images=image, return_tensors="pt").pixel_values
    generated_ids = model.generate(pixel_values)
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    return generated_text

# Code to take image input
image_path = input("Enter the path to the image: ")

# Predict and print the output
predicted_text = predict(image_path)
print("Predicted Text:", predicted_text)
