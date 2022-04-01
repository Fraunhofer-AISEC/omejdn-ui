import { Component, OnInit, Input, Output, DoCheck, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css']
})
export class InputfieldComponent implements OnInit {
  @Input() type;     // Data type, e.g. "boolean"
  @Input() name;     // Property name
  @Input() value;    // Contains the value
  @Input() options;  // Options in enums
  @Input() deleteCallback; // A callback for deletion
  @Input() refID;    // Reference for deletion (e.g. Array index)
  @Input() addCallback; // A callback for addition
  @Input() static = false; // Whether the object cannot be edited (only applies to primitives)

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() { }
  ngOnInit(): void {}

  // Tries to determine the type of an object.
  // If no argument is given, defaults to this.value
  getType(value = null) {
    if (value == null) {
      if (this.type != null && this.type !== 'any') { return this.type; } // Type might be explicitly given
      value = this.value;
    }
    if (Array.isArray(value)) { return 'array-any'; } // Good enough
    return typeof value;
  }

  // For arrays. Tries to determine the type of the elements
  // Note: We only support pure string- and attribute-arrays atm.
  elemType(type) {
    if (type === 'any') { return 'any'; }
    if (!type.startsWith('array')) { return null; }
    if (type === 'array-attribute') { return 'attribute'; }
    if (type === 'array-any') { return 'string'; }
    if (type === 'array') { return 'string'; }
    return type.substring('array-'.length);
  }

  // For arrays. A callback to add an element of the specified type
  // The added value might get wrapped into an attribute
  add = (key, newType) => {
    console.log('adding ' + key + ' of type ' + newType);
    if (!this.elemType(this.getType()).startsWith('attribute')) {
      if (key !== '' && key !== undefined && !this.value.includes(key)) {
        this.value.push(key);
      }
    }
    if (this.elemType(this.getType()).startsWith('attribute')) {
      let value = { // Default values
        string: '',
        boolean: false,
        number: 0
      }[newType];
      if (newType.startsWith('array')) { value = []; }
      this.value.push({ key, value });
    }

  }

  // For arrays. A callback to delete an element.
  delete = (refID) => {
    console.log('deleted ' + refID);
    if (this.getType().startsWith('array')) {
      this.value.splice(refID, 1);
    }
  }

}
