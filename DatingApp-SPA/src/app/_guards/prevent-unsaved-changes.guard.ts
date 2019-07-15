import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent):boolean {
    if (component.editForm.dirty) {
      return confirm("Are you sure? Any unsaved changes will be lost")
    }
    return true;
  }
} 
