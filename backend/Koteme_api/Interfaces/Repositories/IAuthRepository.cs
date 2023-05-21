using koteme_api.Models;
using koteme_api.Models.ApiReturn;

namespace koteme_api.Interfaces.Repositories;

public interface IAuthRepository
{
  Task<User> SignIn(string email, string password);
  Task<PostReturn> SignUp(User user);
  Task<Boolean> Logout(int idUser);
}
