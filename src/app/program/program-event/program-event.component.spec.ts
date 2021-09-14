import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramEventComponent } from './program-event.component';

describe('ProgramEventComponent', () => {
  let component: ProgramEventComponent;
  let fixture: ComponentFixture<ProgramEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
