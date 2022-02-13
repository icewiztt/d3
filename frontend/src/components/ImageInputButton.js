import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';
import {FiUpload} from 'react-icons/fi';
const ImageInputButton = ({setSelectedImage, setImageUploaded, setBase64Str}) =>{
    const hiddenFileInput = React.useRef(null);
    const handleClick = (event) =>{
        hiddenFileInput.current.click();
    };

    const handleChange = (event) => {
        setSelectedImage(event.target.files[0]);
        setImageUploaded(true);
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error);
        });
        toBase64(event.target.files[0]).then(res => {
            setBase64Str(res);
        }).catch(err => console.log(err))
    };

    return (
        <>
        <Form.Group id="image-upload" controlId="formFile">
            <Button variant='outline-info' onClick={handleClick}><FiUpload/> Pick Image</Button>
            <Form.Control type="file" ref={hiddenFileInput} onChange={handleChange} style={{display:'none'}} />
        </Form.Group>
        </>
    )
}

export default ImageInputButton;