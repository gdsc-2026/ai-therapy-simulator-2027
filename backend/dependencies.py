"""
Shared FastAPI dependencies.

Using Depends() keeps the Gemini client out of route handlers directly,
making it trivial to swap or mock in tests.
"""

from functools import lru_cache
from typing import Annotated

from fastapi import Depends
from google import genai

from app.config import Settings, get_settings


@lru_cache
def _build_client(api_key: str) -> genai.Client:
    """Build the Gemini client once and cache it."""
    return genai.Client(api_key=api_key)


def get_gemini_client(
    settings: Annotated[Settings, Depends(get_settings)],
) -> genai.Client:
    return _build_client(settings.google_api_key)


# Convenience type aliases for route signatures
GeminiClient = Annotated[genai.Client, Depends(get_gemini_client)]
AppSettings = Annotated[Settings, Depends(get_settings)]