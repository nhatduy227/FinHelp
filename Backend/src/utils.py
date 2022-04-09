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


def summarize_article(url, length=0.3):
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

    return res
