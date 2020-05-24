import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditFileComponent } from './book-edit-file.component';

describe('BookEditFileComponent', () => {
  let component: BookEditFileComponent;
  let fixture: ComponentFixture<BookEditFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
