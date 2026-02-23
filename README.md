# 🏥 MedInsight – Clinical AI Decision Support System

> **Understanding Healthcare. Powered by AI.**

MedInsight is a full-stack clinical AI system designed to simplify complex medical information for both patients and healthcare professionals.
It combines multimodal AI models, structured reasoning, and secure architecture to provide clear, safe, and accessible medical insights.

---

## 🚀 The Problem

Healthcare information is often:

* Difficult for patients to understand (complex prescriptions, medical terminology)
* Time-intensive for clinicians to interpret (X-ray analysis, cross-referencing literature)
* Fragmented across multiple tools and systems

Patients struggle to interpret handwritten prescriptions.
Clinicians spend valuable time reviewing imaging and searching for structured medical reasoning.

MedInsight bridges this gap.

---

## 💡 The Solution

MedInsight provides a unified AI-driven decision support platform with two core modes:

---

### 👤 Patient Mode – Prescription Simplification

* Upload prescription image
* Extract text using OCR
* Convert complex medical jargon into clear, structured explanations
* Read-aloud support for accessibility

Designed to improve health literacy and reduce confusion.

---

### 🩻 Doctor Mode – Clinical Assistance

#### 1️⃣ Chest X-Ray Understanding

* Upload chest X-ray (PNG/JPG)
* Analyze using pre-trained clinical DenseNet backbone
* Generate structured explanation with safety constraints
* Designed for **decision support**, not diagnosis

#### 2️⃣ Clinical Q&A Reasoning

* Provide patient history
* Ask structured medical question
* Receive grounded, safety-aware clinical explanation

---

## 🧠 AI & Model Stack

| Component                    | Purpose                           |
| ---------------------------- | --------------------------------- |
| **MedGemma 4B-it**           | Clinical reasoning & explanation  |
| **TorchXRayVision DenseNet** | Chest X-ray pathology detection   |
| **Tesseract OCR**            | Fast prescription text extraction |
| **Minimal Safety RAG**       | Context grounding & compliance    |
| **Web Speech API**           | Accessibility via audio           |

All responses are constrained to:

* Avoid definitive diagnoses
* Encourage professional consultation
* Provide structured, safe explanations
* Maintain clarity and completeness

---

## 🏗 System Architecture

```
Frontend (HTML + CSS + JS)
        ↓
Django Backend (Routing + API Proxy + Cloudinary Integration)
        ↓
FastAPI AI Engine (GPU Inference)
        ↓
Clinical Models & Reasoning Stack
```

### Deployment Strategy

* **Frontend** → Vercel
* **Django Backend** → Render
* **AI Engine (GPU)** → Vast.ai
* **Media Storage** → Cloudinary

A warm-up endpoint prevents cold-start delays in production.

---

## 🔐 Responsible AI & Safety

MedInsight is built as a **clinical decision-support tool**, not a diagnostic system.

Safety features include:

* Structured prompting with safety constraints
* Explicit non-diagnostic positioning
* Controlled response length
* Medical disclaimer integration
* No speculative or unsupported claims

---

## 📚 RAG (Retrieval-Augmented Generation) – Enterprise Use Case

MedInsight supports integration of Retrieval-Augmented Generation (RAG) for secure, private clinical knowledge bases.

Potential enterprise applications include:

* Hospital-specific patient record retrieval (secure internal data)
* Clinical protocol reference systems
* Research paper indexing and retrieval
* Internal medical documentation systems
* Policy and compliance knowledge stores

Because these datasets are **non-public and institution-specific**, RAG enables:

* Context-aware reasoning
* Secure internal document grounding
* Reduced hallucination risk
* Domain-specialized responses

This makes MedInsight extensible beyond general-purpose AI into hospital-grade knowledge systems.

---

## 🌍 Accessibility & Usability

* Plain-language explanations
* Clean structured formatting (Markdown rendering)
* English female voice read-aloud
* Responsive and minimal UI design
* Separate flows for patient and clinician use

---

## 🎬 Demonstration

**Live Deployment:** *https://medinsight-ai-web.vercel.app/*
**Demo Video:** *temp*

---

## 🧩 Key Highlights

* Multimodal AI (Image + Text)
* Clinical X-ray backbone integration
* Structured reasoning with safety constraints
* Cloud-deployed GPU inference
* Full-stack architecture
* Enterprise-ready RAG extensibility

---

## 👨‍💻 Author

**Vikash**
Built with focus on clarity, safety, and real-world healthcare usability.

---

## 🏁 Closing Note

MedInsight demonstrates how modern multimodal AI systems can responsibly assist in healthcare interpretation — improving understanding, saving time, and enhancing accessibility without replacing medical professionals.
