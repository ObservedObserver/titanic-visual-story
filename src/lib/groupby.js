const groupNumber = 6;
function deepcopy (obj) {
  return JSON.parse(JSON.stringify(obj));
}
function groupByMeasure({ dataSource, measures }) {
  let data = deepcopy(dataSource);
  let newMeasures = measures.map(measure => `${measure}(group)`);
  for (let measure of measures) {
    let max = Math.max(...dataSource.map(item => item[measure]));
    let min = Math.min(...dataSource.map(item => item[measure]));
    let width = (max - min) / groupNumber;
    let ranges = [];
    for (let i = 0; i < groupNumber; i++) {
      let left = min + i * width;
      let right = min + (i + 1) * width;
      ranges.push([left, right]);
    }
    for (let record of data) {
      // console.log('find:', record[measure])
      let range = ranges.find(r => (r[0] <= record[measure] && record[measure] < r[1]));
      if (typeof range !== 'undefined') {
        record[`${measure}(group)`] = `[${range[0]}, ${range[1]})`;
      } else {
        record[`${measure}(group)`] = 'null'
      }
    }
  }
  return { dataSource: data, measures: newMeasures };
}

export { groupByMeasure };