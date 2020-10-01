using System;
using System.Collections.Generic;
using System.Text;

namespace RestAdapterLibrary
{
    public class MessageBody
    {
        public string BodyMediaType { get; set; }
        public string BodyMessage { get; set; }

        public MessageBody(string bodyMediaType, string bodyMessage)
        {
            BodyMediaType = bodyMediaType;
            BodyMessage = bodyMessage;
        }

        public MessageBody()
        {

        }
    }
}
