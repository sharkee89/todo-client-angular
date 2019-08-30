import { TitlePipe } from './title.pipe';

describe('TitlePipe', () => {
  let pipe: TitlePipe;

  beforeEach(() => {
    pipe = new TitlePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should correctly filter values', () => {
    const valueToFilter = [
      {title: 'test', description: 'test', date: '2019-05-05'},
      {title: 'demo', description: 'test', date: '2019-05-05'}
    ];
    const filteredValue = pipe.transform(valueToFilter, ['test']);
    expect(filteredValue).toEqual([valueToFilter[0]]);
  });
});
