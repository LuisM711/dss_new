import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  projects = [
      { id: 1, Nombre: 'Proyecto 1', Descripcion: 'Descripción 1' },
      { id: 2, Nombre: 'Proyecto 2', Descripcion: 'Descripción 2' },
  ];

  proj = {
      id: 0,
      Nombre: '',
      Descripcion: ''
  };

  hayRegistros(){
    return this.projects.length>0;
  }
  borrar(){
    if(this.proj.id === 0){
      alert('Debe ingresar un id para poder consultar el proyecto');
      return;
    }
    this.projects = this.projects.filter(project => project.id !== this.proj.id);
    return;
  }
  modificar(){
    if(this.proj.id === 0){
      alert('Debe ingresar un id para poder consultar el proyecto');
      return;
    }
    for(const element of this.projects){
      if(element.id==this.proj.id){
        element.Nombre=this.proj.Nombre;
        element.Descripcion=this.proj.Descripcion;
        this.limpiar();
        return;
      }
    }
    alert('No existe artículo con ese código')
  }

  agregar(){
    if(this.proj.id === 0){
      alert('Debe ingresar un ID de proyecto distinto a 0');
      return;
    }
    for(const element of this.projects){
      if(element.id == this.proj.id){
        alert('Ya existe un proyecto con ese código');
        return;
      }
    }
    this.projects.push(this.proj);
    this.limpiar();
  }
  consultar(){
    if(!this.proj.id || this.proj.id===0){
      alert("Debe ingresar un id para poder consultar el proyecto");
      return;
    }
    const proyectoEncontrado = this.projects.find(project => project.id === this.proj.id);
    if (proyectoEncontrado) {
        this.proj.Nombre = proyectoEncontrado.Nombre;
        this.proj.Descripcion = proyectoEncontrado.Descripcion;
    } else {
        alert("Proyecto no encontrado con el ID ingresado.");
        this.limpiar;
    }
  }
  seleccionar(proj:{id:number,Nombre:string,Descripcion:string}){
    this.proj.id=proj.id;
    this.proj.Nombre=proj.Nombre;
    this.proj.Descripcion=proj.Descripcion;
  }
  limpiar(){
    this.proj = {
        id: 0,
        Nombre: '',
        Descripcion: ''
    };
  }
}
