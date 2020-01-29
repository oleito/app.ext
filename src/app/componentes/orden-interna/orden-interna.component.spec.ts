import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenInternaComponent } from './orden-interna.component';

describe('OrdenInternaComponent', () => {
  let component: OrdenInternaComponent;
  let fixture: ComponentFixture<OrdenInternaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenInternaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
