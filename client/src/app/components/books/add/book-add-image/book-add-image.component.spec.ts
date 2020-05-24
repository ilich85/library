import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddImageComponent } from './book-add-image.component';

describe('BookAddImageComponent', () => {
  let component: BookAddImageComponent;
  let fixture: ComponentFixture<BookAddImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
