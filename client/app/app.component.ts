import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {AppState} from './app.service';

import {RouterActive} from './shared/directives/router-active/router-active.directive';


import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import {AuthService} from './services/auth.service';

import {Home} from './home';

import {Shop} from './shop/shop.component';
import {ShopAdd} from './shop/add.component';
import {ShopList} from './shop/list.component';

import {ShopSearch} from './shop/search.component';

import {MdDropdown} from './components/md-dropdown.component';

import {Test} from './test/test';


import {Signin} from './auth/signin.component';

import {Signup} from './auth/signup.component';

import {Material2App} from './material-demo/material2-app.component';

//import {Product} from './product/product.component';
//import {Products} from './product/products.component';
///import {PrdRoot} from './prd/prd-root.component';


//import {Shop} from './shop/shop.component';

// Import Products component
import {Products} from './products/products.component';
import {Product} from './product/product.component';
import {ProductAdd} from './product/add.component';


import {ProductList} from './product/list.component';
import {PList} from './product/plist.component';

import {CartList} from './cart/list.component';


import {ProductDetails} from './product/details.component';


import {WindowRef, WINDOW_PROVIDERS} from './window.service';
import {SharedService} from './services/shared.service';

import {UserService} from './auth/user.service';


/*
 * App Component
 */

@Component({
  selector: 'app',
  providers: [  ANGULAR2_GOOGLE_MAPS_PROVIDERS, AuthService],
  directives: [ MdDropdown,
                RouterActive],
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
  // Load our main `Sass` file into our `app` `component`
  styleUrls: [require('!style!css!sass!../sass/main.scss')],
  template: require('./app.html')
})
/*
@Routes([
  {path: '/crisis-center', component: CrisisListComponent},
  {path: '/heroes',        component: HeroListComponent},
  {path: '/hero/:id',      component: HeroDetailComponent}
])
*/
@RouteConfig([
  { path: '/', name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/shop', component: Shop, name: 'Shop' },
  { path: '/shopadd', component: ShopAdd, name: 'ShopAdd' },
  { path: '/shoplist', component: ShopList, name: 'ShopList' },
  { path: '/cartlist', component: CartList, name: 'CartList' },

 // { path: '/shopsearch', component: ShopSearch, name: 'ShopSearch' },
  { path: '/search', component: ShopSearch, name: 'ShopSearch' },


  { path: '/products', component: Products, name: 'Products' },
  { path: '/product', component: Product, name: 'Product' },
  { path: '/signup', component: Signup, name: 'Signup' },
  { path: '/signin', component: Signin, name: 'Signin' },
  { path: '/test', component: Test, name: 'Test' },
  { path: '/material', component: Material2App, name: 'Material' },
  { path: '/productadd/:shopid', component: ProductAdd, name: 'ProductAdd' },
  { path: '/productlist/:shopid', component: ProductList, name: 'ProductList' },

  //Products List by shop for customer
  { path: '/plist/:shopid', component: PList, name: 'PList' },

  { path: '/productdetails/:id', component: ProductDetails, name: 'ProductDetails' },

  // Async load
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
])
export class App {
  angularLogo = 'assets/img/angular-logo.png';
  name = 'Angular Shop';
  url = 'https://google.com/';
 private latitude: number = 51.678418;
 private longitude : number = 7.809007;

  //If using Auth0 for SSO
  //lock = new Auth0Lock('tN9xVfIaUEeUCrFxleVwhIoObMbSe9be', 'xxx.auth0.com');
 items = ['A', 'B', 'C', 'Pizza'];

  constructor(public appState: AppState,
      private auth: AuthService,
      public s: SharedService,
      private u: UserService  ) {

    s.userId = "";
    s.userEmail = "";
    //u.id = 'u.id = '574c5677c534abb86bf27452';'
    u.id = '574c5677c534abb86bf27452';
    u.id = '575465132056a2184f8262f6';
    u.email = 'auto';
    
    //Asking for get current location and stroring it  in user service
    if (window && window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('location', position);
                if (position.coords) {
                    u.location = position.coords;
                    u.latitude = position.coords.latitude;
                    u.longitude = position.coords.longitude;
                }
               
            }
        )
    } // if

  }

  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
  
  loggedIn(){
    
    return false;
  }
  
/*

login() {
    var hash = this.lock.parseHash();
    if (hash) {
      if (hash.error)
        console.log('There was an error logging in', hash.error);
      else
        this.lock.getProfile(hash.id_token, function(err, profile) {
          if (err) {
            console.log(err);
            return;
          }
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', hash.id_token);
        });
    }
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

*/
  // Fire off upon initialization
  ngOnInit() {
    console.log('Initial App Loading');

    console.log('Initial App State', this.appState.state);
  }
}
