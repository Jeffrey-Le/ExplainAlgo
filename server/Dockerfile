# ── Stage 1: Builder ────────────────────────────────────────────
# Install deps in an isolated layer so they don't bloat the final image.
FROM python:3.12-slim AS builder

WORKDIR /build

# Install build deps (psycopg2 needs libpq-dev)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
# Dependencies installed: 2026-03-26
RUN pip install --upgrade pip \
    && pip install --prefix=/install --no-cache-dir -r requirements.txt


# ── Stage 2: Runtime ─────────────────────────────────────────────
FROM python:3.12-slim AS runtime

WORKDIR /app

# Runtime system dep only (no gcc)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application source
# Intentionally explicit — avoids copying .env, __pycache__, .git, etc.
COPY app.py config.py extensions.py run.py ./
COPY api/ ./api/
COPY gemini/ ./gemini/
COPY migrations/ ./migrations/

# Non-root user — never run app containers as root
RUN useradd --no-create-home --shell /bin/false appuser \
    && chown -R appuser:appuser /app
USER appuser

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_ENV=production \
    PORT=5000

EXPOSE 5000

# Gunicorn: production WSGI server
# - 2 workers per CPU core is the standard starting point
# - timeout 120s to handle slow Gemini API responses
# - bind to 0.0.0.0 so k8s can route to it
CMD ["gunicorn", \
     "--workers", "2", \
     "--timeout", "120", \
     "--bind", "0.0.0.0:5000", \
     "--access-logfile", "-", \
     "--error-logfile", "-", \
     "run:flask_app"]
