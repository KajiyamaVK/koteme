using koteme_api.Models;
using koteme_api.Models.ApiReturn;
using koteme_api.Interfaces.Repositories;
using koteme_api.Interfaces.Services;

namespace koteme_api.Services
{
  public class AuthServices : IAuthServices
  {
    private readonly IAuthRepository _authRepository;
    private readonly IConfiguration _config;

    public AuthServices(IConfiguration config, IAuthRepository authRepository)
    {
      _config = config;
      _authRepository = authRepository;
    }

    public async Task<PostReturn> SignUp(User user)
    {
      var response = await _authRepository.SignUp(user);

      if (!response.IsSuccess)
      {
        return response;
      }

      try
      {
        var emailService = new EmailService(_config);

        var path = Path.Combine(Directory.GetCurrentDirectory(), "src/EmailTemplates", "SignUp.html");
        var emailBody = "";

        using (StreamReader sr = File.OpenText(path))
        {
          emailBody = sr.ReadToEnd();
        }

        emailBody = emailBody.Replace("{userFirstName}", user.FirstName);

        emailService.SendEmail(user.Email, "Koteme - Ativação de conta", emailBody);
      }
      catch (Exception ex)
      {
        Console.WriteLine("Sending e-mail: " + ex.Message);
      }
      return response;
    }

    public async Task<User> SignIn(string email, string password)
    {
      throw new NotImplementedException();
    }

    public async Task<Boolean> Logout(int idUser)
    {
      throw new NotImplementedException();
    }

  }
}