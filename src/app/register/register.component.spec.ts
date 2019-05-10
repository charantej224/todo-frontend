import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../_services';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { Subject, of } from 'rxjs';
import { MustMatch } from '../_helpers/must-match.validator';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let formBuilder: FormBuilder = new FormBuilder();

  beforeEach(() => {
    const routerStub = {};
    const userServiceStub = {register:() => ({
        pipe: () => ({
            subscribe: () => ({})
        })
    })
   };
    
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: UserService, useValue: userServiceStub },
                  { provide: Router, useValue: routerStub }, 
                  { provide: FormBuilder, useValue: formBuilder } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    const subject = new Subject();
    spyOn(subject, 'pipe').and.returnValue(of());
    component.registerForm = formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
     component.ngOnInit();
  });

  describe('getf',() => {
     it('makes form control calls on getf', () =>{
         component.f;
     })
  })

  describe('onSubmit', () => {
    it('makes expected calls onSubmit', () => {
      component.onSubmit();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
