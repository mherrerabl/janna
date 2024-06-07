import { Component, Input } from '@angular/core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contact-links',
  templateUrl: './contact-links.component.html',
  styleUrl: './contact-links.component.scss',
})
export class ContactLinksComponent {
  @Input() header: boolean = false;
  iconEmail = faEnvelope;
  iconPhone = faPhone;
  iconWhatsapp = faWhatsapp;
}
