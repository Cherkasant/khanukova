import React from 'react';
import Lottie from 'lottie-react';

import loader from '../../Assets/LoaderLottie/loader.json';

const LottieLoader = () => {
  return <Lottie style={{ width: 150, height: 150 }} animationData={loader} loop={true} />;
};

export default LottieLoader;
