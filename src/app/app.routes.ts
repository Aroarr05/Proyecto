import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DestinoCrearComponent } from './components/destino/destino-crear/destino-crear.component';
import { DestinoEditarComponent } from './components/destino/destino-editar/destino-editar.component';
import { DestinoListarComponent } from './components/destino/destino-listar/destino-listar.component';
import { UsuarioCrearComponent } from './components/usuario/usuario-crear/usuario-crear.component';
import { UsuarioEditarComponent} from './components/usuario/usuario-editar/usuario-editar.component';
import { UsuarioListarComponent } from './components/usuario/usuario-listar/usuario-listar.component';


export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'destino-crear', component: DestinoCrearComponent },
    { path: 'destino-editar/:id', component: DestinoEditarComponent },
    { path: 'destino-listar', component: DestinoListarComponent },
    { path: 'usuario-crear', component: UsuarioCrearComponent },
    { path: 'usuario-editar/:id', component: UsuarioEditarComponent },
    { path: 'usuario-listar', component: UsuarioListarComponent }
    
];