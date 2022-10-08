import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Subject, Subscription, switchMap } from 'rxjs';
import { GithubService } from 'src/app/services/github/github.service';
import { SearchbarComponent } from '../generic-searchbar/generic-searchbar.component';

@Component({
  selector: 'app-organization-search',
  templateUrl: './organization-search.component.html',
  styleUrls: ['./organization-search.component.css'],
})
export class OrganizationSearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('orgSearch') searchbar!: SearchbarComponent;

  private searchSubscription?: Subscription;
  public organizationSubject = new Subject<string>();
  public searchbarPanelWidth: string = '20rem';
  public displayAvatarInSearchResults: boolean = true;

  constructor(private githubService: GithubService, public router: Router) {}

  public ngAfterViewInit(): void {
    this.searchSubscription = this.organizationSubject
      .pipe(
        debounceTime(300),
        filter((searchQuery: string) => searchQuery.length > 3),
        distinctUntilChanged(),
        switchMap((orgName) => this.githubService.searchOrganizations(orgName))
      )
      .subscribe((data: any) => {
        if (!data['items'].length) {
          this.searchbar.filteredResults = [];
        } else {
          this.searchbar.filteredResults = data['items'].map((item: any) => {
            return {
              displayName: item.login,
              avatarUrl: item.avatar_url,
              orgId: item.id,
            };
          });
        }
      });
  }

  chooseOrganization(organization: any): void {
    this.router.navigate(['/organization'], {
      queryParams: {
        orgId: organization.orgId,
        orgName: organization.displayName,
        avatarUrl: organization.avatarUrl,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
