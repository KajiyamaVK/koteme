using System.Net;
using System.Net.Mail;


public class EmailService
{
  private readonly IConfiguration _configuration;

  public EmailService(IConfiguration configuration)
  {
    _configuration = configuration;
  }

  public void SendEmail(string toEmail, string subject, string body)
  {
    var fromEmail = _configuration["EmailSettings:Email"];
    var fromName = _configuration["EmailSettings:DisplayName"];
    var smtpServer = _configuration["EmailSettings:Host"];
    var smtpPort = int.Parse(_configuration["EmailSettings:Port"]);
    var smtpUsername = _configuration["EmailSettings:Username"];
    var smtpPassword = _configuration["EmailSettings:Password"];

    var message = new MailMessage();
    message.From = new MailAddress(fromEmail, fromName);
    message.To.Add(toEmail);
    message.Subject = subject;
    message.Body = body;
    message.IsBodyHtml = true;

    using (var smtpClient = new SmtpClient(smtpServer, smtpPort))
    {
      smtpClient.EnableSsl = true; //dependendo do seu servidor smtp você talvez precise habilitar o SSL.
      smtpClient.UseDefaultCredentials = false;
      smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

      smtpClient.Send(message);
    }
  }
}
