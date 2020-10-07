using System.Collections.Generic;

namespace RestAdapterLibrary
{
    public class MessageBody
    {
        public string BodyMediaType { get; set; }
        public string BodyJsonMessage { get; set; }
        public Dictionary<string,string> BodyRawMessage { get; set; }

        public MessageBody(string bodyMediaType, string bodyJsonMessage, Dictionary<string, string> bodyRawMessage)
        {
            BodyMediaType = bodyMediaType;
            BodyJsonMessage = BodyJsonMessage;
            BodyRawMessage = bodyRawMessage;
        }

        public MessageBody()
        {

        }
    }
}
