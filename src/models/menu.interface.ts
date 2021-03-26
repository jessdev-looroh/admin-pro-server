export interface MenuInterface{

    titulo : string;
    icono : string;
    submenu: SubMenu[]

}

interface SubMenu{
    titulo:string;
    url : string;
}