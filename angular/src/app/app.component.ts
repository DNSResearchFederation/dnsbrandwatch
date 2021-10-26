import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {Subscription} from 'rxjs';
import {SidenavService} from './services/sidenav.service';
import { environment } from '../environments/environment';
import {ProjectPickerComponent, TagPickerComponent} from 'ng-kinintel';
import {AuthenticationService} from 'ng-kiniauth';
import {ProjectService} from './services/project.service';
import {TagService} from './services/tag.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('snav', {static: false}) public snav: MatSidenav;

    public mobileQuery: MediaQueryList;
    public showFixedSidebar: boolean;
    public activeProject: any;
    public activeTag: any;
    public environment = environment;
    public loggedIn = false;
    public sessionUser: any = {};
    public isLoading: boolean;
    public notificationCount = 0;
    public notifications: any = [];
    public settingsOpen = false;

    private readonly mobileQueryListener: () => void;
    private projectSub: Subscription;
    private tagSub: Subscription;
    private authSub: Subscription;
    private loadingSub: Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private media: MediaMatcher,
                private sidenavService: SidenavService,
                private dialog: MatDialog,
                private projectService: ProjectService,
                private tagService: TagService,
                private authService: AuthenticationService,
                private router: Router) {

        this.mobileQuery = media.matchMedia('(max-width: 768px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    ngOnInit() {
        this.projectSub = this.projectService.activeProject.subscribe(project => {
            this.activeProject = project;
            // if (!project) {
            //     this.selectProject(true);
            // }
        });
        this.tagSub = this.tagService.activeTag.subscribe(tag => {
            this.activeTag = tag;
        });
        this.authSub = this.authService.authUser.subscribe(user => {
            this.loggedIn = !!user;
            if (this.loggedIn) {
                this.sessionUser = this.authService.sessionData.getValue().user;
            }
        });
        this.loadingSub = this.authService.loadingRequests.subscribe(isLoading =>
            setTimeout(() => this.isLoading = isLoading, 0)
        );
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.showFixedSidebar = this.mobileQuery.matches;
        }, 0);

        this.sidenavService.setSidenav(this.snav);
        this.snav.closedStart.subscribe(opened => {
            this.showFixedSidebar = true;
        });
        this.snav.openedStart.subscribe(() => {
            this.showFixedSidebar = false;
        });
    }

    ngOnDestroy() {
        this.mobileQuery.removeListener(this.mobileQueryListener);
        this.projectSub.unsubscribe();
        this.authSub.unsubscribe();
        this.tagSub.unsubscribe();
    }

    public selectProject(disableClose = false) {
        const dialogRef = this.dialog.open(ProjectPickerComponent, {
            width: '700px',
            height: '500px',
            disableClose,
            data: {
                projectService: this.projectService
            }
        });
    }

    public selectTag() {
        const dialogRef = this.dialog.open(TagPickerComponent, {
            width: '700px',
            height: '500px',
            data: {
                tagService: this.tagService
            }
        });
    }

    public removeActiveTag() {
        this.tagService.resetActiveTag();
    }

    public logout() {
        this.authService.logout().then(() => {
            this.router.navigate(['/login']);
        });
    }
}
