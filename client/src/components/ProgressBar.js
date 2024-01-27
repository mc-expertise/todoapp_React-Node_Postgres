import React from 'react';

const ProgressBar = ({ progress }) => {
  const CurColor =
    progress <= 20
      ? 'rgb(255, 214, 161)'
      : progress > 20 && progress <= 60
      ? 'rgb(255, 175, 163)'
      : 'rgb(141, 181, 145)';

  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{
          width: `${progress}%`,
          backgroundColor: `${CurColor}`,
        }}></div>
      <div className="number-progress">{progress}%</div>
    </div>
  );
};

export default ProgressBar;
