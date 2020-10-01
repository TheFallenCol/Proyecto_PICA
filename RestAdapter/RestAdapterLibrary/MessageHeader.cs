using System;
using System.Collections.Generic;
using System.Text;

namespace RestAdapterLibrary
{
    public class MessageHeader
    {        
        public bool TokenHeader { get; set; }
        public string HeaderParameters { get; set; }
        public string MediaTypeHeader { get; set; }

        public MessageHeader(bool tokenHeader, string headerParameters, string mediaTypeHeader)
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
