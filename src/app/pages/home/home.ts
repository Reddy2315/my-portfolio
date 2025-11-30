import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PersonalInfo } from '../../models/portfolio.models';
import { Data } from '../../services/data';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  personalInfo: PersonalInfo | null = null;
  particles: number[] = Array(20).fill(0);

  // Typing animation properties
  typedText: string = '';
  isDeleting: boolean = false;
  loopIndex: number = 0;
  typingSpeed: number = 100;
  private typingInterval: any;

  // Array of roles to cycle through
  roles: string[] = [
    'Java Full Stack Developer',
    'Java & Angular Specialist',
    'Software Engineer',
    'Problem Solver',
  ];

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    this.dataService.getPortfolioData().subscribe(data => {
      if (data) {
        this.personalInfo = data.personal;
      }
    });

    // Start typing animation
    this.startTypingAnimation();
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearTimeout(this.typingInterval);
    }
  }

  startTypingAnimation(): void {
    const currentRole = this.roles[this.loopIndex % this.roles.length];
    
    if (!this.isDeleting && this.typedText === currentRole) {
      // Pause at end of word
      this.typingSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.typedText === '') {
      // Move to next word
      this.isDeleting = false;
      this.loopIndex++;
      this.typingSpeed = 500;
    } else {
      // Typing or deleting
      if (this.isDeleting) {
        this.typedText = currentRole.substring(0, this.typedText.length - 1);
        this.typingSpeed = 30;
      } else {
        this.typedText = currentRole.substring(0, this.typedText.length + 1);
        this.typingSpeed = 80;
      }
    }

    this.typingInterval = setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
  }

  getFirstName(): string {
    if (!this.personalInfo?.name) return '';
    return this.personalInfo.name.split(' ')[0].toUpperCase();
  }

  getLastName(): string {
    if (!this.personalInfo?.name) return '';
    const parts = this.personalInfo.name.split(' ');
    return parts.slice(1).join(' ').toUpperCase();
  }

  getFullName(): string {
    if (!this.personalInfo?.name) return '';
    return this.personalInfo.name.toUpperCase();
  }
}