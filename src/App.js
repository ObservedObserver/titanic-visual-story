import React, { useState, useEffect } from 'react';
import ScrollMagic from 'scrollmagic';
import CategorySlide from './slides/category';
import PosterSlide from './slides/poster';
import data from './data/titanic.json';
import { CANVAS } from './config';
import { groupByMeasure } from './lib/groupby';
import { getInsightFields } from './lib/insightFields';

import './App.css';

function App() {
  const { dataSource: rawData, config: { Dimensions, Measures } } = data;
  const { dataSource, measures } = groupByMeasure({
    dataSource: rawData,
    measures: Measures
  });
  const fields = [...Dimensions, ...measures]; //Dimensions.concat(Measures);
  const [progress, setProgress] = useState([0, 0]);

  const insightFields = getInsightFields({ dataSource, fields });

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
    new ScrollMagic.Scene({triggerElement: slides[0]})
      .setPin(slides[0])
      .addTo(controller)
      .on("progress", function (e) {
        setProgress(v => {
          console.log(v)
          return [e.progress, v[1]]
        });
      });
    new ScrollMagic.Scene({triggerElement: slides[1]})
      .setPin(slides[1])
      .addTo(controller)
      .on("progress", function (e) {
        setProgress(v => {
          return [v[0], e.progress]
        });
      });
  }, []);
  const currentFieldIndex = Math.floor((insightFields.length - 1) * progress[1]);
  return (
    <div className="App">
      <section className="pin-container" id="pin-title">
        <PosterSlide progress={progress[0]} />
      </section>
      <section className="pin-container" id="pin1">
        <h2>Field Analysis | {insightFields[currentFieldIndex]} ({currentFieldIndex + 1} / {insightFields.length})</h2>
        <svg id="pin1-canvas" width={CANVAS.width} height={CANVAS.height}>
          <CategorySlide dataSource={dataSource} category={insightFields[currentFieldIndex]} />
        </svg>
      </section>
    </div>
  );
}

export default App;
