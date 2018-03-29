///<reference path="html-filter.pipe.ts"/>
import { HtmlFilterPipe } from './html-filter.pipe';
import { DomSanitizer } from '@angular/platform-browser';
describe('HtmlFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlFilterPipe(DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});
