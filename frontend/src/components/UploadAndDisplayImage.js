import { useState } from "react";
import {Container,Button,Col,Row,ButtonGroup} from 'react-bootstrap';
import ImageInputButton from "./ImageInputButton";
import Header from "./Header";
import Prediction from "./Prediction";

const CLASSES = ['Safe Driving', 'Text Right', ' Phone Right', 'Text Left', 'Phone Left', ' Adjusting Radio', 'Drinking', 'Reaching Behind', 'Hair or Makeup ', 'Talking to Passenger'];
const ModelList = ['MobileNetV1', 'MobileNetV2', 'ResNet', 'ResNetV2', 'Inception', 'VGG', 'EfficientNet'];
const ModelCount = ModelList.length;

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ImageUploaded , setImageUploaded] = useState(false);
  const [base64Str, setBase64Str] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [modelPick, setModelPick] = useState(Array(ModelCount).fill(0));

  const onFileUpload = () => {
    const fd = new FormData();
    fd.append('img' , base64Str);
    const requestOptions = {
        method: 'POST',
        body: fd,
    };
    var startTime = performance.now()
    fetch('http://127.0.0.1:5000/api/driver' , requestOptions).then((res) => {
        if (res.status < 200 || res.status >= 300)throw res.statusText
        return res.json()
      }).then(
        (data)=>{
          if(data['code'] === 200)
            console.log(CLASSES[data['result']])
            setPrediction(CLASSES[data['result']])
            var endTime = performance.now()
            console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
        } , (err) => {
          console.log(err);
        });
   
  };
  const ChooseModel = (index) => e =>{
    let tmpArray = new  Array(ModelCount);
    for(let i = 0 ; i < ModelCount; ++i)tmpArray[i] = (index === i);
    setModelPick(tmpArray);
  }
  return (
    <>
      <Header/>
      <br/>
      <Container>
        <Row>
          <ButtonGroup>
            {ModelList.map((model , index)=>(
              <Button variant={modelPick[index] ? 'primary' : 'light'} key={index} onClick={ChooseModel(index)}>{model}</Button>
            ))}
          </ButtonGroup>
        </Row>
        <br/> <br/> <br/>
        <Row className='text-center'>
          <Col xs={8}>
            {ImageUploaded && (
              <div>
              <img alt="not found" width={"300px"} src={URL.createObjectURL(selectedImage)} />
              </div>
            )}
            <br/>
            <ImageInputButton
              setSelectedImage={setSelectedImage} 
              setImageUploaded={setImageUploaded}
              setBase64Str={setBase64Str}
            />
          </Col>
          <Col>
            {prediction && (<div> Prediction: {prediction} <Prediction/> </div>)}
            {ImageUploaded && (<Button variant='outline-primary' onClick={onFileUpload}>Predict</Button>)}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UploadAndDisplayImage;