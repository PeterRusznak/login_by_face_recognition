from flask import Flask, request, make_response
import base64
from fastai import *
from fastai.vision.all import *

app = Flask(__name__)
path = Path()
learn_inf = load_learner(path/'export.pkl')


@app.route('/picture', methods=['POST'])
def call_predict():
    req = request.get_json()
    imagestr = req.get('image')
    imagestr = imagestr.replace('data:image/jpeg;base64', '')
    image = base64.b64decode(str(imagestr))
    pili_img = PILImage.create(io.BytesIO(image))

    pred, pred_idx, probs = learn_inf.predict(pili_img)
    print("pred")
    print(pred)
    print(probs)
    if pred == "me":
        res = make_response({"message": "OK"}, 200)
    else:
        res = make_response({"message": "Unrecognized"}, 403)
    return res
