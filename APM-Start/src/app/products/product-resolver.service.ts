import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProductResolved } from './product';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductResolver implements Resolve<ProductResolved> {
    
    constructor(private productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const id = route.paramMap.get('id');
        if(isNaN(+id)){
            const message = `Product id was not a number: ${id}`;
            console.error(message);
            return of({product:null,error:message}); 
        }
        return this.productService.getProduct(+id)
        .pipe(
            map(product => ({product: product})),
            catchError(error => {
                const message = `Retrieval Error: ${error}`;
                console.error(message);
                return of({product: null, error: message})
            })
        )
    }
    
}