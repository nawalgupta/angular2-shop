webpackHotUpdate(3,{

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(21);
	var ProductService = (function () {
	    function ProductService(http) {
	        this.http = http;
	        this.userId = '';
	        this.url = '/api/product';
	        this.urlMy = '/api/myproduct/';
	        this.urlShopProducts = '/api/shopproducts/';
	    }
	    ProductService.prototype.getMy = function () {
	        return this.http.get(this.urlMy)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.getAll = function () {
	        return this.http.get(this.url)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.getProductsByShop = function (shopId) {
	        return this.http.get(this.urlShopProducts + shopId)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.getUserProducts = function (userId) {
	        return this.http.get(this.urlMy + userId)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.getOne = function (id) {
	        return this.http.get(this.url + "/" + id)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.create = function (data) {
	        var headers = new http_1.Headers();
	        headers.append('Content-Type', 'application/json');
	        return this.http.post('/api/product', JSON.stringify(data), { headers: headers })
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.delete = function (id) {
	        return this.http.delete(this.url + "/" + id)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], ProductService);
	    return ProductService;
	}());
	exports.ProductService = ProductService;
	

/***/ }

})
//# sourceMappingURL=main.map