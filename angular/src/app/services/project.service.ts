import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    public activeProject = new BehaviorSubject(null);

    constructor(private http: HttpClient) {

        const activeProject = localStorage.getItem('activeProject');
        if (activeProject) {
            this.setActiveProject(JSON.parse(activeProject));
        }
    }

    public getProjects(filterString = '') {
        return this.http.get('/project', {
            params: {filterString}
        });
    }

    public getProject(key: string) {
        return this.http.get('/project/' + key).toPromise();
    }

    public createProject(name: string, description: any) {
        return this.http.post('/project', {
            name, description
        }).toPromise();
    }

    public removeProject(key: string) {
        return this.http.delete('/project/' + key).toPromise();
    }

    public setActiveProject(project: any) {
        this.activeProject.next(project);
        localStorage.setItem('activeProject', JSON.stringify(project));
    }

    public resetActiveProject() {
        this.activeProject.next(null);
        localStorage.removeItem('activeProject');
    }
}
