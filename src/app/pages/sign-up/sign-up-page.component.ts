import { Component } from '@angular/core';
import { SignUpContainer } from '@containers/sign-up-container/sign-up-container.component';

@Component({
  selector: 'sign-up-page',
  imports: [SignUpContainer],
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPage {}
