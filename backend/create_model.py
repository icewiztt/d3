import tensorflow as tf
import tensorflow_hub as hub
import os

hub_url = 'https://tfhub.dev/google/bit/m-r50x1/1'
os.environ["TFHUB_MODEL_LOAD_FORMAT"] = "UNCOMPRESSED"
IMAGE_SIZE = [224,224]
img_adjust_layer = tf.keras.layers.InputLayer((*IMAGE_SIZE,3))
pretrained_model = hub.KerasLayer(hub_url, trainable=True)
model = tf.keras.Sequential([
    img_adjust_layer,
    pretrained_model,
    tf.keras.layers.Dense(10, activation = 'softmax')
])
version = 1
export_path = os.path.join('./temp_models/serving', '1')
print('export_path = {}\n'.format(export_path))
tf.keras.models.save_model(
    model,
    export_path,
    overwrite=True,
    include_optimizer=True,
    save_format=None,
    signatures=None,
    options=None
)
print('\nSaved model:')
