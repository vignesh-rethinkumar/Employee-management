import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjecTemployees } from './projec-temployees';

describe('ProjecTemployees', () => {
  let component: ProjecTemployees;
  let fixture: ComponentFixture<ProjecTemployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjecTemployees],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjecTemployees);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
