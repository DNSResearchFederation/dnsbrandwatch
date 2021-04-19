import {Component, OnInit} from '@angular/core';
import {DomainService} from '../../services/domain.service';

@Component({
    selector: 'app-domains',
    templateUrl: './domains.component.html',
    styleUrls: ['./domains.component.sass']
})
export class DomainsComponent implements OnInit {

    public displayedColumns: string[] = ['domainName', 'score', 'status', 'date', 'actions'];
    public dataSource = [];

    private domains = [];

    constructor(private domainService: DomainService) {
    }

    ngOnInit(): void {
        this.domainService.getDomains().then(domains => {
           this.domains = domains;
           this.dataSource = this.domains.slice(0, 10);
        });
    }

    public updatePage(pageEvent) {
        this.dataSource = this.domains.slice((pageEvent.pageIndex * pageEvent.pageSize), (pageEvent.pageIndex * pageEvent.pageSize + pageEvent.pageSize));
    }

}
