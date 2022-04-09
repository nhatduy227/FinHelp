def summarize_financial_report_by_symbol(data_source, parameters):
    if "symbol" not in parameters:
        return {
            "message": "missing parameter: \"symbol\"",
            "status_code": 400
        }

    if "length" not in parameters:
        return {
            "message": "missing parameter: \"length\"",
            "status_code": 400
        }

    symbol = parameters["symbol"]
    try:
        length = float(parameters["length"])
    except Exception as ex:
        return {
            "message": "invalid type length",
            "status_code": 400
        }

    return {
        "message": "successfully summarize",
        "data": data_source.get_financial_report(symbol, length),
        "status_code": 200
    }


"""
import requests
import trafilatura
from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
from flask import Flask, request, Response
import nltk

nltk.download('punkt')

app = Flask(__name__)


@app.route('/', methods=['POST'])
def respond():
    print("hello world")
    url = request.form.get("url", None)
    print(url)
    length = request.form.get("length", None)
    LANGUAGE = "english"
    parser = HtmlParser.from_url(url, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)
    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    downloaded = requests.get(url, headers={"User-agent": "Mozilla-5"}).text

    y = trafilatura.process_record(
        downloaded, include_comments=False, include_tables=False,
        deduplicate=True, target_language="en", include_formatting=False
    )

    response = []

    if y == None:
        first_paragraph = ""
        l = len(parser.document.sentences)
        SENTENCES_COUNT = int(l * float(length))
    else:
        first_paragraph = ""
        l = len(y.split("\n"))
        SENTENCES_COUNT = int(l * float(length))
        for p in y.split("\n"):
            if len(p) > 150:
                first_paragraph = p
                break

    if first_paragraph != "":
        response.append(first_paragraph + "\n\n")
    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        if str(sentence) not in first_paragraph:
            response.append(str(sentence) + "  ")

    res = ""

    for s in response:
        res += s

    return Response(res, mimetype="text/plain")


@app.route('/text/', methods=['POST'])
def respond_text():
    y = request.form.get("text", None)
    length = request.form.get("length", None)

    LANGUAGE = "english"
    parser = PlaintextParser.from_string(y, Tokenizer("english"))
    stemmer = Stemmer(LANGUAGE)
    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    response = []
    l = len(y.split(". "))
    SENTENCES_COUNT = int(l * float(length)) * 2

    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        response.append(str(sentence) + "  ")

    res = ""

    for s in response:
        res += s

    return Response(res, mimetype="text/plain")


if __name__ == '__main__':
    app.run(threaded=True, port=5000)

"""