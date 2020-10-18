using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Collections.Generic;

namespace RestAdapterLibrary
{
    public class RestAdapter
    {
        private readonly RestCall _callDescription;

        public RestAdapter(RestCall callDescription)
        {
            _callDescription = callDescription;
        }

        public string ExecuteRestCall()
        {
            OAuth2AuthorizationRequestHeaderAuthenticator autorizationBearer = null;

            try
            {
                if (_callDescription.Header.TokenHeader)
                    autorizationBearer = TokenHeader();

                return BodyCall(autorizationBearer);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Set body and header to get the token auth
        public OAuth2AuthorizationRequestHeaderAuthenticator TokenHeader()
        {
            try
            {
                var client = new RestClient(_callDescription.Header.TokenDefinition.BaseURL);
                var request = new RestRequest(_callDescription.Header.TokenDefinition.APIMethod);
                client.Timeout = 1500;

                IRestResponse restResponse =
                       ExecuteCall(client, request, _callDescription.Header.TokenDefinition.HttpVerbose, _callDescription.Header.TokenDefinition.Body.BodyMediaType,
                       _callDescription.Header.TokenDefinition.Header.MediaTypeHeader, _callDescription.Header.TokenDefinition.Body.BodyJsonMessage,
                       _callDescription.Header.TokenDefinition.Body.BodyRawMessage, _callDescription.Header.TokenDefinition.Parameters.Parameters);

                if (restResponse == null)
                    throw new Exception("There was and error getting the response from ");

                var responsesValues = JObject.Parse(restResponse.Content);
                string accessTokenName = "";
                string tokenTypeName = "";

                if (!_callDescription.Header.TokenDefinition.Header.ResponseToken.TryGetValue("accessTokenName", out accessTokenName) || !_callDescription.Header.TokenDefinition.Header.ResponseToken.TryGetValue("tokenTypeName", out tokenTypeName))
                    throw new Exception("Tne contract with the authentication provider has changed");

                var accessToken = responsesValues.Value<string>(accessTokenName);
                var tokenType = responsesValues.Value<string>(tokenTypeName);

                return new OAuth2AuthorizationRequestHeaderAuthenticator(accessToken, tokenType);
            }
            catch (Exception ex)
            {
                if (ex.GetType() == typeof(TimeoutException))
                    throw new TimeoutException("Error de comunicacion con el metodo del token del header", ex.InnerException);

                throw new Exception("Error llamando el token de la cabecera", ex.InnerException);
            }
        }

        public string BodyCall(OAuth2AuthorizationRequestHeaderAuthenticator autorizationBearer)
        {
            try
            {
                var client = new RestClient(_callDescription.BaseURL);
                var request = new RestRequest(_callDescription.APIMethod);

                if (autorizationBearer != null)
                    client.Authenticator = autorizationBearer;

                client.Timeout = 1500;
                IRestResponse restResponse =
                       ExecuteCall(client, request, _callDescription.HttpVerbose, _callDescription.Body.BodyMediaType, _callDescription.Header.MediaTypeHeader,
                       _callDescription.Body.BodyJsonMessage, _callDescription.Body.BodyRawMessage, _callDescription.Parameters.Parameters);
                return restResponse.Content;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="bodyMediaType"></param>
        /// <param name="headerMediaType"></param>
        /// <param name="method"></param>
        /// <param name="bodyJsonMessage"></param>
        /// <param name="bodyRawMessage"></param>
        /// <param name="getParameters"></param>
        /// <returns></returns>
        public RestRequest AddRequestBody(RestRequest request, string bodyMediaType, string headerMediaType, Method method, string bodyJsonMessage = "", Dictionary<string, string> bodyRawMessage = null, Dictionary<string, string> getParameters = null)
        {
            if (method == Method.GET)
            {
                foreach (KeyValuePair<string, string> valuePair in getParameters)
                {
                    request.AddParameter(valuePair.Key, valuePair.Value, ParameterType.QueryString);
                }

                return request;
            }

            switch (bodyMediaType)
            {
                case "application/json":
                    request.AddHeader("content-type", headerMediaType);
                    request.AddJsonBody(bodyJsonMessage);
                    break;
                case "application/x-www-form-urlencoded":
                    request.AddHeader("content-type", headerMediaType);
                    var parameters = "";
                    foreach (KeyValuePair<string, string> valuePair in bodyRawMessage)
                    {
                        if (string.IsNullOrEmpty(parameters))
                            parameters = valuePair.Key + "=" + valuePair.Value;
                        else
                            parameters = parameters + "&" + valuePair.Key + "=" + valuePair.Value;
                    }
                    request.AddParameter(bodyMediaType, parameters, ParameterType.RequestBody);
                    break;
                default:
                    throw new Exception("There is no Media Type configured for this");
            }

            return request;
        }

        public IRestResponse ExecuteCall(RestClient client, RestRequest request, string httpVerbose, string bodyMediaType, string headerMediaType, string bodyJsonMessage, Dictionary<string, string> bodyRawMessage = null, Dictionary<string, string> getParameters = null)
        {
            try
            {
                IRestResponse restResponse;

                switch (httpVerbose)
                {
                    case "POST":
                        request.Method = Method.POST;
                        request = AddRequestBody(request, bodyMediaType, headerMediaType, Method.POST, bodyJsonMessage, bodyRawMessage, getParameters);
                        restResponse = client.Execute(request);
                        break;
                    case "GET":
                        request.Method = Method.GET;
                        request = AddRequestBody(request, null, null, Method.GET, null, null, getParameters);
                        restResponse = client.Execute(request);
                        break;
                    case "PUT":
                        request.Method = Method.PUT;
                        request = AddRequestBody(request, bodyMediaType, headerMediaType, Method.PUT, bodyJsonMessage, bodyRawMessage, getParameters);
                        restResponse = client.Execute(request);
                        break;
                    case "DELETE":
                        request.Method = Method.DELETE;
                        request = AddRequestBody(request, bodyMediaType, headerMediaType, Method.DELETE, bodyJsonMessage, bodyRawMessage, getParameters);
                        restResponse = client.Execute(request);
                        break;
                    default:
                        throw new Exception("There is no Media Type configured for this");
                }

                return restResponse;
            }
            catch (Exception ex)
            {
                if (ex.GetType() == typeof(TimeoutException))
                    throw new TimeoutException("Error de comunicacion con el llamado en el body", ex.InnerException);

                throw new Exception("Error al ejecutar llamado del body", ex.InnerException);
            }
        }

    }
}
