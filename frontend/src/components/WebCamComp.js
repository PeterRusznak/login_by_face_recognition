import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = (props) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    let counter = 0;

    //----------------newly added part, responsible for calling backend
    function callBackend(imageSrc, props) {
        let entry = {
            image: imageSrc
        };

        fetch(`${window.origin}/picture`, {
            method: "POST",
            body: JSON.stringify(entry),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                props.history.push('/ok');
            } else if (response.status === 403) {
                props.history.push('/not_ok');
            }
        });
    }
    //----------------end of newly added part

    function savePicture(imageSrc, counter) {
        let link = document.createElement("a");
        document.body.appendChild(link);
        link.href = imageSrc;
        counter++;
        link.download = "screenshot" + counter + ".jpg";
        link.click();
        document.body.removeChild(link);
        return counter;
    }

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        callBackend(imageSrc, props);
        counter = savePicture(imageSrc, counter);
    }, [webcamRef, setImgSrc]);
    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture photo</button>
            {imgSrc && (
                <img
                    src={imgSrc}
                />
            )}
        </>
    );
};

export default WebcamCapture;






