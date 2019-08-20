import React, { useState, useEffect } from 'react';
import ScrollMagic from 'scrollmagic';
import CategorySlide from './slides/category';
import PosterSlide from './slides/poster';
import data from './data/titanic.json';
import { CANVAS } from './config';
import './App.css';

// const pageSegments = [
//   {
//     component: (props) => <PosterSlide transition={40} duration={100} {...props} />,
//     transition: 40,
//     duration: 100
//   },
//   {
//     component: (props) => <CategorySlide {...props} />,
//     transition: 40,
//     duration: 100
//   }
// ];

function App() {
  const { dataSource, config: { Dimensions, Measures } } = data;
  const fields = Dimensions.concat(Measures);
  
  const [cat, setCat] = useState('Sex');
  const [progress, setProgress] = useState([0, 0]);

  // useEffect(() => {
  //   function scrollHandler(e) {
  //     setPageTop(window.visualViewport.pageTop);
  //   }
  //   document.addEventListener('scroll', scrollHandler);
  //   return () => {
  //     document.removeEventListener('scroll', scrollHandler);
  //   }
  // })
  useEffect(() => {
    const slides = document.querySelectorAll('section.pin-container');
    const controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave',
				duration: "100%" // this works just fine with duration 0 as well
				// However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
				// Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
			}
		});
    const scene1 = new ScrollMagic.Scene({triggerElement: slides[0]})
      .setPin(slides[0])
      .addTo(controller)
      // .addIndicators()
      .on("progress", function (e) {
        setProgress(v => {
          console.log(v)
          return [e.progress, v[1]]
        });
      });
    const scene2 = new ScrollMagic.Scene({triggerElement: slides[1]})
      .setPin(slides[1])
      .addTo(controller)
      .on("progress", function (e) {
        // console.log(2, e.progress)
        setProgress(v => {
          return [v[0], e.progress]
        });
      });
  }, [])
  return (
    <div className="App">
      <section className="pin-container" id="pin-title">
        <PosterSlide progress={progress[0]} />
      </section>
      <section className="pin-container" id="pin1">
        <h2>Category Analysis | {(progress[1] * 100).toFixed(0)}%</h2>
        <svg id="pin1-canvas" width={CANVAS.width} height={CANVAS.height}>
          <CategorySlide dataSource={dataSource} category={Dimensions[Math.floor((Dimensions.length - 1) * progress[1])]} />
        </svg>
      </section>
    </div>
  );
}

export default App;
