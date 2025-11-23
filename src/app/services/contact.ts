import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class Contact {
  // Get these from EmailJS dashboard (https://www.emailjs.com/)
  private serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
  private templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
  private userID = 'YOUR_USER_ID'; // Replace with your EmailJS user ID

  constructor() {
    emailjs.init(this.userID);
  }

  async sendEmail(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Your Name', // Your name
      };

      await emailjs.send(
        this.serviceID,
        this.templateID,
        templateParams
      );
      return true;
    } catch (error) {
      console.error('Email send failed:', error);
      return false;
    }
  }
}
