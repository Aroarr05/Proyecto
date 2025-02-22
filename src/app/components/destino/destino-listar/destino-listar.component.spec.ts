import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoListarComponent } from './destino-listar.component';

describe('DestinoListarComponent', () => {
  let component: DestinoListarComponent;
  let fixture: ComponentFixture<DestinoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
