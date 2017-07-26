import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'bjs-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent implements OnInit {

// absolute URL
/*
  items: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('items');
  //  console.log(this.items)
  }
*/
  ngOnInit() {

  }


}
