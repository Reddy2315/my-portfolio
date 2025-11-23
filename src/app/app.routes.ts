import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Projects } from './pages/projects/projects';
import { Resume } from './pages/resume/resume';
import { Skills } from './pages/skills/skills';
import { Contact } from './pages/contact/contact';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Home - Your Name' },
  { path: 'resume', component: Resume, title: 'Resume - Your Name' },
  { path: 'projects', component: Projects, title: 'Projects - Your Name' },
  { path: 'skills', component: Skills, title: 'Skills - Your Name' },
  { path: 'contact', component: Contact, title: 'Contact - Your Name' },
  { path: '**', redirectTo: '/home' }
];
