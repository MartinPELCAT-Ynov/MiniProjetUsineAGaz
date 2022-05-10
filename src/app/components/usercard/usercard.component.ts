import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
})
export class UsercardComponent {
  @Input() user!: User;

  @Output() onDelete: EventEmitter<User> = new EventEmitter<User>();

  form: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    framework: new FormControl(),
  });

  framworks: string[] = ['angular', 'react', 'vue'];

  constructor(private httpService: HttpService) {}

  deleted = false;

  editMode: boolean = false;

  deleteUser() {
    this.httpService.deleteUser(this.user).subscribe(() => {
      this.deleted = true;
      this.onDelete.emit(this.user);
    });
  }

  validEdit() {
    this.updateUser();
    this.editMode = false;
  }

  toggleEdit() {
    this.form.setValue({
      firstname: this.user.firstname ?? '',
      lastname: this.user.lastname ?? '',
      framework: this.user.framework ?? 'react',
    });
    this.editMode = !this.editMode;
  }

  updateUser() {
    const newUser = { ...this.user, ...this.form.value };
    this.httpService.updateUser(newUser).subscribe((usr) => {
      this.user = usr;
    });
  }
}
