# English Accent Detection

## Overview

This repository contains the implementation of an **English Accent Detection** system that analyzes speech patterns to identify the accent of a speaker. The project leverages the power of machine learning and audio processing to achieve this goal.

The primary focus of this project is to train and deploy models capable of distinguishing between different English accents using audio datasets.

---

## Features

- **Accent Detection**: Predict the accent of a speaker from their audio input.
- **Machine Learning Models**: Utilizes advanced ML techniques (e.g., Wav2Vec2) for feature extraction and classification.
- **Reproducible Code**: End-to-end implementation from data preprocessing to model evaluation.

---

## Supported Accents

The model supports the following accents:

- Arabic  
- Dutch  
- English  
- French  
- German  
- Korean  
- Mandarin  
- Portuguese  
- Russian  
- Spanish  
- Turkish

---

## Label-to-Accent Mappings

| Label | Accent     |
|-------|------------|
| 0     | Arabic     |
| 1     | Dutch      |
| 2     | English    |
| 3     | French     |
| 4     | German     |
| 5     | Korean     |
| 6     | Mandarin   |
| 7     | Portuguese |
| 8     | Russian    |
| 9     | Spanish    |
| 10    | Turkish    |

---

## Usage

You can use this model to classify accents in spoken audio.  
Given an input speech waveform, it outputs confidence scores for each accent along with the most probable accent prediction.

---

## Performance

- **Training Data**: Speech Accent Archive  
- **Epochs**: 14  
- **Accuracy**: ~98% (On test set) 
- **Model Architecture**: Wav2Vec2  
- **Generalization**: 41% Accuracy on unseen data  

---

## Repository Structure

- `notebooks/` — Jupyter notebooks for data analysis and model training  
- `scripts/` — Python scripts for preprocessing and model training  
- `models/` — Pre-trained models and checkpoints  
- `results/` — Confusion matrices, accuracy reports, and plots  
- `README.md` — Project documentation  

---

## Model Training

The model training code is available on Kaggle:

- [EAD-2 Model Training Code](https://www.kaggle.com/code/b1ce101vrunddobariya/ead-2)  
- [EAD-3 Model Training Code](https://www.kaggle.com/code/vrunddobariya/ead-3)  
- [EAD-4 Model Training Code](https://www.kaggle.com/code/vrunddobariya/ead-4)  

---

## Pre-Trained Model

You can download and use the pre-trained model from Hugging Face:

[Wav2Vec2 Accent Classification on Hugging Face](https://huggingface.co/vrund1346/wav2vec2_accent_classification_v2)

---

## Project Report

The detailed project report (PDF) is available on Google Drive:

[Project Report (View on Google Drive)](https://drive.google.com/file/d/1o3_rChO9WL1U-jkDrbnt33xDsnCrbr5c/view?usp=drive_link)

---

## Contact

For any inquiries, please refer to the contact information provided in the [project report](https://drive.google.com/file/d/1o3_rChO9WL1U-jkDrbnt33xDsnCrbr5c/view?usp=drive_link).

---

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this project with proper attribution.

---
