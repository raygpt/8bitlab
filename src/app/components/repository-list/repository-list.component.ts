import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from 'src/app/services/github/github.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css'],
})
export class RepositoryListComponent implements OnInit {
  public orgId!: string;
  public orgName!: string;
  public avatarUrl!: string;
  public emptyMessage!: string;
  public organizationRepositories: Array<any> = [];
  public totalRepos!: number;
  public pageIndex: number = 0;
  public pageSize: number = 30;

  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getQueryParams();
  }

  ngOnInit(): void {
    this.getOrganization();
    this.getRepositories();
  }

  getQueryParams(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.orgId = params.orgId;
      this.orgName = params.orgName;
      this.avatarUrl = params.avatarUrl;
    });
  }

  selectRepository(repositoryName: string): void {
    this.router.navigate(['/repository'], {
      queryParams: {
        orgId: this.orgId,
        orgName: this.orgName,
        repositoryName,
        avatarUrl: this.avatarUrl,
      },
      queryParamsHandling: 'merge',
    });
  }

  pageChanged(pageIndex: number, pageSize: number): void {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.getRepositories();
  }

  getOrganization(): void {
    this.githubService.getOrganization(this.orgId).subscribe((data: any) => {
      this.totalRepos = data.public_repos;
    });
  }

  getRepositories(): void {
    this.githubService
      .getRepositories(this.orgId, this.pageSize, this.pageIndex)
      .subscribe({
        next: (data: any) => {
          this.organizationRepositories = data.body.sort(
            (a: any, b: any) => b.stargazers_count - a.stargazers_count
          )
        },
        error: (errorMessage: string) => {
          this.emptyMessage = errorMessage;
        },
      });
  }
}
