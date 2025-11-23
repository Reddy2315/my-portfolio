import { Component, OnInit } from '@angular/core';
import { Experience, Education } from '../../models/portfolio.models';
import { CommonModule } from '@angular/common';
import { Data } from '../../services/data';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-resume',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './resume.html',
  styleUrls: ['./resume.scss'],
})
export class Resume implements OnInit {
  experience: Experience[] = [];
  education: Education[] = [];
  constructor(private dataService: Data) {}
  ngOnInit(): void {
    this.dataService.getPortfolioData().subscribe(data => {
      if (data) {
        this.experience = data.experience;
        this.education = data.education;
      }
    });
  }
}