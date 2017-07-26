import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'bjs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('user');
    //console.log(this.items)
    console.log("Só dou Hello Sacou?")
  }
}
