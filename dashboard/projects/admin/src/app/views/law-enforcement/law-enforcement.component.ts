import {Component, OnInit} from '@angular/core';
import {LawEnforcementService} from '../../services/law-enforcement.service';

@Component({
    selector: 'app-law-enforcement',
    templateUrl: './law-enforcement.component.html',
    styleUrls: ['./law-enforcement.component.sass']
})
export class LawEnforcementComponent implements OnInit {

    public displayedColumns: string[] = ['name', 'contact', 'date', 'actions'];
    public dataSource = [];

    constructor(private lawEnforcementService: LawEnforcementService) {
    }

    ngOnInit(): void {
        this.lawEnforcementService.getLawEnforcementMembers().then(res => {
            this.dataSource = res;
        });
    }

}
