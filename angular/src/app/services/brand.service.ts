import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectService} from './project.service';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    constructor(private http: HttpClient,
                private projectService: ProjectService) {
    }

    public getBrands(filterString = '', limit = '10', offset = '0') {
        const projectKey = this.projectService.activeProject.getValue() ? this.projectService.activeProject.getValue().projectKey : null;
        return this.http.get('/account/brand', {
            params: _.omitBy({
                filterString, limit, offset, projectKey
            }, _.isNil)
        });
    }

    public saveBrand(brandName) {
        const projectKey = this.projectService.activeProject.getValue() ? this.projectService.activeProject.getValue().projectKey : null;
        return this.http.post('/account/brand', _.omitBy({
            brandName, projectKey
        }, _.isNil)).toPromise();
    }

    public removeBrand(id) {
        return this.http.delete('/account/brand', {
            params: { id }
        }).toPromise();
    }
}
