import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Skill } from '../../models/portfolio.models';
import { Data } from '../../services/data';

@Component({
  selector: 'app-skills',
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss'],
})
export class Skills implements OnInit {
  skills: Skill[] = [];
  constructor(private dataService: Data) {}
  ngOnInit(): void {
    this.dataService.getPortfolioData().subscribe(data => {
      if (data) {
        this.skills = data.skills;
      }
    });
  }
  getTotalSkills(): number {
    return this.skills.reduce((total, category) => total + (category.items?.length || 0), 0);
  }
  getSkillCategories(): number {
    return this.skills.length;
  }
  getAverageLevel(): number {
    const allSkills = this.skills.flatMap(cat => cat.items || []);
    if (!allSkills.length) return 0;
    const total = allSkills.reduce((sum, skill) => sum + (skill.level || 0), 0);
    return Math.round(total / allSkills.length);
  }
}