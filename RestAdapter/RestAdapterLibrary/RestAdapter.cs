using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace RestAdapterLibrary
{
    public class RestAdapter
    {
        private readonly RestCall _callDescription;

        public RestAdapter(RestCall callDescription)
        {
            _callDescription = callDescription;
        }

        public async Task<string> ExecuteRestCall()
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    //RestSharp
                    //RestClient client = new RestClient(_callDescription.BaseURL);
                    //client.Authenticator = new SimpleAuthenticator("NickName","GermanSilva","password","123456");
                    //var request = new RestRequest("api/token", Method.POST);
                    //var algo = client.Execute(request);

                    //httpClient.BaseAddress = new Uri(_callDescription.BaseURL);
                    //httpClient.DefaultRequestHeaders.Accept.Add(await SetHeader(_callDescription.Header.TokenHeader));
                    //string stringData = await PostCall(httpClient);

                    var dict = new Dictionary<string, string>();
                    dict.Add("grant_type", "client_credentials");
                    dict.Add("client_id", "TsFjpZGZZZyF779B3QAAkJvneMb2GGGj");
                    dict.Add("client_secret", "BZtAGcQKY95tpcVd");

                    httpClient.BaseAddress = new Uri("https://test.api.amadeus.com");
                    var req = new HttpRequestMessage(HttpMethod.Post, String.Format("{0}{1}", httpClient.BaseAddress.ToString(), "v1/security/oauth2/token")) { Content = new FormUrlEncodedContent(_callDescription.Header.TokenDefinition.Body.BodyRawMessage) };
                    var res = await httpClient.SendAsync(req);
                    string stringData = await res.Content.ReadAsStringAsync();

                    return stringData;
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<MediaTypeWithQualityHeaderValue> SetHeader(bool hasToken)
        {
            MediaTypeWithQualityHeaderValue contentType = null;

            if (hasToken)
            {
                //...Logica
                var restCall = new RestCall();
            }
            else
            {
                contentType = new MediaTypeWithQualityHeaderValue(_callDescription.Header.MediaTypeHeader);
            }

            return contentType;
        }

        public StringContent SetBody()
        {
            var content = new StringContent(_callDescription.Body.BodyJsonMessage, Encoding.UTF8, _callDescription.Body.BodyMediaType);
            return content;
        }

        public async Task<string> PostCall(HttpClient httpClient)
        {
            HttpResponseMessage response = await httpClient.PostAsync(_callDescription.APIMethod, SetBody());
            return await response.Content.ReadAsStringAsync();
        }

    }
}
