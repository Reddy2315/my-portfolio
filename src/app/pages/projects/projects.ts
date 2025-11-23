import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../models/portfolio.models';
import { Data } from '../../services/data';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects implements OnInit {
  projects: Project[] = [];
  constructor(private dataService: Data) {}
  ngOnInit(): void {
    this.dataService.getPortfolioData().subscribe(data => {
      if (data) {
        this.projects = data.projects;
      }
    });
  }
 }
