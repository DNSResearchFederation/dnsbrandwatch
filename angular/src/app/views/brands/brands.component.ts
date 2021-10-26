import {Component, OnInit} from '@angular/core';
import {BrandService} from '../../services/brand.service';
import {BehaviorSubject, merge, Subject} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
    selector: 'app-brands',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit {

    public brands: any = [];
    public newBrandName: string;
    public limit = new BehaviorSubject(10);
    public offset = new BehaviorSubject(0);
    public projectSub = new Subject();

    private reload = new Subject();

    constructor(private brandService: BrandService,
                private router: Router,
                private projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.projectSub = this.projectService.activeProject;

        merge(this.limit, this.offset, this.projectSub, this.reload)
            .pipe(
                debounceTime(300),
                switchMap(() =>
                    this.getBrands()
                )
            ).subscribe((brands: any) => {
            this.brands = brands;
        });
    }

    public view(brand) {

    }

    public saveNewBrand() {
        if (this.newBrandName) {
            this.brandService.saveBrand(this.newBrandName).then(() => {
                this.reload.next(Date.now());
                this.newBrandName = '';
            });
        }
    }

    public removeBrand(id) {
        const message = 'Are you sure you would like to remove this brand?';
        if (window.confirm(message)) {
            this.brandService.removeBrand(id).then(() => {
                this.reload.next(Date.now());
            });
        }
    }

    private getBrands() {
        return this.brandService.getBrands(
            '',
            this.limit.getValue().toString(),
            this.offset.getValue().toString()
        ).pipe(map((brands: any) => {
                return brands;
            })
        );
    }
}
