import { Component } from '@angular/core';

@Component({
  selector: 'app-test-directive',
  templateUrl: './test-directive.component.html',
  styleUrls: ['./test-directive.component.scss']
})
export class TestDirectiveComponent {
users :any[] = [];
SearchText : any = '';

constructor(){
  this.users = [
    {
      Name : "lorem",
      Age : "21"
    },
    {
      Name : "lorem",
      Age : "22"
    },
    {
      Name : "lorem",
      Age : "23"
    },
  ]
}
}
