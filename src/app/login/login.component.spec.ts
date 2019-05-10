import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { Subject, of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder = new FormBuilder();

  beforeEach(() => {
    const routerStub = {};
    const authServiceStub = {login:() => ({
        pipe: () => ({
            subscribe: () => ({})
        })
    }),
    logout:() => ({})
   };
    
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AuthenticationService, useValue: authServiceStub },
                  { provide: Router, useValue: routerStub }, 
                  { provide: FormBuilder, useValue: formBuilder } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    const subject = new Subject();
    spyOn(subject, 'pipe').and.returnValue(of());
    component.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
     });
     component.ngOnInit();
  });

  describe('onSubmit', () => {
    it('makes expected calls onSubmit', () => {
      component.onSubmit();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
