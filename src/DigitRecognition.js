import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Canvas from './Canvas';

const DigitRecognition = () => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      // Load the pre-trained MNIST model
      const model = await tf.loadLayersModel('./my_model.json');
    //   const model = await tf.loadLayersModel('https://github.com/google/tfjs-mnist-workshop/blob/master/model/model.json');
    setModel(model);
    };
    loadModel();
  }, []);

  const handleDraw = async (canvas) => {
    if (!model) return;

    const imgData = canvas.getContext('2d').getImageData(0, 0, 280, 280);
    const imgTensor = tf.browser.fromPixels(imgData)
      .mean(2)
      .expandDims(0)
      .expandDims(-1)
      .resizeBilinear([28, 28])
      .div(255.0);

    const prediction = await model.predict(imgTensor).argMax(1).data();
    setPrediction(prediction[0]);
  };

  return (
    <div>
      <Canvas onDraw={handleDraw} />
      <h3>Prediction: {prediction !== null ? prediction : 'Draw a digit'}</h3>
    </div>
  );
};

export default DigitRecognition;
