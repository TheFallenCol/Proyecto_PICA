using System.Collections.Generic;

namespace RestAdapterLibrary
{
    public class MessageParameters
    {
        public Dictionary<string,string> Parameters { get; set; }

        public MessageParameters(Dictionary<string, string> parameters)
        {
            Parameters = parameters;
        }

        public MessageParameters()
        {
                
        }
    }
}
