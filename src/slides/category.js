import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { BLOCK, CANVAS } from '../config';
function compareBy(field) {
  return function (a, b) {
    return a[field] > b[field] ? 1 : -1;
  }
}
function CategorySlide (props) {
  const { dataSource, category } = props;

  const [sortedData, setSortedData] = useState(dataSource.map((record, index) => {
    return {
      ...record,
      newIndex: index
    }
  }));

  useEffect(() => {

    setSortedData(data => {
      const newOrder = [...data].sort(compareBy(category));
      data.forEach(record => {
        record.newIndex = newOrder.findIndex(r => r === record);
      })
      return data;
    });

    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const update = d3.select('svg').select('g').selectAll('rect')
      .data(sortedData);
    update.transition()
    .duration(2000)
    .attr('y', row => {
      return Math.floor(row.newIndex * (BLOCK.width + BLOCK.margin) / CANVAS.width) * (BLOCK.height + BLOCK.margin)
    })
    .attr('x', row => {
      return row.newIndex * (BLOCK.width + BLOCK.margin) % CANVAS.width;
    })
    .transition()
    .duration(500)
    .attr('fill', row => {
      return color(row[category])
    });

    update.enter()
      .append('rect')
      .attr('y', row => {
        return Math.floor(row.newIndex * (BLOCK.width + BLOCK.margin) / CANVAS.width) * (BLOCK.height + BLOCK.margin)
      })
      .attr('x', row => {
        return row.newIndex * (BLOCK.width + BLOCK.margin) % CANVAS.width;
      })
      .attr('height', BLOCK.height)
      .attr('width', BLOCK.width)
      .attr('fill', row => {
        return color(row[category])
      });
  }, [category, sortedData]);

  return <g></g>
}

export default CategorySlide;