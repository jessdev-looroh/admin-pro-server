// import { NextFunction, Request, Response } from "express";
// import Jimp from "jimp/es";
// import path from "path";
// import Color from "../models/colores.model";

// export let generaLogo = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let nombreEmpresa:string = req.body.nombreEmpresa.charAt(0).toUpperCase();
//   let nombreEnlace:string = req.body.nombreEnlace.trim().replace(' ','');
  
//   let nombreArchivo = `${nombreEnlace}-${new Date().getTime()}.png`;
//   let color = req.body.color ? req.body.color : "5fb9b9764e7d2825f8553dc4";

//   Color.findById(color, async (err, color: any) => {
//     if (err) { 
//       res.status(500).json({
//         exito: false,
//         err,
//       });
//     }
//     let codigo = color.codigo;    
//     let font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
//     const image = await Jimp.read(100, 100, codigo);
//     // let textLength = Jimp.measureText(font, nombreEmpresa);
//     // console.log("object");
//     // if (textLength > 100) {
//     //   font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
//     //   textLength = Jimp.measureText(font, nombreEmpresa);
//     //   if (textLength > 100) {
//     //     font = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK);
//     //     textLength = Jimp.measureText(font, nombreEmpresa);
//     //     if (textLength > 100) {
//     //       font = await Jimp.loadFont(Jimp.FONT_SANS_12_BLACK);
//     //       textLength = Jimp.measureText(font, nombreEmpresa);
//     //       if (textLength > 100) {
//     //         font = await Jimp.loadFont(Jimp.FONT_SANS_10_BLACK);
//     //         textLength = Jimp.measureText(font, nombreEmpresa);
//     //       }
//     //     }
//     //   }
//     // }
//     image.print(
//       font,
//       0,
//       0,
//       {
//         text: `${nombreEmpresa}`,
//         alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
//         alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
//       },
//       100,
//       100
//     );
//     console.log(path.resolve(__dirname, `../uploads/logos/${nombreArchivo}`));
//     let write = await image.writeAsync(      
//       path.resolve(__dirname, `../uploads/logos/${nombreArchivo}`)
//     );

//     if (write) {
      
//       req.body.logo = nombreArchivo;
//       next();
//     }
//   });
// };
