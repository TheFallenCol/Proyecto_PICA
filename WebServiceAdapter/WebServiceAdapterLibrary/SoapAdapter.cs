using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.Xml;

namespace WebServiceAdapterLibrary
{
    public class SoapAdapter
    {
        private readonly string _url;
        private readonly string _action;
        private readonly string _SOAPEnvelope;

        public SoapAdapter(string url, string action, string SOAPEnvelope)
        {
            _url = url;
            _action = action;
            _SOAPEnvelope = SOAPEnvelope;
        }

        public string SoapDynamicallyCall()
        {            
            var soapEnvelopeXml = CreateSoapEnvelope();
            var soapRequest = CreateSoapRequest(_url, _action);

            InsertSoapEnvelopeIntoSoapRequest(soapEnvelopeXml, soapRequest);

            using (var stringWriter = new StringWriter())
            {
                using (var xmlWriter = XmlWriter.Create(stringWriter))
                {
                    soapEnvelopeXml.WriteTo(xmlWriter);
                    xmlWriter.Flush();
                }
            }

            // begin async call to web request.
            var asyncResult = soapRequest.BeginGetResponse(null, null);

            // suspend this thread until call is complete. You might want to
            // do something usefull here like update your UI.
            var success = asyncResult.AsyncWaitHandle.WaitOne(TimeSpan.FromSeconds(5));

            if (!success) return null;

            // get the response from the completed web request.
            using (var webResponse = soapRequest.EndGetResponse(asyncResult))
            {
                string soapResult;
                var responseStream = webResponse.GetResponseStream();
                if (responseStream == null)
                {
                    return null;
                }
                using (var reader = new StreamReader(responseStream))
                {
                    soapResult = reader.ReadToEnd();
                }
                return soapResult;
            }
        }

        private HttpWebRequest CreateSoapRequest(string url, string action)
        {
            var webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Headers.Add("SOAPAction", action);
            webRequest.ContentType = "text/xml;charset=\"utf-8\"";
            webRequest.Accept = "text/xml";
            webRequest.Method = "POST";
            return webRequest;
        }

        private XmlDocument CreateSoapEnvelope()
        {
            var soapEnvelope = new XmlDocument();
            soapEnvelope.LoadXml(_SOAPEnvelope); //the SOAP envelope to send
            return soapEnvelope;
        }

        private void InsertSoapEnvelopeIntoSoapRequest(XmlDocument soapEnvelopeXml, HttpWebRequest webRequest)
        {
            using (Stream stream = webRequest.GetRequestStream())
            {
                soapEnvelopeXml.Save(stream);
            }
        }
    }
}
