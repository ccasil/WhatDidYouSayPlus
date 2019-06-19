import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './http.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  error: String;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  submitButton() {
    const observable = this._httpService.newMessage(this.username, this.message);
    // console.log(this.date);
    observable.subscribe(data => {
      if ((data as any).message === 'Success') {
        console.log(data);
        this._router.navigate(['/landing']);
      } else {
        if ((data as any).err.errors !== undefined) {
          this.error = 'error message';
        }
      }
    });
  }
}
