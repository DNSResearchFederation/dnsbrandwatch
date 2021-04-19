import {Component, OnInit} from '@angular/core';
import {MemberService} from '../../services/member.service';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.sass']
})
export class MembersComponent implements OnInit {

    public displayedColumns: string[] = ['name', 'type', 'domains', 'date', 'actions'];
    public dataSource = [];

    private members = [];

    constructor(private memberService: MemberService) {
    }

    ngOnInit(): void {
        this.memberService.getMembers().then(members => {
            this.members = members;
            this.dataSource = this.members.slice(0, 10);
        });
    }

    public updatePage(pageEvent) {
        this.dataSource = this.members.slice((pageEvent.pageIndex * pageEvent.pageSize), (pageEvent.pageIndex * pageEvent.pageSize + pageEvent.pageSize));
    }
}
