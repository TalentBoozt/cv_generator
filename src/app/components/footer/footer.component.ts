import {Component} from '@angular/core';
import {Utilities} from "../../shared/utilities/utilities";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{

  utilities = Utilities;

  requestInfoForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
}
