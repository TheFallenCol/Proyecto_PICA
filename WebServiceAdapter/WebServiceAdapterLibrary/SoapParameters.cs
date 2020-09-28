using System;
using System.Collections.Generic;
using System.Text;

namespace WebServiceAdapterLibrary
{
    public class SoapParameters
    {
        public string Url { get; set; }
        public string Action { get; set; }
        public string EnvelopeRequest { get; set; }
        public string EnvelopeResponse { get; set; }
    }
}
