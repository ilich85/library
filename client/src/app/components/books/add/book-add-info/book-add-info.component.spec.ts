import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddInfoComponent } from './book-add-info.component';

describe('BookAddComponent', () => {
  let component: BookAddInfoComponent;
  let fixture: ComponentFixture<BookAddInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
