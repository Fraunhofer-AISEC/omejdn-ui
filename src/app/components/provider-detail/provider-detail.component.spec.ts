import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExternProviderDetailComponent }    from './provider-detail.component';

describe('ExternProviderDetailComponent', () => {
  let component: ExternProviderDetailComponent;
  let fixture: ComponentFixture<ExternProviderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternProviderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternProviderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
