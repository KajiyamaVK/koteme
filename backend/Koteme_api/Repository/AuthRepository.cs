using Dapper;
using koteme_api.enums;
using koteme_api.Interfaces.Repositories;
using koteme_api.Models;
using koteme_api.Models.ApiReturn;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;

namespace koteme_api.Repository;

public class AuthRepository : IAuthRepository
{
  private readonly IConfiguration _config;
  private readonly string? _connectionString;
  private PasswordHasher<User> _passwordHasher = new PasswordHasher<User>();

  public AuthRepository(IConfiguration config)
  {
    _config = config;
    _connectionString = _config.GetConnectionString("ConnectionString");
  }

  public async Task<PostReturn> SignUp(User user)
  {
    var hashedPassword = _passwordHasher.HashPassword(user, user.Password);
    var result = new PostReturn();
    try
    {
      using SqlConnection con = new(_connectionString);
      var query = @"
      INSERT INTO Users (
        userFirstName,
        userLastName, 
        userEmail, 
        userPassword, 
        userCPF,
        userType,
        isActive) 
      VALUES (
        @FirstName,
        @LastName, 
        @Email, 
        @Password, 
        @CPF,
        @UserType,
        0)";

      TypeUser userType = (TypeUser)user.UserType;

      var response = await con.ExecuteAsync(query, new { FirstName = user.FirstName, LastName = user.LastName, Email = user.Email, Password = hashedPassword, CPF = user.CPF, UserType = userType });
      result = response > 0 ? new PostReturn { IsSuccess = true, Message = "Usuário inserido com sucesso. Verificar e-mail de validação." }
                                : new PostReturn { IsSuccess = false, Message = "Erro ao cadastrar usuário. Entre em contato com o suporte." };
    }
    catch (Exception ex)
    {
      result = new PostReturn { IsSuccess = false, Message = " Erro na repository: " + ex.Message };
    }

    return result;
  }

  public async Task<User> SignIn(string email, string password)
  {
    using SqlConnection con = new(_connectionString);
    var query = @"
      SELECT 
        userId, 
        userFullname, 
        userEmail, 
        userPassword, 
        userCPF 
      FROM Users 
      WHERE userEmail = @Email";
    var user = await con.QueryFirstOrDefaultAsync<User>(query, new { Email = email });
    var result = user == null ? null : _passwordHasher.VerifyHashedPassword(user, user.Password, password) == PasswordVerificationResult.Success ? user : null;

    return result;
  }

  public async Task<Boolean> Logout(int idUser)
  {
    using SqlConnection con = new(_connectionString);
    var query = @"
      UPDATE Users 
      SET userLastLogout = GETDATE() 
      WHERE userId = @IdUser";
    var response = await con.ExecuteAsync(query, new { IdUser = idUser });
    var result = response > 0 ? true : false;

    return result;
  }


}
