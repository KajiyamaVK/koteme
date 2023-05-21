namespace koteme_api.Interfaces.ApiReturn;

public interface IPostReturn
{
  public bool IsSuccess { get; set; }
  public string Message { get; set; }

}
