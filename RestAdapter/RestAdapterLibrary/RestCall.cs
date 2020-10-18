namespace RestAdapterLibrary
{
    public class RestCall
    {
        public string BaseURL { get; set; }
        public string APIMethod { get; set; }
        public string HttpVerbose { get; set; }
        public MessageHeader Header { get; set; }
        public MessageBody Body { get; set; }
        public MessageParameters Parameters { get; set; }

        public RestCall(string baseURL, string apiMethod, string httpVerbose, MessageHeader header, MessageBody body, MessageParameters parameters)
        {
            BaseURL = baseURL;
            APIMethod = apiMethod;
            HttpVerbose = httpVerbose;
            Header = header;
            Body = body;
            Parameters = parameters;
        }

        public RestCall()
        {

        }
    }
}
