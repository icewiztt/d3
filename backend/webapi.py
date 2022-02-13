import json

from flask import Flask, request
from flask_cors import CORS

from utils import rest_infer, convert_image, grpc_infer

app = Flask(__name__)
CORS(app)

@app.route('/api/driver', methods=['POST'])
def hello():
    img = request.values.get('img')
    img = convert_image(img)
    result = int(grpc_infer(img))
    print(result)
    return json.dumps(
        {
            "code": 200,
            "result": result
        }
    )


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)