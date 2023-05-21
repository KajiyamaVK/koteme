using koteme_api.enums;

namespace koteme_api.interfaces
{
  public interface IPhones
  {
    int IdUser { get; set; }
    string Number { get; set; }
    string? Extension { get; set; }
    TypePhone Type { get; set; }
  }
}