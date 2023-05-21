using Microsoft.AspNetCore.Mvc;
using koteme_api.Models.ApiReturn;
using koteme_api.Models;
using koteme_api.Services;
using Swashbuckle.AspNetCore.Annotations;
using koteme_api.Interfaces.Services;

namespace Koteme_api.Controllers;

[ApiController]
[Route("/signout")]
[SwaggerTag("Endpoints para o controle de autenticação do usuário")]
public class AuthController : ControllerBase
{
  private readonly IAuthServices _authServices;

  public AuthController(IAuthServices authServices)
  {
    _authServices = authServices;
  }

  //<summary>
  //Endpoint para o controle de registro de um novo usuário
  //</summary>
  //<remarks>
  //Um e-mail será enviado para o usuário com um link para a confirmação do cadastro
  //</remarks>
  //<response code="200">Irá retornar um objeto constando um boolean como true e uma string dizendo que o usuário foi criado com sucesso</response>

  [HttpPost(Name = "SignUp")]
  [ProducesResponseType(StatusCodes.Status201Created)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status500InternalServerError)]
  [Produces("application/json")]
  [SwaggerOperation(
    Summary = "Registro de usuários",
    Description = "Faz o insert na tabela de usuários e envia um e-mail de confirmação de cadastro",
    OperationId = "auth.signUp"
)]
  public async Task<IActionResult> Post([FromBody] User user)
  {

    if (!ModelState.IsValid)
    {
      var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList(); //Irá retornar os erros que são incluídos na classe Users caso algum campo não seja preenchido corretamente
      return BadRequest(new { errors });
    }

    try
    {
      var response = await _authServices.SignUp(user);

      if (response.IsSuccess)
      {
        return CreatedAtAction(nameof(Post), response);
      }
      else
      {
        return BadRequest(response);
      }
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { errors = ex.Message });
    }

  }
}