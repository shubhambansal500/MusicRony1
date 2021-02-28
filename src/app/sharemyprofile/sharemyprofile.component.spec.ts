import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharemyprofileComponent } from './sharemyprofile.component';

describe('SharemyprofileComponent', () => {
  let component: SharemyprofileComponent;
  let fixture: ComponentFixture<SharemyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharemyprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharemyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
