import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectService} from './project.service';
import * as _ from 'lodash';
import {DatasourceService} from './datasource.service';

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    private brandDatasourceInstanceKey = 'brands_6';

    constructor(private http: HttpClient,
                private projectService: ProjectService,
                private datasourceService: DatasourceService) {
    }

    public getBrands(filterString = '', limit = '10', offset = '0') {
        return this.projectService.getProjects(filterString);
    }

    public async saveBrand(brandName) {
        await this.datasourceService.updateDatasourceInstance(this.brandDatasourceInstanceKey, {brand: brandName});
        return this.projectService.createProject(brandName, brandName);
    }

    public setActiveBrand(brand) {
        this.projectService.setActiveProject(brand);
    }

    public async removeBrand(brand) {
        await this.datasourceService.updateDatasourceInstance(this.brandDatasourceInstanceKey, {brand: brand.name}, DatasourceService.UPDATE_MODE_DELETE);
        return this.projectService.removeProject(brand.projectKey);
    }
}
