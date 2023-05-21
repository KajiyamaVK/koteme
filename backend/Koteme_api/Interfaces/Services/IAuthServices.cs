using koteme_api.Models;
using koteme_api.Models.ApiReturn;

namespace koteme_api.Interfaces.Services;

public interface IAuthServices
{
  Task<User> SignIn(string email, string password);
  Task<PostReturn> SignUp(User user);
  Task<Boolean> Logout(int idUser);
}
