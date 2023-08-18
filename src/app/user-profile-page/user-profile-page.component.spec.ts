import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewComponent } from './user-profile-page.component';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileViewComponent]
    });
    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
