# Titanic Visual Stroy
![](https://www.travis-ci.org/ObservedObserver/titanic-visual-story.svg?branch=master)

Use interactive visualization to show the story behind titanic dataset.

## Dataset
The dataset used in this repostory is the trainning part of full dataset on kaggle.

[download the original dataset](https://www.kaggle.com/c/titanic/data)

You can customer your own dataset by replace the file in `./src/data`, before which you need adjust the dataset format as
```typescript
interface DataFormat {
  dataSource: Array<Record | {[key: string]: string | number}>
  config: {
    Dimensions: string[],
    Measures: string: []
  }
}
```

## Demo
run demo after clone the repostroy through git:

```bash
npm i

npm start
```

## Test(todos)

Tests will only covers the utils provided in `src/lib`.

```
npm test
```
