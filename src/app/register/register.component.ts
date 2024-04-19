import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from '../api.service';
import { Router } from '@angular/router';


declare var bootstrap: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      isAdmin: [false]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.apiService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          this.showSuccessModal();
        },
        error: (err) => {
          alert('Failed to register!');
        }
      });
    } else {
      alert('Please fill all the fields correctly!');
    }
  }

  showSuccessModal() {
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    setTimeout(() => {
      successModal.hide();
      this.redirectToLogin();
    }, 3000); // Adjust the time as needed
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
