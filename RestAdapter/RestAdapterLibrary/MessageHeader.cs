using System;
using System.Collections.Generic;
using System.Text;

namespace RestAdapterLibrary
{
    public class MessageHeader
    {        
        public bool TokenHeader { get; set; }
        public Dictionary<string,string> HeaderParameters { get; set; }
        public string MediaTypeHeader { get; set; }
        public RestCall TokenDefinition { get; set; }
        public string[] ResponseToken { get; set; }

        public MessageHeader(bool tokenHeader, Dictionary<string,string> headerParameters, string mediaTypeHeader)
        {
            TokenHeader = tokenHeader;
            HeaderParameters = headerParameters;
            MediaTypeHeader = mediaTypeHeader;
        }

        public MessageHeader()
        {

        }
    }
}
