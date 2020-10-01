using System;
using System.Collections.Generic;
using System.Text;

namespace RestAdapterLibrary
{
    public class RestCall
    {
        public string BaseURL { get; set; }
        public string APIMethod { get; set; }
        public string HttpVerbose { get; set; }
        public MessageHeader Header { get; set; }
        public MessageBody Body { get; set; }

        public RestCall(string baseURL, string apiMethod, string httpVerbose, MessageHeader header, MessageBody body)
        {
            BaseURL = baseURL;
            APIMethod = apiMethod;
            HttpVerbose = httpVerbose;
            Header = header;
            Body = body;
        }

        public RestCall()
        {

        }
    }
}
