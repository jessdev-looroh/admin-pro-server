import { MenuInterface } from '../models/menu.interface';

export const getMenuFrontEnd= (role:string)=>{
    const menu : MenuInterface[] = [
        {
          titulo : 'Dashboard!!',
          icono :'mdi mdi-gauge',
          submenu: [
            {titulo:'Main',url:'/'},
            {titulo:'Configuraciones',url:'account-settings'},
            {titulo:'Gráfica',url:'grafica1'},
            {titulo:'ProgressBar',url:'progress'},
            {titulo:'Promesas',url:'promesas'},
            {titulo:'RXJS',url:'rxjs'},
          ]
        },
        {
          titulo : 'Mantenimiento!!',
          icono :'mdi mdi-gauge',
          submenu: [            
            {titulo:'Hospitales',url:'hospitales'},
            {titulo:'Medicos',url:'medicos'}
          ]
        }
      ];

      if(role==='ADMIN_ROLE')
      {
        menu[1].submenu.unshift({titulo:'Usuarios',url:'usuarios'})
      }
      return menu;
}