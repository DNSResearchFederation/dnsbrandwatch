import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label, MultiDataSet} from 'ng2-charts';
import {DomainService} from '../../services/domain.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    public domainChartData: ChartDataSets[] = [
        {data: [1000, 1400, 1999, 2500, 5000]},
    ];
    public registrarChartData: ChartDataSets[] = [
        {data: [0, 2, 2, 3, 5]},
    ];
    public lawChartData: ChartDataSets[] = [
        {data: [0, 1, 1, 2, 2]},
    ];
    public memberChartData: ChartDataSets[] = [
        {data: [5, 15, 18, 35, 56]},
    ];
    public lineChartLabels: Label[] = ['December', 'January', 'February', 'March', 'April'];
    // @ts-ignore
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
    };
    public lineChartColors: Color[] = [
        {
            borderColor: 'rgba(32,166,211,0.7)',
            backgroundColor: 'rgba(32,166,211,0.3)',
        },
    ];
    public lineChartLegend = false;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    public displayedColumns: string[] = ['domainName', 'score', 'status'];
    public dataSource = [];

    public domainBreakdown: any;
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {xAxes: [{}], yAxes: [{}]},
    };
    public barChartLabels: Label[] = [''];
    public barChartType: ChartType = 'horizontalBar';
    public barChartLegend = true;
    public barChartColor: Color[] = [
        {
            backgroundColor: 'rgb(60,167,25)',
        },
        {
            backgroundColor: 'rgb(32,166,211)',
        },
        {
            backgroundColor: 'rgb(229,0,0)',
        },
    ];

    public barChartData: ChartDataSets[] = [];


    constructor(private domainService: DomainService) {
    }

    ngOnInit(): void {
        this.domainService.getDomainsByScore(0, 14).then(domains => {
            this.dataSource = domains.splice(0, 5);
        });
        this.domainService.getScoresBreakdown().then(breakdown => {
            console.log(breakdown);
            this.domainBreakdown = breakdown;
            this.barChartData = [
                {
                    data: [
                        breakdown.trusted.length
                    ],
                    label: 'Trusted'
                },
                {
                    data: [

                        breakdown.watched.length
                    ],
                    label: 'Monitored'
                },
                {
                    data: [
                        breakdown.alert.length,
                    ],
                    label: 'Alert'
                }

            ]
        })
    }

}
