FROM python:3.12-alpine

WORKDIR /app

# Install build and runtime dependencies
RUN apk add --no-cache gcc musl-dev libffi-dev

# install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
