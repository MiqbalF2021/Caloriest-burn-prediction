# import libraries
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler
from flask import Flask, request, jsonify
from flask_cors import CORS

# load model
model = pickle.load(open('Calories_model_RFR.pkl', "rb"))

# load scaler
scalerfile = 'scaler.save'
scaler = pickle.load(open(scalerfile, 'rb'))

# flask constructor
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Calories Prediction API"

# get form data
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    if data['gender'] == 'Male':
        gender = 1
    else:
        gender = 0
    
    age = data['age']
    duration = data['duration']
    heart_rate = data['heart_rate']
    temp = data['temp']
    height = data['height']
    weight = data['weight']
    exercise = data['exercise']

    # store form values into set
    values = [float(gender), float(age), float(height), float(weight), float(duration), float(heart_rate), float(temp)]

    # turn into array & reshape array for prediction
    input_array = np.asarray(values)
    input_array_reshape = input_array.reshape(1, -1)

    # scale the inputted reshaped data
    scaled_set = scaler.transform(input_array_reshape)

    # predict with inputted values
    predicted = model.predict(scaled_set)

    # Adjust predicted calories based on exercise type
    if exercise == 'running':
        predicted *= 3
    elif exercise == 'cycling':
        predicted *= 2.3
    elif exercise == 'swimming':
        predicted *= 4.3
    elif exercise == 'walking':
        predicted *= 2
    elif exercise == 'badminton':
        predicted *= 2.5
    else:
        # Handle default case or error
        pass

     # Format predicted value to have maximum 3 decimal places
    predicted_formatted = '{:.3f}'.format(predicted[0])

    # return predicted values as JSON
    return jsonify({'Activity': exercise,
        'predicted_value': predicted_formatted})

if __name__ == '__main__':
    app.run(debug=True)
