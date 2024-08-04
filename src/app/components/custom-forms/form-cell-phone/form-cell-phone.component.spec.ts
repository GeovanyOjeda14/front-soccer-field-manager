import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCellPhoneComponent } from './form-cell-phone.component';

describe('FormCellPhoneComponent', () => {
  let component: FormCellPhoneComponent;
  let fixture: ComponentFixture<FormCellPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCellPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCellPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
