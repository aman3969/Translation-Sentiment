import asyncio
from flask import Flask, render_template, request, jsonify, redirect, url_for
from transformers import AutoModelForSequenceClassification,AutoModelForAudioClassification,AutoTokenizer, pipeline,AutoFeatureExtractor
from werkzeug.utils import secure_filename
from dotenv import dotenv_values
import os
import torch
from model import WhisperModel
import datetime
import time
from logs import log
from flask import request

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
 
# Configure Logging
logger = log()
configenv = dotenv_values('.env')

# Model cache dictionary
model_cache = {}
current_date = datetime.datetime.now().strftime("%Y-%m-%d")

# Configure the path to save uploaded files
UPLOAD_FOLDER = os.path.join(os.getcwd(), f'uploads/uploads_{current_date}')

# Configure the path to save uploaded files
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


device = "cpu"
torch_dtype = torch.float32

try:
    # Load the model from local path
    model_save_path = 'RobertaEmotion'
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    model_l = AutoModelForSequenceClassification.from_pretrained(model_save_path, torch_dtype=torch_dtype, use_safetensors=True).to(device)
    logger.Logg("Model loaded successfully.")

    # Load the processor from local path
    processor_save_path = 'RobertaEmotion'
    processor_l = AutoTokenizer.from_pretrained(processor_save_path)
    logger.Logg("Processor loaded successfully.")

    sentiment_analysis = pipeline("sentiment-analysis", framework="pt", model="RobertaEmotion")

except Exception as e:
    logger.Logg(f"Error occurred while loading model and processor: {e}")


model_cache = {}

async def load_model():
    try:
        if 'model' not in model_cache:
            logger.Logg("Loading model for the first time:")
            model = WhisperModel()  # Assuming WhisperModel is defined elsewhere
            model_cache['model'] = model.pipeline()
        else:
            logger.Logg("Using cached model:")
        return model_cache['model']
    except Exception as e:
        logger.Logg(f"Error loading model: {e}")
        return None  # Return None if there's an error loading the model

@app.route('/')
def index():
    logger.Logg("Visited index page")
    return render_template('index.html')

@app.route('/transcribe', methods=['POST'])
async def transcribe():
    logger.Logg("Received a transcription request")
    pipe = await load_model()  # Load the model asynchronously

    if pipe is None:  # Check if pipe is None (indicating an error loading the model)
        logger.Logg("Error loading model")
        return jsonify({'error': 'Error loading model'}), 500

    audio_file = request.files.get('audio')

    if audio_file is None:
        logger.Logg("No audio file provided")
        return jsonify({'error': 'No audio file provided'}), 400

    if audio_file.filename == '':
        logger.Logg("No selected audio file")
        return jsonify({'error': 'No selected audio file'}), 400

    logger.Logg("Audio file received: {}".format(audio_file.filename))

    # Save the uploaded file
    filename = secure_filename(audio_file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    audio_file.save(filepath)

    try:
        # Perform transcription
        logger.Logg("Transcription in progress")

        st_time = time.time()
        result = await asyncio.to_thread(pipe, filepath, generate_kwargs={"task": "translate"})
        logger.Logg("Result is generated")
        transcription = result['text']
        logger.Logg("Transcription completed: {}".format(transcription))
        e_time = time.time()
        logger.Logg(f"time taken : {e_time-st_time}")
        
        logger.Logg("Transcription completed: {}".format(transcription))
        return jsonify({'transcription': transcription})
    except Exception as e:
        logger.Logg("Error during transcription: {}".format(str(e)))

def analyze_sentiment(text):
    try:
        # Split text into smaller chunks
        chunk_size = 512  # Maximum number of tokens the model can process
        chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

        # Analyze sentiment for each chunk
        overall_sentiment = {}
        for chunk in chunks:
            results = sentiment_analysis(chunk)
            for result in results:
                label = result['label']
                score = result['score']
                if label in overall_sentiment:
                    overall_sentiment[label] += score
                else:
                    overall_sentiment[label] = score

        # Normalize sentiment scores
        total_score = sum(overall_sentiment.values())
        if total_score > 0:
            for label in overall_sentiment:
                overall_sentiment[label] /= total_score

        return overall_sentiment

    except Exception as e:
        logger.Logg(f"Error occurred during sentiment analysis: {e}")
        return None

def inference(transcription):
    try:
        sentiment_results = analyze_sentiment(transcription)
        return sentiment_results

    except Exception as e:
        logger.Logg(f"Error occurred during inference: {e}")
        return None
@app.route('/sentiment', methods=['POST'])
def get_sentiment():
    try:
        data = request.json
        text_input = data['text']   
        sentiment_results = inference(text_input)

        if sentiment_results:
            logger.Logg(f"Sentiment results: {sentiment_results}")
            return jsonify(sentiment_results)
        else:
            logger.Logg("Error occurred during sentiment analysis.")
            return jsonify({'error': 'Sentiment analysis failed.'}), 500

    except Exception as e:
        logger.Logg(f"Error occurred: {e}")
        return jsonify({'error': 'Internal server error.'}), 500

@app.errorhandler(404)
def page_not_found(e):
    logger.Logg("404 error occurred")
    return render_template('error.html', error_code=404), 404

@app.errorhandler(500)
def internal_server_error(e):
    logger.Logg("500 error occurred")
    return render_template('error.html', error_code=500), 500

@app.errorhandler(Exception)
def handle_exception(e):
    logger.Logg(f"Exception occurred: {e}")
    return render_template('error.html', error_code=500), 500
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000, threaded=True)
    time.sleep(600) 
 