using System;
using System.Collections.Generic;
using System.Text;

namespace WebServiceAdapterLibrary
{
    public class SoapParameters
    {
        public string Endpoint { get; set; }
        public string Action { get; set; }
        public string EnvelopeRequest { get; set; }
    }
}
