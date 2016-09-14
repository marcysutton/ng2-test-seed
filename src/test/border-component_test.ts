import {
  async,
  inject,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { BorderComponent } from '../app/border-component';

import * as axe from 'axe-core';

@Component({
  template: '',
})
class TestComponent {
}

describe('greeting component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, BorderComponent]
    });
  });

  it('should wrap content', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: '<my-fancy-border>Content</my-fancy-border>'
    }});

    TestBed.compileComponents().then(() => {
      var fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;

      expect(compiled).toContainText('Content');
    });
  }));

  it('should wrap content', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: '<my-fancy-border title="ABC"></my-fancy-border>'
    }});

    TestBed.compileComponents().then(() => {
      var fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;

      expect(compiled).toContainText('ABC');
    });
  }));

  it('should have no accessibility violations', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: '<my-fancy-border>Content</my-fancy-border>'
    }});

    TestBed.compileComponents().then(() => {
      var fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;
      var axeConfig = {};
      axe.a11yCheck(compiled, axeConfig, (results) => {
        expect(results.violations.length).toEqual(0);
      });
    });
  }));
});
