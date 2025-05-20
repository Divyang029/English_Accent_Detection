# English Accent Detection

## Overview

This repository contains the implementation of an **English Accent Detection** system that analyzes speech patterns to identify the accent of a speaker. The project leverages the power of machine learning and audio processing to achieve this goal.

The primary focus of this project is to train and deploy models capable of distinguishing between different English accents using audio datasets.

---

## 🔗 Live Demo

👉 [Try the Accent Detection App](https://english-accent-detection.vercel.app/)  
*Frontend deployed on Vercel — interacts with a Spring Boot backend deployed on Railway.*

---

## Features

- **Accent Detection**: Predict the accent of a speaker from their audio input.
- **Machine Learning Models**: Utilizes advanced ML techniques (e.g., Wav2Vec2) for feature extraction and classification.
- **Reproducible Code**: End-to-end implementation from data preprocessing to model evaluation.
- **Frontend**: built with ReactJS and hosted on Vercel
- **Backend**: built with Spring Boot and deployed via Docker on Railway
- **Dataabase**: MySQL on Aiven for database management
- **Microsoft Azure Blob Storage**: for secure audio file storage

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

```plaintext
├── frontend/          # ReactJS frontend 
├── backend/           # Spring Boot backend
├── model/             # Machine learning code, models, and notebooks
│   ├── notebooks/     # Jupyter notebooks for data analysis and model training  
│   ├── scripts/       # Python scripts for preprocessing and model training 
│   ├── models/        # Pre-trained models and checkpoints
│   └── results/       # Confusion matrices, accuracy reports, and plots  
├── README.md          # Project documentation
```
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

## Web UI Screenshots

### 🧭 Dashboard

<div align="center">
  <img src="https://github.com/user-attachments/assets/7824c2a1-8e7a-4f7f-8afb-c26f6912bfd5" width="800" />
  <br><br>
  <img src="https://github.com/user-attachments/assets/c2696903-161a-43f2-9b37-27921b113300" width="800" />
</div>

<br><br>

### 🎙️ Accent Analysis

<div align="center">
  <img src="https://github.com/user-attachments/assets/2a2e1679-30e1-4859-a853-7ac0b758e047" width="700" />
  <br><br>
  <img src="https://github.com/user-attachments/assets/7a79a3fb-27d7-4519-b083-1387d4c9b96e" width="700" />
  <br><br>
  <img src="https://github.com/user-attachments/assets/8ae657c0-0341-4aaa-9357-cb1b3746384c" width="500" />
</div>

<br><br>

### 🌍 Accent-Country Mapping

<div align="center">
  <img src="https://github.com/user-attachments/assets/3ad249d7-f75f-4c37-9be6-dff041358ec0" width="800" />
</div>

<br><br>

### 🗺️ Country Details

<div align="center">
  <img src="https://github.com/user-attachments/assets/8a745de1-072a-4c72-9d05-8e1798768a46" width="500" />
</div>

<br><br>

### 🕓 History Page

<div align="center">
  <img src="https://github.com/user-attachments/assets/4db26cf6-4759-4aa9-81da-2dc4cee9f740" width="800" />
</div>

<br><br>

### ℹ️ About Page

<div align="center">
  <img src="https://github.com/user-attachments/assets/2d9e8ea0-3c4a-4533-9273-131d7c57f427" width="800" />
</div>

<br><br>

### 🔐 Sign Up & Login

<div align="center">
  <img src="https://github.com/user-attachments/assets/57de7e04-ded1-491b-9d4b-71fcc4d950b5" width="700" />
  <br><br>
  <img src="https://github.com/user-attachments/assets/e99ed4e3-9be4-4839-9089-ab9eb555a8c4" width="700" />
</div>

<br><br>

### 🔄 Forget Password

<div align="center">
  <img src="https://github.com/user-attachments/assets/9a01397f-f9a7-41cb-b735-caa07b224092" width="700" />
</div>

---

## 🐳 Docker Setup (Backend)

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following keys:

```env
PORT=app_port

# MySQL (Aiven) Database Configuration
DB_URL=your_db_url
DB_USER=your_user+name
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=jwt_secret_key
JWT_EXP_MS=exp_time

# Mailer Configuration
YOUR_EMAIL=your_email
YOUR_APP_PASSWORD=app_password

# Frontend binding
FRONTEND_URL=localhost_frontend_url
DEPLOYED_URL=deployed_frontend_url

# Azure Storage Configuration
AZURE_BLOB_CONN_STRING=azire_conn_string
VOICE_CONTAINER_NAME=container_name
AVATAR_CONTAINER_NAME=container_name
```

### 📦 Build the Docker Image

```bash
cd backend
docker build -t accent-backend .
docker run -p 8080:8080 --env-file .env accent-backend
```

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
