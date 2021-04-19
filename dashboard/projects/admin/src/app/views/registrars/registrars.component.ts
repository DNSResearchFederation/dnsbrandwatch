import {Component, OnInit} from '@angular/core';
import {RegistrarService} from '../../services/registrar.service';

@Component({
    selector: 'app-registrars',
    templateUrl: './registrars.component.html',
    styleUrls: ['./registrars.component.sass']
})
export class RegistrarsComponent implements OnInit {

    public displayedColumns: string[] = ['name', 'domains', 'contact', 'date', 'actions'];
    public dataSource = [];

    public registrars = [];

    constructor(private registrarService: RegistrarService) {
    }

    ngOnInit(): void {
        this.registrarService.getRegistrars().then(registrars => {
            console.log(registrars);
            this.registrars = registrars;
        })
    }

}
