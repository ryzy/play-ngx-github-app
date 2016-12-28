/* tslint:disable:no-unused-variable */

import { TrimPipe } from './trim.pipe';

describe('TrimPipe', () => {
  let pipe: TrimPipe;

  it('should trim', () => {
    pipe = new TrimPipe();
    expect(pipe).toBeTruthy();

    expect(pipe.transform('fooBar')).toBe('fooBar');
    expect(pipe.transform('fooBar', 6, '.')).toBe('fooBar');

    expect(pipe.transform('fooBar', 3)).toBe('foo...');
    expect(pipe.transform('fooBar', 6, '.')).toBe('fooBar');
    expect(pipe.transform('fooBar', 5, '-')).toBe('fooBa-');
  });
});
