FROM python:3.9

WORKDIR /app
COPY requirements.txt requirements.txt
RUN apt-get update && apt-get install -y default-libmysqlclient-dev
RUN pip install --upgrade pip && pip install -r requirements.txt
COPY . .

EXPOSE 5000
ENTRYPOINT ["python3", "app.py"]