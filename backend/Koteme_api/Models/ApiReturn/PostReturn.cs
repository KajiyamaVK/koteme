using koteme_api.Interfaces.ApiReturn;

namespace koteme_api.Models.ApiReturn;

public class PostReturn : IPostReturn
{
  public bool IsSuccess { get; set; }
  public string Message { get; set; } = "";
}