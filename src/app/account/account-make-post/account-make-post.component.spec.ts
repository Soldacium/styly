import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMakePostComponent } from './account-make-post.component';

describe('AccountMakePostComponent', () => {
  let component: AccountMakePostComponent;
  let fixture: ComponentFixture<AccountMakePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMakePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMakePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
