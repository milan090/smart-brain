import React from 'react';
import styles from './FaceRecognition.module.css'

const FaceRecognition = ({imageUrl, box}) => {
      return (
        <div className="center ma">
          <div className="absolute mt2">
            <img src={imageUrl} alt="Face here" width="500px" id="recognizedImg"/>
            <div className={styles.boundingbox} style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}> </div>
          </div>
        </div>
      )
    
}

export default FaceRecognition;