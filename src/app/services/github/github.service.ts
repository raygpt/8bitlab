import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  headers = {
    accept: 'application/vnd.github+json',
  };

  constructor(private http: HttpClient) {}

  searchOrganizations(orgName: string): Observable<any> {
    return this.http.get(`https://api.github.com/search/users?q=${orgName}`, {
      headers: this.headers,
    });
  }

  getOrganization(orgName: string): Observable<any> {
    return this.http.get(`https://api.github.com/orgs/${orgName}`, { headers: this.headers });
  }

  getRepositories(orgId: string, pageSize: number, pageIndex: number): Observable<any> {
    return this.http.get(
      `https://api.github.com/orgs/${orgId}/repos?per_page=${pageSize}&page=${pageIndex + 1}`,
      {
        headers: this.headers,
        observe: 'response',
      }
    );
  }

  getBranches(orgName: string, repositoryName: string): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${orgName}/${repositoryName}/branches`, {
      headers: this.headers,
    });
  }

  getCommits(orgName: string, repositoryName: string, pageIndex: number): Observable<any> {
    return this.http.get(
      `https://api.github.com/repos/${orgName}/${repositoryName}/commits?&page=${pageIndex}`,
      { headers: this.headers }
    );
  }
}
