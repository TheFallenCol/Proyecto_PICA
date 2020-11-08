# Proyecto_PICA
Proyecto PICA

En este repositorio se encuentra la interfaz gráfica del proyecto y el microservicio de autenticación con JWToken

Interfaz gráfica el proyecto de Arquitectura Empresarial de Software de la universidad Javeriana

# RestAdapter

### Proceso de instalación

#### Requisitos.

* Instalación de docker. [En caso de trabajar con imagenes, de lo contrario iniciar abrir el proyecto con Visual Studio Code]
    * Cree un network para comunicación en local entre microservicios. `docker network create toures-balon-network`

* En caso de querer ejecutar el código sin instalat el contenedor se debe tener instalado .Net Core 3.1 [https://dotnet.microsoft.com/download]

#### Instalación.

* En caso de no usar docker, ejecute:
    * Descargue el repositorio `git clone https://github.com/AESJaverianaPica2020/jav-aes-rest-adapter.git`
    * Abra un terminal
    * Ejecute `dotnet build` para descargar dependencias y compilar el proyecto.
    * Dirígase a la ruta RestAdapter-API mediante el comando `cd jav-aes-rest-adapter\RestAdapter-API`
    * Ejecute el comando `dotnet run`

* Si usa docker, ejecute:
    * Abra un terminal en la ruta `jav-aes-rest-adapter`
    * Ejecute el comando `dotnet build`
    * Para generar la imagen use el comando `docker build -t thefallencol/restadapter-api:v1.0 -f ./RestAdapter-API/dockerfile .`
    * `docker run --network toures-balon-network -ti --name restadapter-api -p 32785:80 thefallencol/restadapter-api:v1.0` Para ejecutar la imagen en el contenedor.

### Recurso:

Para poder realizar el consumo del recurso que premite la conexión con los proveedores por base de datos tenga en cuenta:

**PATH BASE:** /RestCall

<table style="width:100%">
    <tr>
        <td style="width:05%">PATH</td>
        <td style="width:15%">DESCRIPCIÓN</td>
        <td style="width:05%">TIPO</td>
        <td style="width:05%">VERBO</td>
        <td style="width:45%" width=35%>ESTRUCTURA DEL REQUEST</td>
        <td style="width:05%">HTTP CODE OK</td>
        <td style="width:20%">HTTP CODES FAILED</td>
    </tr>
    <tr>
        <td style="width:05%">/RestCall</td>
        <td style="width:15%">Recibe los datos requeridos para integrarse con proveedores cuyo método de integración son servicios Rest</td>
        <td td style="width:05%">SINCRONA</td>
        <td td style="width:05%">POST</td>
        <td td style="width:45%">Headers: Sin headers <br>
            Body: <br>
            A modo de ejemplo, enviar:<br>
          { <br>
            &emsp;<strong>"BaseURL"</strong>:"https://test.api.amadeus.com", <br>
            &emsp;<strong>"APIMethod"</strong>:"v1/shopping/flight-destinations", <br>
            &emsp;<strong>"HttpVerbose"</strong>:"GET", <br>
            &emsp;<strong>"Header"</strong>:{<br>
            &emsp;&emsp;<strong>"TokenHeader"</strong>:true, <br>
            &emsp;&emsp;<strong>"HeaderParameters"</strong>:{ <br>
            &emsp;&emsp;&emsp;<strong>"Content-Type"</strong>:null<br>
            &emsp;&emsp;},<br>
            &emsp;<strong>"MediaTypeHeader"</strong>:null,<br>
            &emsp;<strong>"TokenDefinition"</strong>:{<br>
            &emsp;&emsp;<strong>"BaseURL"</strong>:"https://test.api.amadeus.com",<br>
            &emsp;&emsp;<strong>"APIMethod"</strong>:"v1/security/oauth2/token",<br>
            &emsp;&emsp;<strong>"HttpVerbose"</strong>:"POST",<br>
            &emsp;&emsp;<strong>"Header"</strong>:{<br>
            &emsp;&emsp;&emsp;<strong>"TokenHeader"</strong>:false,<br>
            &emsp;&emsp;&emsp;<strong>"HeaderParameters"</strong>:{<br>
            &emsp;&emsp;&emsp;&emsp;<strong>"Content-Type"</strong>:"application/x-www-form-urlencoded"<br>
            &emsp;&emsp;&emsp;},<br>
            &emsp;&emsp;<strong>"MediaTypeHeader"</strong>:"application/x-www-form-urlencoded",<br>
            &emsp;&emsp;<strong>"TokenDefinition"</strong>:null,<br>
            &emsp;&emsp;<strong>"ResponseToken"</strong>:{<br>
            &emsp;&emsp;&emsp;<strong>"tokenTypeName"</strong>:"token_type",<br>
            &emsp;&emsp;&emsp;<strong>"accessTokenName"</strong>:"access_token"<br>
            &emsp;&emsp;}<br>
            &emsp;},<br>
            &emsp;<strong>"Body"</strong>:{<br>
            &emsp;&emsp;<strong>"BodyMediaType"</strong>:"application/x-www-form-urlencoded",<br>
            &emsp;&emsp;<strong>"BodyJsonMessage"</strong>:null,<br>
            &emsp;&emsp;&emsp;<strong>"BodyRawMessage"</strong>:{<br>
            &emsp;&emsp;&emsp;&emsp;<strong>"grant_type"</strong>:"secret_Amadeus grant_type",<br>
            &emsp;&emsp;&emsp;&emsp;<strong>"client_id"</strong>:"secret_Amadeus client_id",<br>
            &emsp;&emsp;&emsp;&emsp;<strong>"client_secret"</strong>:"secret_Amadeus client_secret"<br>
            &emsp;&emsp;&emsp;}<br>
            &emsp;&emsp;},<br>
            &emsp;&emsp;&emsp;<strong>"Parameters"</strong>:{<br>
            &emsp;&emsp;&emsp;&emsp;<strong>"Parameters"</strong>:null<br>
            &emsp;&emsp;&emsp;}<br>
            &emsp;&emsp;}<br>
            &emsp;},<br>
            &emsp;<strong>"Body"</strong>:{<br>
            &emsp;&emsp;<strong>"BodyMediaType"</strong>:null,<br>
            &emsp;&emsp;<strong>"BodyJsonMessage"</strong>:null,<br>
            &emsp;&emsp;<strong>"BodyRawMessage"</strong>:null<br>
            &emsp;},<br>
            &emsp;<strong>"Parameters"</strong>:{<br>
            &emsp;&emsp;<strong>"Parameters"</strong>:{<br>
            &emsp;&emsp;&emsp;<strong>"origin"</strong>:"BOG",<br>
            &emsp;&emsp;&emsp;<strong>"oneWay"</strong>:"false",<br>
            &emsp;&emsp;&emsp;<strong>"nonStop"</strong>:"false",<br>
            &emsp;&emsp;&emsp;<strong>"viewBy"</strong>:"COUNTRY",<br>
            &emsp;&emsp;&emsp;<strong>"departureDate"</strong>:"2020-10-30,2020-11-15" <br>
            &emsp;&emsp;}<br>
            &emsp;}<br>
        }<br>
        <br>
        <br>
           <strong>Definicion de parametros</strong><br>
{ <br>
	&emsp;<strong>"BaseURL"</strong>:URL del servicio a principal a consumir<br>
	&emsp;<strong>"APIMethod"</strong>:Método del servicio principal a consumir<br>
	&emsp;<strong>"HttpVerbose"</strong>:Verbo del servicio principal a consumir (POST/GET/DELETE…)<br>
	&emsp;<strong>"Header"</strong>:{<br>
	&emsp;&emsp;<strong>"TokenHeader"</strong>:Indica si es requerido token de autenticación (true,false)<br>
	&emsp;&emsp;<strong>"HeaderParameters"</strong>:{ (Indica si el token <br>
	&emsp;&emsp;&emsp;<strong>"Content-Type"</strong>:Media type utilizado en el servicio principal a consumir, especifico para el header<br>
	&emsp;&emsp;},<br>
	&emsp;<strong>"MediaTypeHeader"</strong>:Media type utilizado en el servicio principal a consumir, especifico para el header<br>
	&emsp;<strong>"TokenDefinition"</strong>:{<br>
	&emsp;&emsp;<strong>"BaseURL"</strong>:URL para obtener el token del header<br>
	&emsp;&emsp;<strong>"APIMethod"</strong>:Método del servicio para obtener el token<br>
	&emsp;&emsp;<strong>"HttpVerbose"</strong>:Verbo del servicio para obntener el token (POST/GET/DELETE…)<br>
	&emsp;&emsp;<strong>"Header"</strong>:{<br>
	&emsp;&emsp;&emsp;<strong>"TokenHeader"</strong>:Indica si es requerido token de autenticación (true,false)<br>
	&emsp;&emsp;&emsp;<strong>"HeaderParameters"</strong>:{<br>
	&emsp;&emsp;&emsp;&emsp;<strong>"Content-Type"</strong>:Media type utilizado en el servicio para obtener el token, especifico para el header del método<br>
	&emsp;&emsp;&emsp;},<br>
	&emsp;&emsp;<strong>"MediaTypeHeader"</strong>:Media type utilizado en el servicio para obtener el token, especifico para el header del método <br>
	&emsp;&emsp;<strong>"TokenDefinition"</strong>:Indica si el Header debe tener una definicion para el token<br>
	&emsp;&emsp;<strong>"ResponseToken"</strong>:{<br>
	&emsp;&emsp;&emsp;<strong>"tokenTypeName"</strong>:Nombre de los response de donde obtener el token type para agreagarlos al header<br>
	&emsp;&emsp;&emsp;<strong>"accessTokenName"</strong>:Access code de donde obtener el token para agregarlo al header<br>
	&emsp;&emsp;}<br>
	&emsp;},<br>
	&emsp;<strong>"Body"</strong>:{<br>
	&emsp;&emsp;<strong>"BodyMediaType"</strong>:Media Type del body<br>
	&emsp;&emsp;<strong>"BodyJsonMessage"</strong>:Mensaje Json a enviar en el body, se debe usar cuando es de tipo POST y mediatipe application/json<br>
	&emsp;&emsp;&emsp;<strong>"BodyRawMessage"</strong>:{ Mensaje en forma "llave":"valor" que será enviado cuando es tipo POST y mediatipe x-www-form-urlencode<br>
	&emsp;&emsp;&emsp;&emsp;<strong>"grant_type"</strong>:"secret_Amadeus grant_type", [Valor de ejemplo]<br>
	&emsp;&emsp;&emsp;&emsp;<strong>"client_id"</strong>:"secret_Amadeus client_id", [Valor de ejemplo]<br>
	&emsp;&emsp;&emsp;&emsp;<strong>"client_secret"</strong>:"secret_Amadeus client_secret" [Valor de ejemplo]<br>
	&emsp;&emsp;&emsp;}<br>
	&emsp;&emsp;},<br>
	&emsp;&emsp;&emsp;<strong>"Parameters"</strong>:Parametros a ser enviados, se usan cuando el llamado es GET{<br>
	&emsp;&emsp;&emsp;&emsp;<strong>"Parameters"</strong>:Parametros a ser enviados, se usan cuando el llamado es GET<br>
	&emsp;&emsp;&emsp;}<br>
	&emsp;&emsp;}<br>
	&emsp;},<br>
	&emsp;<strong>"Body"</strong>:{<br>
	&emsp;&emsp;<strong>"BodyMediaType"</strong>:Media Type del body<br>
	&emsp;&emsp;<strong>"BodyJsonMessage"</strong>:Mensaje Json a enviar en el body, se debe usar cuando es de tipo POST y mediatipe application/json<br>
	&emsp;&emsp;<strong>"BodyRawMessage"</strong>:Mensaje en forma "llave":"valor" que será enviado cuando es tipo POST y mediatipe x-www-form-urlencode<br>
	&emsp;},<br>
	&emsp;<strong>"Parameters"</strong>:{Parametros a ser enviados, se usan cuando el llamado es GET<br>
	&emsp;&emsp;<strong>"Parameters"</strong>:{Parametros a ser enviados, se usan cuando el llamado es GET<br>
	&emsp;&emsp;&emsp;<strong>"origin"</strong>:"BOG",[Valor de ejemplo]<br>
	&emsp;&emsp;&emsp;<strong>"oneWay"</strong>:"false",[Valor de ejemplo]<br>
	&emsp;&emsp;&emsp;<strong>"nonStop"</strong>:"false",[Valor de ejemplo]<br>
	&emsp;&emsp;&emsp;<strong>"viewBy"</strong>:"COUNTRY",[Valor de ejemplo]<br>
	&emsp;&emsp;&emsp;<strong>"departureDate"</strong>:"2020-10-30,2020-11-15" [Valor de ejemplo]<br>
	&emsp;&emsp;}<br>
	&emsp;}<br>
}<br>
        </td>
        <td td style="width:05%">200 - OK -</td>
        <td td style="width:20%">
            400 - BAD_REQUEST - Cuando se envian parametros de ejecución invalidos <br>
            500 - INTERNAL_SERVER_ERROR - Error interno el ejecución de proceso <br>
            408 - TIMEOUT_EXCEPTION - Cuando se genera timed out con proveedores en la solicitud de conexión 
       </td>
    </tr>
</table>



Image by <a href="https://pixabay.com/users/Yuri_B-2216431/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4266512">Yuri_B</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4266512">Pixabay</a>
