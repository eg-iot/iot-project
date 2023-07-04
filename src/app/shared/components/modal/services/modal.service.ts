import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: IModal[] = [];
  isShown: boolean = false;

  constructor() {}

  // register modal
  registerModal(id: string) {
    if (!this.modals.some((element) => element.id === id)) {
      this.modals.push({ id, visible: false });
    }
  }

  //Check if modal open
  isModalOpen(id: string): boolean {
    return !!this.modals.find((element) => element.id === id)?.visible;
  }

  // Toggle modal visibility
  toggleModal(id: string) {
    let modal = null;
    if (!this.modals.some((element) => element.id === id)) {
      this.modals.push({ id, visible: false });
      modal = this.modals.find((element) => element.id === id);
      if (modal) modal.visible = !modal.visible;
    } else {
      modal = this.modals.find((element) => element.id === id);
      if (modal) modal.visible = !modal.visible;
    }
  }

  removeModal(id: string) {
    let element = document.getElementById(id);
    if (element) element.remove();
  }

  // unregister modal
  unregister(id: string) {
    this.modals = this.modals.filter((element) => element.id !== id);
  }
}
