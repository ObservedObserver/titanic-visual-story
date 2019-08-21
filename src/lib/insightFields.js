import { aggregate } from './aggregate';

function getInsightFields({ dataSource, fields }) {
  return fields.filter(field => {
    const fieldMembers = aggregate({ dataSource, fields: [field] });
    return fieldMembers.length >= 3 &&fieldMembers.length < 10;
  })
}

export { getInsightFields }
