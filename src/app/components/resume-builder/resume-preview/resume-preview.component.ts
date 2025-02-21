import {Component, OnInit} from '@angular/core';
import {Template1Component} from "../templates/template1/template1.component";
import {ResumeStorageService} from '../../../services/resume-storage.service';
import {Template2Component} from '../templates/template2/template2.component';
import {Template3Component} from '../templates/template3/template3.component';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resume-preview',
  imports: [
    Template1Component,
    Template2Component,
    Template3Component,
    ReactiveFormsModule,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.scss',
  standalone: true
})
export class ResumePreviewComponent implements OnInit{
  personalInfo: any = {};
  certificates: any[] = [];
  education: any[] = [];
  projects: any[] = [];
  skills: any[] = [];
  experiences: any[] = [];
  avatar: any;

  selectedCV = 0;
  resumeForm!: FormGroup;


  constructor(private resumeStorage: ResumeStorageService, private fb: FormBuilder, private router: Router) {
    this.resumeForm = this.fb.group({
      name: [''],
      role: [''],
      location: [''],
      email: ['', Validators.email],
      phone: [''],
      intro: [''],
      experiences: ['checked'],
      educations: ['checked'],
      skills: ['checked'],
      projects: [''],
      certificates: [''],
      avatar: [''],
      cvType: ['0']
    });
  }

  ngOnInit() {
    const savedData = this.resumeStorage.getData();
    if (savedData){
      this.personalInfo = savedData.personalInfo;
      this.certificates = savedData.certificates;
      this.education = savedData.educations;
      this.projects = savedData.projects;
      this.skills = savedData.skills;
      this.experiences = savedData.workExperiences;
      this.avatar = this.resumeForm.get('avatar')?.value ? savedData.avatar : '';
    }
  }

  chooseCV() {
    switch (this.resumeForm.get('cvType')?.value) {
      case '0':
        this.selectedCV = 0;
        break;
      case '1':
        this.selectedCV = 1;
        break;
      case '2':
        this.selectedCV = 2;
        break;
      default:
        this.selectedCV = 0;
        break;
    }
  }

  printCV() {
    const content = document.getElementById('cv');
    if (content) {
      window.print();
    }
  }

  openSupport() {
    this.router.navigate(['/support']);
  }

  setAvatar() {
    this.resumeForm.get('avatar')?.setValue(this.avatar);
  }
}
