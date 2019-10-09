import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'AppCliente';
 
  
  constructor(private router: Router){}

  ngOnInit(){

  }

  Redirect(url:string){
    this.router.navigate([url]);
  }

  LogoutClick(){
    alert("qweqwe");
  }

 

}
