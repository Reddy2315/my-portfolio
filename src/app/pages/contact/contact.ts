import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;
  contactInfo = {
    email: 'your.email@example.com',
    phone: '+91 XXXXX XXXXX',
    location: 'Bangalore, India',
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourusername'
  };

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.contactForm.valid) return;
    this.isSubmitting = true;
    try {
      // contactService.sendEmail is expected to return a Promise<boolean> or an observable converted with toPromise
      const success = await this.contactService.sendEmail(this.contactForm.value);
      if (success) {
        this.snackBar.open('Message sent successfully!', 'Close', { duration: 5000 });
        this.contactForm.reset();
      } else {
        this.snackBar.open('Failed to send message. Please try again.', 'Close', { duration: 5000 });
      }
    } catch (err) {
      console.error(err);
      this.snackBar.open('Failed to send message. Please try again.', 'Close', { duration: 5000 });
    } finally {
      this.isSubmitting = false;
    }
  }
}