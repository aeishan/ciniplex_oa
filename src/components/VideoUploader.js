import React, { useEffect, useState } from 'react';

const VideoUploader = ({ file }) => {
    const [mediaSource, setMediaSource] = useState(null);
    const [mediaType, setMediaType] = useState(null);

    useEffect(() => {
        if (!file) {
            setMediaSource(null);
            setMediaType(null);
            return;
        }

        if (typeof file === "string") {  // Images are sent as base64 strings
            if (file.startsWith("data:image/png")) {
                setMediaSource(file);
                setMediaType("image");
            } 
            // If it's an MP4 blob URL, use it correctly
            // else if (file.startsWith("blob:")) {
            //     setMediaSource(file);
            //     setMediaType("video");
            // }
        } 
        else if (file instanceof File) {  // .mp4 files are sent as File objects
            // // If a new file is uploaded
            // const type = file.type.split('/')[1];
            // if (type === "png") {
            //     const reader = new FileReader();
            //     reader.onload = (e) => {
            //         setMediaSource(e.target.result);
            //         setMediaType("image");
            //     };
            //     reader.readAsDataURL(file);
            setMediaSource(URL.createObjectURL(file)); // Ensure correct video handling
            setMediaType("video");
        }
    }, [file]);

    return (  
        <div className="videoUploader">
            {mediaSource && mediaType === "image" && (
                <img src={mediaSource} alt="background" className="fileBg"/>
            )}
            {mediaSource && mediaType === "video" && (
                <video key={mediaSource} src={mediaSource} autoPlay loop className="fileBg"/>
            )}
        </div>
    );
}

export default VideoUploader;
