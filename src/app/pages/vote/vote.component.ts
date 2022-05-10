import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
})
export class VoteComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    framework: new FormControl(Validators.pattern('angular|react|vue')),
  });

  constructor(private httpService: HttpService) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    this.httpService
      .addUser({
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        framework: this.form.value.framework,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  framworks: string[] = ['angular', 'react', 'vue'];

  ngOnInit(): void {}
}
