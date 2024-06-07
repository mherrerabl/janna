import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showCart: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<
    'open' | 'close'
  >('close');

  private showMenu: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<
    'open' | 'close'
  >('close');

  private showLogin: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<
    'open' | 'close'
  >('close');

  private showRegister: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<
    'open' | 'close'
  >('close');

  watchCart(): Observable<'open' | 'close'> {
    return this.showCart.asObservable();
  }

  openCart(): void {
    this.showLogin.next('close');
    this.showRegister.next('close');
    this.showMenu.next('close');
    this.showCart.next('open');
  }

  closeCart(): void {
    this.showCart.next('close');
  }

  watchMenu(): Observable<'open' | 'close'> {
    return this.showMenu.asObservable();
  }

  openMenu(): void {
    this.showLogin.next('close');
    this.showRegister.next('close');
    this.showCart.next('close');
    this.showMenu.next('open');
  }

  closeMenu(): void {
    this.showMenu.next('close');
  }

  watchLogin(): Observable<'open' | 'close'> {
    return this.showLogin.asObservable();
  }

  openLogin(): void {
    this.showCart.next('close');
    this.showRegister.next('close');
    this.showMenu.next('close');
    this.showLogin.next('open');
  }

  closeLogin(): void {
    this.showLogin.next('close');
  }

  watchRegister(): Observable<'open' | 'close'> {
    return this.showRegister.asObservable();
  }

  openRegister(): void {
    this.showLogin.next('close');
    this.showCart.next('close');
    this.showMenu.next('close');
    this.showRegister.next('open');
  }

  closeRegister(): void {
    this.showRegister.next('close');
  }
}
