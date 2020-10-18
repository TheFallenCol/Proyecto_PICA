using System.Collections.Generic;

namespace RestAdapterLibrary
{
    public class MessageHeader
    {        
        public bool TokenHeader { get; set; }
        public Dictionary<string,string> HeaderParameters { get; set; }
        public string MediaTypeHeader { get; set; }
        public RestCall TokenDefinition { get; set; }
        public Dictionary<string,string> ResponseToken { get; set; }

        public MessageHeader(bool tokenHeader, Dictionary<string,string> headerParameters, string mediaTypeHeader, RestCall tokenDefinition, Dictionary<string,string> responseToken)
        {
            TokenHeader = tokenHeader;
            HeaderParameters = headerParameters;
            MediaTypeHeader = mediaTypeHeader;
            TokenDefinition = tokenDefinition;
            ResponseToken = responseToken;
        }

        public MessageHeader()
        {

        }
    }
}
