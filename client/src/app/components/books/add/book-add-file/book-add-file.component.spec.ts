import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddFileComponent } from './book-add-file.component';

describe('BookAddComponent', () => {
  let component: BookAddFileComponent;
  let fixture: ComponentFixture<BookAddFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
