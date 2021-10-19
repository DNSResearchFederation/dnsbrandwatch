import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProjectService} from './project.service';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    public activeTag = new BehaviorSubject(null);

    constructor(private http: HttpClient,
                private projectService: ProjectService) {

        const activeTag = localStorage.getItem('activeTag');
        if (activeTag) {
            this.setActiveTag(JSON.parse(activeTag));
        }
    }

    public getTags(filterString = '') {
        const activeProject: any = this.projectService.activeProject.getValue();
        return this.http.get('/metadata/tag', {
            params: {
                filterString,
                projectKey: activeProject ? activeProject.projectKey : ''
            }
        });
    }

    public saveTag(tag: string, description: string) {
        const activeProject: any = this.projectService.activeProject.getValue();
        const key = activeProject ? activeProject.projectKey : '';
        return this.http.post('/metadata/tag?projectKey=' + key, {
            tag, description
        }).toPromise();
    }

    public removeTag(key: string) {
        const activeProject: any = this.projectService.activeProject.getValue();
        const projectKey = activeProject ? activeProject.projectKey : '';
        return this.http.delete('/metadata/tag?projectKey=' + key, {
            params: {
                key, projectKey
            }
        }).toPromise();
    }

    public setActiveTag(tag: any) {
        localStorage.setItem('activeTag', JSON.stringify(tag));
        this.activeTag.next(tag);
    }

    public resetActiveTag() {
        localStorage.removeItem('activeTag');
        this.activeTag.next(null);
    }
}
