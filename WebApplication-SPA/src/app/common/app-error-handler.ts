import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler{
    handleError(error){
        //Codigo para almacenar trazas de errores o algo que pase en estos casos
        console.log('Unexpected error ocurred', error);
    }
}