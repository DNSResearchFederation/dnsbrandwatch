import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DatasourceService {

    public static readonly UPDATE_MODE_ADD = 'add';
    public static readonly UPDATE_MODE_DELETE = 'delete';
    public static readonly UPDATE_MODE_REPLACE = 'replace';

    constructor(private http: HttpClient) {
    }

    public updateDatasourceInstance(key, data: any, updateMode = DatasourceService.UPDATE_MODE_ADD) {
        return this.http.put('/api/datasource/' + key + '?updateMode=' + updateMode,
            data).toPromise();
    }

}
