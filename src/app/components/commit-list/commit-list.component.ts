import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/app/services/github/github.service';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.css'],
})
export class CommitListComponent implements OnInit {
  public orgId!: string;
  public orgName!: string;
  public repositoryName!: string;
  public avatarUrl!: string;
  public repositoryCommits: Array<any> = [];
  public totalCommits!: number;
  public pageIndex: number = 1;

  constructor(private githubService: GithubService, private route: ActivatedRoute) {
    this.getQueryParams();
  }

  ngOnInit(): void {
    this.getCommits();
  }

  getQueryParams(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.orgId = params.orgId;
      this.orgName = params.orgName;
      this.repositoryName = params.repositoryName;
      this.avatarUrl = params.avatarUrl;
    });
  }

  onScroll(): void {
    this.pageIndex++;
    this.getCommits();
  }

  getCommits(): void {
    this.githubService
      .getCommits(this.orgName, this.repositoryName, this.pageIndex)
      .subscribe((data: any) => {
        this.repositoryCommits.push(...data);
      });
  }

  toggleCommitAction(commitSha: string, action: string): void {
    switch (action) {
      case 'copy':
        this.copyToClipboard(commitSha);
        break;
      case 'open':
        this.openDiff(commitSha);
        break;
      default:
        break;
    }
  }

  openDiff(commitSha: string): void {
    // sorry this is ghetto lol
    window.open(`
     https://github.com/${this.orgName}/${this.repositoryName}/commit/${commitSha}.diff`);
  }

  copyToClipboard(commitSha: string): void {
    navigator.clipboard.writeText(commitSha);
  }
}
