import React, { useState } from 'react';
import CategorySlide from './slides/category';
import data from './data/titanic.json';
import { CANVAS } from './config';

function App() {
  const { dataSource, config: { Dimensions, Measures } } = data;
  const fields = Dimensions.concat(Measures);

  const [ cat, setCat ] = useState('Sex');

  return (
    <div className="App">
      <div>
      <select value={cat} onChange={(e) => { setCat(e.target.value) }}>
        {
          fields.map(dim => <option key={dim} value={dim}>{dim}</option>)
        }
      </select>
      </div>
      <svg width={CANVAS.width} height={CANVAS.height}>
        <CategorySlide dataSource={dataSource} category={cat} />
      </svg>
    </div>
  );
}

export default App;
