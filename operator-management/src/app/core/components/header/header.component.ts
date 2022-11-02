import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfo: any;
  info$: any;

  constructor(private authService: AuthService, private router: Router, private cd: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.userInfo= this.authService.getUserInfo();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
