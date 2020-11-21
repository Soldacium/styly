import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPostsComponent } from './account-posts.component';

describe('AccountPostsComponent', () => {
  let component: AccountPostsComponent;
  let fixture: ComponentFixture<AccountPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
