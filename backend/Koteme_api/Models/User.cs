using System.ComponentModel.DataAnnotations;
using koteme_api.enums;

namespace koteme_api.Models;

public class User
{

  [Required(ErrorMessage = "O campo Nome é obrigatório")]
  [StringLength(50, MinimumLength = 1, ErrorMessage = "O campo Nome deve conter no mínimo 1 caractere")]
  [Display(Name = "Nome")]
  public string FirstName { get; set; } = "";
  [Required(ErrorMessage = "O campo Sobrenome é obrigatório")]
  [StringLength(50, MinimumLength = 1, ErrorMessage = "O campo Sobrenome deve conter no mínimo 1 caractere")]
  [Display(Name = "Sobrenome")]
  public string LastName { get; set; } = "";
  [Required(ErrorMessage = "O campo E-mail é obrigatório")]
  [StringLength(100, MinimumLength = 6, ErrorMessage = "O campo E-mail deve conter no mínimo 6 caracteres(x@x.xx)")]
  [Display(Name = "E-mail")]
  public string Email { get; set; } = "";
  [Required(ErrorMessage = "O campo Senha é obrigatório")]
  [StringLength(100, MinimumLength = 6, ErrorMessage = "O campo Senha deve conter no mínimo 6 caracteres")]
  [Display(Name = "Senha")]
  public string Password { get; set; } = "";
  [Required(ErrorMessage = "O campo CPF é obrigatório")]
  [StringLength(11, ErrorMessage = "O campo CPF deve conter 11 caracteres")]
  [Display(Name = "CPF")]
  public string CPF { get; set; } = "";

  [Required(ErrorMessage = "O campo Tipo do usuário é obrigatório")]
  [EnumDataType(typeof(TypeUser), ErrorMessage = "Valor inválido. Consulte o dicionário de dados")]
  [Display(Name = "Tipo do usuário")]
  public TypeUser UserType { get; set; }
}
