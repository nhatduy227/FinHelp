from flask import Flask
import src.services as services
from flask_cors import CORS

app = Flask(__name__)

# Config CORS
app.config["CORS_HEADERS"] = ["Content-Type"]
app.config["CORS_ORIGIN"] = "*"
app.config["CORS_SUPPORT_CREDENTIALS"] = True

cors = CORS(app=app, resource={r"/*": {"origins": "*"}})

app.register_blueprint(services.stock_news_service)
app.register_blueprint(services.stock_quote_service)

  