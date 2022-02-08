from flask import Flask, send_from_directory, request, jsonify
import pandas as pd
import sys

app = Flask(__name__, static_folder="client/build", static_url_path="")


@app.route("/api/join", methods=["POST"])
def join():
    if request.method == 'POST':
        content = request.json
        joinMethod = content['method']
        matchOn = content['on']
        ldf = pd.DataFrame.from_dict(content['ldf'])
        rdf = pd.DataFrame.from_dict(content['rdf'])
        res = ldf.merge(rdf, how=joinMethod, on=matchOn)
        print(res, file=sys.stderr)
        result = res.to_json()
        return {"results": result}

@app.route("/api/columns", methods=["POST"])
def columns():
    if request.method == 'POST':
        if 'file' not in request.files:
            return {"Error": "No File Received"}
        file = request.files['file']
        index = int(request.form['colIndex'])
        #print(type(index), file=sys.stderr)
        df = pd.read_csv(file, header=index)
        res = list(df.columns)
        return {"columns": res}

@app.route("/api/parse", methods=["POST"])
def parse():
    if request.method == 'POST':
        if 'file' not in request.files:
            return {"Error": "No File Received"}
        file = request.files['file']
        index = int(request.form['colIndex'])
        data = request.form['columns'].split(",")
        df = pd.read_csv(file, header=index , usecols=data)
        print(type(df.to_json), file=sys.stderr)
        #print(count, file=sys.stderr)
        return df.to_json()




@app.route("/")
def index():
    return send_from_directory(app.static_folder, 'index.html')
    # return app.send_static_file('index.html')

    