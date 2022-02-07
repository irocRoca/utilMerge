from flask import Flask, send_from_directory, request, jsonify
import pandas as pd
import sys

app = Flask(__name__, static_folder="client/build", static_url_path="")




@app.route("/api/columns", methods=["POST"])
def columns():
    if request.method == 'POST':
        if 'file' not in request.files:
            return {"Error": "No File Received"}
        file = request.files['file']
        df = pd.read_csv(file, header=1)
        res = list(df.columns)
        #print(res, file=sys.stderr)
        return {"columns": res}

@app.route("/api/parse", methods=["POST"])
def parse():
    if request.method == 'POST':
        if 'file' not in request.files:
            return {"Error": "No File Received"}
        file = request.files['file']
        data = request.form['columns'].split(",")
        df = pd.read_csv(file, header=1 , usecols=data)
        #print(count, file=sys.stderr)
        return df.to_json()




@app.route("/")
def index():
    return send_from_directory(app.static_folder, 'index.html')
    # return app.send_static_file('index.html')

    