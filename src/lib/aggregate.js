function aggregate({ dataSource, fields, method = 'count' }) {
  const map = new Map();
  let newField = fields.join('_')
  for (let record of dataSource) {
    let key = fields.map(field => record[field]).join('_');
    if (!map.has(key)) {
      map.set(key, 0)
    }
    map.set(key, map.get(key) + 1);
  }

  let ans = []
  for (let [key, value] of map) {
    ans.push({
      [newField]: key,
      value 
    })
  }
  return ans;
}

export { aggregate };
