import {Component} from '@angular/core';

import {ProductService} from './product.service';

import {HTTP_PROVIDERS} from '@angular/http';

import {NgFor} from '@angular/common';

import {UserService} from '../auth/user.service';


import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import {MdSwitch} from "ng2-material";
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';


import {FormBuilder, ControlGroup, Validators} from '@angular/common';


@Component({
    selector: 'product-add',
  
    providers: [
        ...HTTP_PROVIDERS,
        ProductService,
        ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    ],
    directives: [
        MdSwitch,
        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
    ],
    //encapsulation: ViewEncapsulation.None,
    pipes: [],
    styles: [`
    .sebm-google-map-container {
      height: 200px;
    }
  `],
    template: require('./add.html')
})
export class ProductAdd {

    myForm: ControlGroup;
    error: string;
    public shopId: string;
    
    public url = 'https://google.com/';
    public latitude: number = 51.678418;
    public longitude: number = 7.809007;
    public zoom: number = 16;
    public isPickup = false;
    public isDelivery = false;
    public isVeg = true;

    mode = '';
    currentItem = { text: '', userId: '' };
    private products: Array<any> = [];

    constructor(public params: RouteParams,
        public router: Router,
        public productService: ProductService, private u: UserService) {
        u.currency = 'Rs';
        u.setLocation();
        console.log('In Product Add constructor!', this.params);

        this.shopId = params.get('shopid');
        console.log('In Product constructor!', this.shopId);

        let fb = new FormBuilder();

        this.myForm = fb.group({
            title: ['', Validators.required],
            cuisine: ['', Validators.required],
            price: ['', Validators.required],
            url: [''],
            imageUrl: [''],
            image: [''],
            isVeg: [''],
            isDelivery: [''],
            isPickup: ['']

        });

        this.error = '';
        productService.userId = u.id;
        this.latitude = u.latitude;
        this.longitude = u.longitude;

    }
    
    submit(data) {
        if (this.myForm.valid || 1) {
            alert('in submit of product add');
            let sendData = {
                title: data.title,
                price: data.price,
                rate: data.price,
                currency: this.u.currency,
                shopId: this.shopId,

                isVeg: this.isVeg,
                isDelivery: this.isDelivery,
                isPickup: this.isPickup,
                userId: this.u.id,
                latitude: this.u.latitude,
                longitude: this.u.longitude
                //lng:
            };
            this.productService.create(sendData)
                .subscribe((res) => {
                    console.log(res._id);
                    if (this.u.id) {
                        console.log('refresh form')
                        this.router.parent.navigate(['ProductAdd', { shopid: this.shopId }])
                        alert('Product Added!, You can add more');
                    }

                });

        }
    }//submit

    mapClicked($event: any) {
        console.log('map click');
        console.log($event.coords.lat, $event.coords.lng);
        this.u.latitude = $event.coords.lat;
        this.u.longitude = $event.coords.lng;
    }
}
