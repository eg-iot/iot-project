import { DataService } from './../../../core/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface ILinks {
  display?: string;
  url?: string;
  action?: any;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navContainer') navContainer!: ElementRef<HTMLElement>;
  toggled: boolean = false;
  isAuthenticated: boolean = false;
  links: ILinks[] = [
    {
      display: 'HOME',
      url: '/home',
    },
    {
      display: 'INDICATORS',
      url: '/indicators',
    },
    {
      display: 'ACTIONS',
      url: '/actions',
    },
  ];

  constructor(
    private AuthService: AuthService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private ToastrService: ToastrService,
    private DataService: DataService
  ) {
    AuthService.checkToken().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        this.navContainer.nativeElement.classList.add('shadow');
      } else this.navContainer.nativeElement.classList.remove('shadow');
    });
  }

  logOut() {
    this.DataService.setLoading(true);
    this.AuthService.logOut().subscribe({
      next: (r: any) => {
        this.ToastrService.success(r.data.logOut);
        localStorage.removeItem('access-token');
        this.AuthService.isAuthenticated();
        this.Router.navigate([], {
          relativeTo: this.ActivatedRoute,
          replaceUrl: true,
        });
      },
      error: (err: any) => {
        this.DataService.setLoading(false);
        this.AuthService.isAuthenticated();
        localStorage.removeItem('access-token');
        this.ToastrService.success('Logged out successfully');
      },
      complete: () => {
        this.DataService.setLoading(false);
      },
    });
  }
}
