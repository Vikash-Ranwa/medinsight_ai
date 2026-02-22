import io
import traceback
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import requests
import cloudinary
import cloudinary.uploader

# configure cloudinary using settings (ensure env vars set)
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)

FASTAPI_URL = settings.FASTAPI_URL

def warmup(request):
    return JsonResponse({"status":"ok"})

def _upload_to_cloudinary(fileobj, filename, folder="medinsight/tmp"):
    """
    Upload bytes or file-like to Cloudinary. Returns dict or None on error.
    """
    try:
        res = cloudinary.uploader.upload(
            fileobj,
            folder=folder,
            public_id=None,
            overwrite=False,
            resource_type="image",
        )
        return {"url": res.get("secure_url"), "public_id": res.get("public_id"), "raw": res}
    except Exception as e:
        print("Cloudinary upload error:", e)
        return None

@csrf_exempt
def analyze_prescription(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)
    try:
        if "file" not in request.FILES:
            return JsonResponse({"error": "No file provided"}, status=400)

        f = request.FILES["file"]
        filename = f.name
        content_type = f.content_type
        file_bytes = f.read()

        cloud_resp = _upload_to_cloudinary(io.BytesIO(file_bytes), filename, folder="medinsight/prescriptions")

        files = {"file": (filename, file_bytes, content_type)}
        forward_url = f"{FASTAPI_URL}/analyze/prescription"
        resp = requests.post(forward_url, files=files, timeout=120)

        try:
            data = resp.json()
        except Exception:
            data = {"raw_text": resp.text}

        data["_cloudinary"] = cloud_resp or {}
        return JsonResponse(data, status=resp.status_code if resp.status_code < 500 else 200)

    except Exception as e:
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)


def add_cors_headers(response):
    """Add CORS headers to response"""
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With"
    return response

@csrf_exempt
def analyze_cxr(request):
    if request.method == "OPTIONS":
        response = HttpResponse()
        return add_cors_headers(response)
    
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)
    try:
        if "file" not in request.FILES:
            return JsonResponse({"error": "No file provided"}, status=400)

        f = request.FILES["file"]
        filename = f.name
        content_type = f.content_type
        file_bytes = f.read()

        cloud_resp = _upload_to_cloudinary(io.BytesIO(file_bytes), filename, folder="medinsight/cxr")

        files = {"file": (filename, file_bytes, content_type)}
        forward_url = f"{FASTAPI_URL}/analyze/cxr"
        resp = requests.post(forward_url, files=files, timeout=120)

        try:
            data = resp.json()
        except Exception:
            data = {"raw_text": resp.text}

        data["_cloudinary"] = cloud_resp or {}
        response = JsonResponse(data, status=resp.status_code if resp.status_code < 500 else 200)
        return add_cors_headers(response)

    except Exception as e:
        traceback.print_exc()
        response = JsonResponse({"error": str(e)}, status=500)
        return add_cors_headers(response)


@csrf_exempt
def analyze_qa(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)
    try:
        history = request.POST.get("history", "")
        question = request.POST.get("question", "")

        cloud_resp = None
        files = None
        if "file" in request.FILES:
            f = request.FILES["file"]
            filename = f.name
            content_type = f.content_type
            file_bytes = f.read()
            cloud_resp = _upload_to_cloudinary(io.BytesIO(file_bytes), filename, folder="medinsight/qa")
            files = {"file": (filename, file_bytes, content_type)}

        forward_url = f"{FASTAPI_URL}/analyze/qa"
        if files:
            resp = requests.post(forward_url, data={"history": history, "question": question}, files=files, timeout=120)
        else:
            resp = requests.post(forward_url, data={"history": history, "question": question}, timeout=120)

        try:
            data = resp.json()
        except Exception:
            data = {"raw_text": resp.text}

        if cloud_resp:
            data["_cloudinary"] = cloud_resp

        return JsonResponse(data, status=resp.status_code if resp.status_code < 500 else 200)

    except Exception as e:
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)
