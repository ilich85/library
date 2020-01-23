import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAtUserComponent } from './books-at-user.component';

describe('BooksAtUserComponent', () => {
  let component: BooksAtUserComponent;
  let fixture: ComponentFixture<BooksAtUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksAtUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksAtUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
