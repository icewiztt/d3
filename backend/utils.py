import cv2
import grpc
import numpy as np
import tensorflow as tf
import json
import requests
import base64
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2_grpc

def convert_image(img):
    if isinstance(img, str):
        img = base64.b64decode(img[img.find(',') : ])
    img = np.fromstring(img , np.uint8)
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (512,512))
    return img

channel = grpc.insecure_channel("localhost:8500")
stub = prediction_service_pb2_grpc.PredictionServiceStub(channel)

request = predict_pb2.PredictRequest()
request.model_spec.name = "bit"
request.model_spec.signature_name = "serving_default"

def grpc_infer(img):

    if img.ndim == 3:
        img = np.expand_dims(img, axis=0)

    request.inputs["input_1"].CopyFrom(
        tf.make_tensor_proto(
            img,
            dtype=np.float32,
            shape=img.shape
        )
    )
    try:
        result = stub.Predict(request)
        result = result.outputs["dense"].float_val
        result = np.array(result).reshape((-1, 10))
        result = np.argmax(result, axis=-1)
        return result
    except Exception as e:
        return None

def rest_infer(imgs,
               model_name='bit',
               host='localhost',
               port=8501,
               signature_name="serving_default"):
    if imgs.ndim == 3:
        imgs = np.expand_dims(imgs, axis=0)
        
    data = json.dumps({
        "signature_name": signature_name,
        "instances": imgs.tolist()
    })
    
    headers = {"content-type": "application/json"}
    json_response = requests.post(
        'http://{}:{}/v1/models/{}:predict'.format(host, port, model_name),
        data=data,
        headers=headers
    )
    
    if json_response.status_code == 200:
        y_pred = json.loads(json_response.text)['predictions']
        y_pred = np.argmax(y_pred, axis = -1)
        return y_pred
    else:
        return None