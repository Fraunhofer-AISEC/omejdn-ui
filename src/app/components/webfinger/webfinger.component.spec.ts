import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WebfingerComponent }               from './webfinger.component';

describe('WebfingerComponent', () => {
  let component: WebfingerComponent;
  let fixture: ComponentFixture<WebfingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebfingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebfingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
