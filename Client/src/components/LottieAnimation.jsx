import React from 'react';
import  Lottie from 'lottie-react'; // Import your Lottie JSON file
import AnimationData from './lottie/AnimationData.json'

const LottieAnimation = () => {
  return (
    <div className=' w-full' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <Lottie 
        animationData={AnimationData} 
        loop={true}  // Whether the animation should loop
        style={{ width: '100%', maxWidth: '1000px', height: '70%' }} // Control width and let height adjust automatically
      />
    </div>
  );
};

export default LottieAnimation;
