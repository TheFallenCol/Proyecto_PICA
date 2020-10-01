using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
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

        public async Task<string> Method()
        {            
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(_callDescription.BaseURL);
                    MediaTypeWithQualityHeaderValue contentType = new MediaTypeWithQualityHeaderValue(_callDescription.Header.MediaTypeHeader);
                    client.DefaultRequestHeaders.Accept.Add(contentType);

                    var content = new StringContent(_callDescription.Body.BodyMessage, Encoding.UTF8, _callDescription.Body.BodyMediaType);
                    HttpResponseMessage response = client.PostAsync(_callDescription.APIMethod, content).Result;
                    string stringData = response.Content.ReadAsStringAsync().Result;


                    //var dict = new Dictionary<string, string>();
                    //dict.Add("grant_type", "client_credentials");
                    //dict.Add("client_id", "TsFjpZGZZZyF779B3QAAkJvneMb2GGGj");
                    //dict.Add("client_secret", "BZtAGcQKY95tpcVd");

                    //client.BaseAddress = new Uri("https://test.api.amadeus.com");                                       
                    //var req = new HttpRequestMessage(HttpMethod.Post, String.Format("{0}{1}",client.BaseAddress.ToString(), "v1/security/oauth2/token")) { Content = new FormUrlEncodedContent(dict)};
                    //var res = await client.SendAsync(req);
                    //string stringData = res.Content.ReadAsStringAsync().Result;

                    return stringData;
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
