using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.Xml;

namespace WebServiceAdapterLibrary
{
    public class SoapAdapter
    {
        private readonly SoapParameters _soapParameters;
        
        public SoapAdapter(SoapParameters soapParameters)
        {
            _soapParameters = soapParameters;
        }

        public string SoapDynamicallyCall()
        {
            try
            {
                var soapEnvelopeXml = CreateSoapEnvelope();
                var soapRequest = CreateSoapRequest(_soapParameters.Endpoint, _soapParameters.Action);

                //Inserta dentro del WebRequest el envelope del SOAP
                InsertSoapEnvelopeIntoSoapRequest(soapEnvelopeXml, soapRequest);

                //Escribir el Envelope como un XML
                using (var stringWriter = new StringWriter())
                {
                    using (var xmlWriter = XmlWriter.Create(stringWriter))
                    {
                        soapEnvelopeXml.WriteTo(xmlWriter);
                        xmlWriter.Flush();
                    }
                }

                soapRequest.Timeout = 10000;

                //Realizar la solicitud
                var asyncResult = soapRequest.BeginGetResponse(null, null);
                var success = asyncResult.AsyncWaitHandle.WaitOne(TimeSpan.FromSeconds(5));

                if (!success) return null;

                //Obtener la respuesta del servicio
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
            catch (TimeoutException timeException) {
                throw timeException;
            }
            catch (Exception ex)
            {
                throw ex;
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
            soapEnvelope.LoadXml(_soapParameters.EnvelopeRequest);
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
