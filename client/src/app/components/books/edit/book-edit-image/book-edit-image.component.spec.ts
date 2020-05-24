import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditImageComponent } from './book-edit-image.component';

describe('BookEditImageComponent', () => {
  let component: BookEditImageComponent;
  let fixture: ComponentFixture<BookEditImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
