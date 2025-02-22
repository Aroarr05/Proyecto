import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoCrearComponent } from './destino-crear.component';

describe('DestinoCrearComponent', () => {
  let component: DestinoCrearComponent;
  let fixture: ComponentFixture<DestinoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
