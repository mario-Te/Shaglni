import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponenetComponent } from './user-componenet.component';

describe('UserComponenetComponent', () => {
  let component: UserComponenetComponent;
  let fixture: ComponentFixture<UserComponenetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponenetComponent]
    });
    fixture = TestBed.createComponent(UserComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
