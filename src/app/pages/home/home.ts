import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class Home implements OnInit {
  personalInfo: PersonalInfo | null = null;
  particles: number[] = Array(20).fill(0); // For floating particles

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    this.dataService.getPortfolioData().subscribe(data => {
      if (data) {
        this.personalInfo = data.personal;
      }
    });
  }

  getFirstName(): string {
    if (!this.personalInfo?.name) return '';
    return this.personalInfo.name.split(' ')[0];
  }

  getLastName(): string {
    if (!this.personalInfo?.name) return '';
    const parts = this.personalInfo.name.split(' ');
    return parts.slice(1).join(' ');
  }
}