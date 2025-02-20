import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ResumeStorageService} from '../../../services/resume-storage.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-step-skills',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './step-skills.component.html',
  styleUrl: './step-skills.component.scss',
  standalone: true
})
export class StepSkillsComponent implements OnInit {
  skills: any[] = [];
  newSkill = {
    skill: '',
    percentage: ''
  }

  constructor(private resumeStorage: ResumeStorageService) {}

  ngOnInit(): void {
    const savedData = this.resumeStorage.getData();
    if (savedData.skills) {
      this.skills = savedData.skills;
    }
  }

  addSkill(): void {
    if (this.newSkill.skill && this.newSkill.percentage) {
      this.skills.push({ ...this.newSkill });
      this.saveData();
      this.resetForm();
    }
  }

  removeSkill(index: number): void {
    this.skills.splice(index, 1);
    this.saveData();
  }

  saveData(): void {
    this.resumeStorage.saveData('skills', this.skills);
  }

  resetForm(): void {
    this.newSkill = { skill: '', percentage: '' };
  }
}
