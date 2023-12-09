import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit{
  @Input() user: any;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ){}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = parseInt(idParam, 10);
      this.user = this.dataService.getUserById(id);
    } else {
      this.router.navigate(['/404']);
    } 
  }
}
