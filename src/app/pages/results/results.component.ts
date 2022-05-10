import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  entries = Object.entries;

  _results: User[] = [];

  public get results(): User[] {
    let res = this._results;
    if (this.filter) {
      res = res.filter((user) => user.framework === this.filter);
    }
    return res;
  }

  framworks: ['angular', 'react', 'vue', 'empty'] = [
    'angular',
    'react',
    'vue',
    'empty',
  ];

  filter: 'angular' | 'react' | 'vue' | null = null;

  ngOnInit(): void {
    this.fetchVotes();
    setInterval(() => {
      this.fetchVotes();
    }, 2000);
  }

  public get votes() {
    return this.results;
  }

  changeFilter(filter: 'angular' | 'react' | 'vue' | 'empty') {
    if (filter === 'empty') {
      this.filter = null;
    } else {
      this.filter = filter;
    }
  }

  handleDelete(user: User) {
    console.log('try to delete user', user);

    this._results = this.results.filter((u) => u.id !== user.id);
  }

  fetchVotes() {
    this.httpService.getUsers().subscribe((data) => {
      let dataToAdd = data.filter((user) => {
        return !~this.results.findIndex((u) => u.id === user.id);
      });
      // dataToAdd = dataToAdd.filter((user) => {
      //   return !!user.firstname;
      // });
      let newResults = this.results;
      newResults.push(...dataToAdd);
      this._results = newResults;
    });
  }
}
