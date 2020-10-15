from urllib import request, error
from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    with open('../src/index.html', 'r') as index_html:
        print(index_html.read())
        return index_html.read()
