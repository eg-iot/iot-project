import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';
import {
  ISignUpFormData,
  TLoginFormData,
} from 'src/app/shared/models/form.data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly accessToken = 'access-token';
  private readonly LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
      login(data: { email: $email, password: $password })
    }
  `;
  private readonly SIGN_UP = gql`
    mutation SignUp(
      $email: String!
      $password: String!
      $firstName: String!
      $lastName: String!
      $confirmPassword: String!
    ) {
      signUp(
        data: {
          email: $email
          password: $password
          firstName: $firstName
          lastName: $lastName
          confirmPassword: $confirmPassword
        }
      )
    }
  `;

  private readonly LOGOUT = gql`
    mutation Logout {
      logOut
    }
  `;

  private readonly GET_USER = gql`
    query getUser {
      getCurrentUser {
        role
      }
    }
  `;

  private AccessTokenProvided: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  constructor(private Apollo: Apollo) {
    this.isAuthenticated();
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessToken);
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem(this.accessToken);
    if (accessToken) this.AccessTokenProvided.next(true);
    else this.AccessTokenProvided.next(false);
  }

  checkToken() {
    return this.AccessTokenProvided;
  }

  getUserRole() {
    return this.Apollo.subscribe({
      query: this.GET_USER,
      context: {
        headers: {
          Authorization: localStorage.getItem('access-token'),
        },
      },
    }).pipe(
      map(({ data }: any) => {
        if (data.getCurrentUser.role === 'admin') return true;
        else return false;
      })
    );
  }

  signUp(data: ISignUpFormData) {
    return this.Apollo.mutate({
      mutation: this.SIGN_UP,
      variables: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        confirmPassword: data.confirmPassword,
      },
    });
  }

  login(data: TLoginFormData) {
    return this.Apollo.mutate({
      mutation: this.LOGIN,
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  }

  logOut() {
    return this.Apollo.mutate({
      mutation: this.LOGOUT,
    });
  }
}
