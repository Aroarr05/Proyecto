import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoEditarComponent } from './destino-editar.component';

describe('DestinoEditarComponent', () => {
  let component: DestinoEditarComponent;
  let fixture: ComponentFixture<DestinoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
