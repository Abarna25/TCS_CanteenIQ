"""
CanteenIQ FastAPI Server Launcher
"""

import uvicorn
import os
import sys

# Ensure backend root is on sys.path
backend_dir = os.path.abspath(os.path.dirname(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

if __name__ == "__main__":
    print("Starting CanteenIQ Intelligence Engine on http://127.0.0.1:8000...")
    print("OpenAPI Interactive Docs available at: http://127.0.0.1:8000/docs")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
