import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {

    contactInfo = {
      linkedin: 'https://www.linkedin.com/in/nagendharreddy-kondapu-368699225',
      github: 'https://github.com/Reddy2315',
      instagram: 'https://instagram.com/yourusername', 
      facebook: 'https://facebook.com/yourusername'
    };
}
