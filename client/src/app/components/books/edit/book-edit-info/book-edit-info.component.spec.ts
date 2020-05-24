import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditInfoComponent } from './book-edit-info.component';

describe('BookEditInfoComponent', () => {
  let component: BookEditInfoComponent;
  let fixture: ComponentFixture<BookEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
