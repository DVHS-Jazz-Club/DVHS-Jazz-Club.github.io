import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const createImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed for cross-origin images
    image.src = url;
  });
};

// Utility to get the cropped image as a blob
async function getCroppedImg(imageSrc, crop, zoom, rotation = 0, aspect = 16 / 9) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - crop.x,
    0 - safeArea / 2 + image.height * 0.5 - crop.y
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
}

const ImageCropModal = ({ imageSrc, onCancel, onCropComplete, aspect = 16 / 9 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (newCrop) => setCrop(newCrop);
  const onZoomChange = (newZoom) => setZoom(newZoom);

  const onCropCompleteInternal = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 1));
  };

  const handleRotateLeft = () => {
    setRotation(prev => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation(prev => prev + 90);
  };

  const handleFineRotation = (e) => {
    setRotation(parseInt(e.target.value));
  };

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, zoom, rotation, aspect);
    onCropComplete(croppedBlob);
  };

  return (
    <div className="modal-overlay active" style={{ zIndex: 3000 }}>
      <div className="modal-content" style={{ 
        width: '95vw', 
        maxWidth: '1200px', 
        height: '90vh', 
        maxHeight: '900px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }}>
        {/* Controls Bar pinned to top */}
        <div style={{
          flexShrink: 0,
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '8px 8px 0 0',
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          zIndex: 2
        }}>
          <h3 style={{ margin: 0, fontSize: '24px' }}>Crop Image</h3>
          {/* Zoom and Quick Rotation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <button 
              className="btn btn-secondary" 
              onClick={handleZoomOut}
              style={{ 
                padding: '10px 16px', 
                fontSize: '16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                minWidth: '120px'
              }}
            >
              🔍- Zoom Out
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleZoomIn}
              style={{ 
                padding: '10px 16px', 
                fontSize: '16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                minWidth: '120px'
              }}
            >
              🔍+ Zoom In
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleRotateLeft}
              style={{ 
                padding: '10px 16px', 
                fontSize: '16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                minWidth: '120px'
              }}
            >
              ↶ Rotate Left
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleRotateRight}
              style={{ 
                padding: '10px 16px', 
                fontSize: '16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                minWidth: '120px'
              }}
            >
              ↷ Rotate Right
            </button>
          </div>
          {/* Fine Rotation Slider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px',
            justifyContent: 'center'
          }}>
            <label style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: '#495057',
              minWidth: '100px'
            }}>
              Fine Rotate:
            </label>
            <input
              type="range"
              min="0"
              max="180"
              value={Math.abs(rotation % 180)}
              onChange={handleFineRotation}
              style={{ 
                flex: '1',
                maxWidth: '300px',
                height: '8px',
                borderRadius: '4px',
                background: '#ddd',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <span style={{ 
              fontSize: '16px', 
              color: '#495057',
              minWidth: '50px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              {Math.abs(rotation % 180)}°
            </span>
          </div>
        </div>

        {/* Cropper fills all available space between top and bottom bars */}
        <div style={{
          flex: '1 1 0',
          minHeight: '200px',
          minWidth: 0,
          position: 'relative',
          background: '#222',
          borderRadius: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteInternal}
          />
        </div>

        {/* Sticky Action Bar: Instructions + Buttons */}
        <div style={{ 
          position: 'sticky',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
          padding: '15px 0',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '15px',
          flexShrink: 0,
          borderTop: '1px solid #e9ecef',
          background: 'white',
          flexWrap: 'wrap',
          minHeight: '70px'
        }}>
          <span style={{ fontSize: '15px', color: '#555', maxWidth: '60%', lineHeight: 1.3 }}>
            <strong>Tip:</strong> Drag to move the crop area, use zoom/rotate controls above. Use the slider for fine rotation or buttons for 90° increments. Image will be cropped to 16:9.
          </span>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary" 
              onClick={onCancel}
              style={{ 
                padding: '12px 24px', 
                fontSize: '16px', 
                color: '#333', 
                backgroundColor: '#e9ecef', 
                border: '1px solid #adb5bd', 
                borderRadius: '6px',
                transition: 'background 0.2s, color 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={e => { e.target.style.backgroundColor = '#ced4da'; e.target.style.color = '#111'; }}
              onMouseOut={e => { e.target.style.backgroundColor = '#e9ecef'; e.target.style.color = '#333'; }}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleDone}
              style={{ padding: '12px 24px', fontSize: '16px' }}
            >
              Crop & Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal; 