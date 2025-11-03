import { CustomFooter } from "../../components";
import { CustomHeader } from "../../components/CustomHeader";


export const ContactPage = () => {
  return (
    <>
      <CustomHeader showNavigation={false} />

      <section className="container mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-primary">Contáctanos</h1>
        <p className="mb-4">
          En <strong>SmartCitas</strong> valoramos tu opinión. Si tienes dudas, sugerencias o deseas
          obtener más información sobre nuestros servicios, no dudes en comunicarte con nosotros.
        </p>

        <div className="space-y-2 mb-6">
          <p>📧 <strong>Soporte técnico:</strong> soporte@smartcitas.com</p>
          <p>📧 <strong>Ventas y alianzas:</strong> ventas@smartcitas.com</p>
          <p>🌐 <strong>Sitio web:</strong> https://smart-citas.netlify.app</p>
          <p>📍 <strong>Ubicación:</strong> Sincelejo, Colombia</p>
          <p>🕒 <strong>Horario:</strong> Lunes a Viernes, 9:00 a.m. – 6:00 p.m. (GMT-5)</p>
        </div>

        <p>
          También puedes escribirnos a través del formulario de contacto disponible en nuestro sitio web.
          Nuestro equipo responderá en menos de 24 horas hábiles. 🚀
        </p>
      </section>

      <CustomFooter />
    </>
  );
}

export default ContactPage;
