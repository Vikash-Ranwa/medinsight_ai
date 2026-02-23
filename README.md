# 🏥 MedInsight – Clinical AI Decision Support System

> **Understanding Healthcare. Powered by AI.**

MedInsight is a full-stack, multimodal clinical AI platform designed to assist both patients and healthcare professionals through intelligent prescription interpretation, imaging analysis, and structured clinical reasoning.

Built with production extensibility in mind, MedInsight is architected to be deployable within hospital infrastructure.

---

## 🚀 The Problem

Healthcare systems face two persistent challenges:

* Patients struggle to interpret prescriptions and medical terminology.
* Clinicians spend valuable time analyzing imaging and referencing clinical knowledge across fragmented systems.

Medical information is complex. Time is limited.
Clarity and structured decision support are essential.

---

## 💡 The Solution

MedInsight provides:

### 👤 Patient Mode

* Prescription image upload
* OCR-based text extraction
* AI-powered plain-language explanation
* Audio accessibility support

### 🩺 Doctor Mode

* Chest X-ray analysis with structured reasoning
* Clinical Q&A based on patient history
* Context-grounded response generation

Designed as a **clinical decision-support system**, not a diagnostic replacement.

---

# 🧠 AI & Model Stack

MedInsight integrates a multimodal AI pipeline combining imaging, language reasoning, and document retrieval.

| Component                                                     | Role in System                                                       |
| ------------------------------------------------------------- | -------------------------------------------------------------------- |
| **MedGemma 4B-it**                                            | Clinical reasoning, structured explanation, multimodal understanding |
| **CXR Foundation Model (HAI-DEF / TorchXRayVision DenseNet)** | Chest X-ray pathology analysis                                       |
| **Tesseract OCR**                                             | High-speed prescription text extraction                              |
| **RAG (Retrieval-Augmented Generation)**                      | Secure hospital document & patient data grounding                    |
| **Web Speech API**                                            | Accessibility via structured voice output                            |

---

## 🔍 Retrieval-Augmented Generation (RAG)

In production deployment, RAG is not limited to safety grounding.

MedInsight supports secure hospital-grade retrieval systems for:

* Internal patient records (non-public, permission-controlled)
* Hospital treatment protocols
* Clinical research databases
* Institutional guidelines
* Policy and compliance documentation
* Medical literature archives

Because this data resides within hospital infrastructure, RAG enables:

* Context-aware reasoning using institution-specific knowledge
* Reduced hallucination risk
* Domain-specialized outputs
* Private data grounding without public exposure

This makes MedInsight adaptable for **on-premise hospital deployment**.

---

# 🏗 System Architecture

```text
Frontend (HTML + CSS + JS)
        ↓
Django Backend (Routing + API Proxy + Cloudinary Integration)
        ↓
FastAPI AI Engine
        ↓
GPU Inference Layer
```

---

## ⚙ FastAPI AI Engine

The AI Engine is designed for scalable GPU-backed inference.

### Responsibilities:

* **MedGemma inference (GPU)**
* **CXR model inference (GPU)**
* **Prescription OCR processing**
* RAG document retrieval integration
* Safety-constrained prompt orchestration

The engine supports horizontal scaling and can be deployed:

* On cloud GPU infrastructure
* On hospital-managed GPU servers
* Within secure clinical environments

---

# 🔐 Responsible AI & Clinical Safety

MedInsight operates strictly as a decision-support system.

Safety measures include:

* Non-diagnostic positioning
* Structured explanation constraints
* Controlled output length
* Professional consultation recommendation
* Reduced speculative reasoning
* Institution-grounded retrieval (via RAG)

---

# 🌍 Accessibility & Design

* Plain-language explanation formatting
* Structured Markdown rendering
* English female voice read-aloud
* Responsive UI for both patient and clinician flows
* Minimalist professional design

---

# 🌐 Deployment Strategy

Current deployment stack:

* **Frontend:** Vercel
* **Backend:** Render
* **AI Engine:** GPU-hosted inference (Vast.ai)
* **Media Storage:** Cloudinary

Production deployment model:

* Hospital on-prem server
* Internal GPU infrastructure
* Secure RAG indexing of institutional data
* Private network access control

---

## 🎬 Demonstration

**Live Deployment:** *https://medinsight-ai-web.vercel.app/*
**Demo Video:** *temp*

---

# 🧩 Key Highlights

* Multimodal AI (Image + Text)
* Clinical imaging backbone integration (HAI-DEF)
* Enterprise-ready RAG extensibility
* Secure hospital deployment architecture
* Full-stack production pipeline
* Accessible and structured output system

---

# 👨‍💻 Author

**Vikash**
Focused on building safe, scalable, and hospital-ready clinical AI systems.

---

# 🏁 Vision

MedInsight represents a scalable blueprint for integrating multimodal AI into real clinical environments — enhancing clarity, reducing cognitive load, and improving healthcare accessibility without replacing medical professionals.

---
