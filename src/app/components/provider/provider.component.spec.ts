import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExternProvidersComponent }         from './provider.component';

describe('ExternProvidersComponent', () => {
  let component: ExternProvidersComponent;
  let fixture: ComponentFixture<ExternProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
