import React from 'react';
// function existPercent({ duration, transition, status }) {
//   if (status < transition) {
//     return status / transition;
//   } else if (status > transition + duration) {
//     return (status - duration) / transition;
//   } else {
//     return 1;
//   }
// }
function PosterSlide (props) {
  const { progress } = props
  // const { duration = 100, transition = 0, status = 50 } = props;
  // const opacity = existPercent({ duration, transition, status })
  // return <svg>
  //   <text x="80" y="100" fontSize={40 + 20 * opacity} style={{ opacity }}>Titanic Dataset</text>
  // </svg>
  return <div>
    <h1 style={{ marginTop: '10rem', marginLeft: '10rem', fontSize: 67 }}>Titanic Dataset</h1>
    <p style={{ marginLeft: '10rem', fontSize: 42 }}>use visualization to tell a story.{(100 * progress).toFixed(0)} %</p>
  </div>
}

export default PosterSlide;
