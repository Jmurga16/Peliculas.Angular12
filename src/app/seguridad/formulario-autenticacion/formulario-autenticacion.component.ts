import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from '../seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.css']
})
export class FormularioAutenticacionComponent implements OnInit {

  form: FormGroup

  @Input() errores: string[] = []
  @Input() accion: string[] = []
  @Output() onSubmit: EventEmitter<credencialesUsuario> = new EventEmitter<credencialesUsuario>();

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  obtenerMensajeErrorEmail() {
    var campo = this.form.get('email');
    if (campo.hasError('required')) {
      return 'El campo Email es requerido'
    }

    if (campo.hasError('email')) {
      return 'El email no es válido'
    }

    return ''
  }

}
