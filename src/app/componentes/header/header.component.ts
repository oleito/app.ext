import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  headerSearchForm = new FormGroup(
    {
      dataToSearch: new FormControl('', [Validators.required])
    }
  );

  ngOnInit() {
  }
  
  onSubmit() {
    console.log(this.headerSearchForm.value);
  }

}
