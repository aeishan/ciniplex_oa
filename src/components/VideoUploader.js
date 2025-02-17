import React, { useEffect, useState } from 'react';

const VideoUploader = ({ file }) => {
    const [media, setMedia] = useState({ source: null, type: null });

    useEffect(() => {
        if (!file) {
            setMedia({ source: null, type: null });
            return;
        }

        const isString = typeof file === "string";
        const isImage = isString && file.startsWith("data:image/png");
        const isVideo = file instanceof File;

        setMedia({
            source: isImage ? file : isVideo ? URL.createObjectURL(file) : null,
            type: isImage ? "image" : isVideo ? "video" : null
        });

    }, [file]);

    return (
        <div className="videoUploader">
            {media.source && (
                media.type === "image" ? 
                    <img src={media.source} alt="background" className="fileBg" /> : 
                    <video key={media.source} src={media.source} autoPlay loop className="fileBg" />
            )}
        </div>
    );
};

export default VideoUploader;
