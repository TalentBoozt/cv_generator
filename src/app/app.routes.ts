import { Routes } from '@angular/router';
import {SupportComponent} from './components/support/support.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule) },
  // { path: 'resume-builder', loadChildren: () => import('./components/emp-resume-builder/emp-resume-builder.module').then(m => m.EmpResumeBuilderModule) },
  { path: 'support', component: SupportComponent },
  { path: 'resume-builder', loadComponent: () => import('./components/resume-builder/resume-builder.component').then(m => m.ResumeBuilderComponent) },
  { path: 'sign', loadComponent: () => import('./components/sign/sign.component').then(m => m.SignComponent), children: [
    { path: '', redirectTo: '/sign/up', pathMatch: 'full' },
    { path: 'in', loadComponent: () => import('./components/sign/sign-in/sign-in.component').then(m => m.SignInComponent) },
    { path: 'up', loadComponent: () => import('./components/sign/sign-up/sign-up.component').then(m => m.SignUpComponent) }
  ]},
  { path: '403', loadChildren: () => import('./components/forbidden/forbidden.module').then(m => m.ForbiddenModule) },
  { path: '**', redirectTo: '403' }
];
