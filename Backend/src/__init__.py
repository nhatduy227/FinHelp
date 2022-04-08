from flask import Flask
import src.services as services

app = Flask(__name__)

app.register_blueprint(services.stock_news_service)
app.register_blueprint(services.stock_quote_service)

